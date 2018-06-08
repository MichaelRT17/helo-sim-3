module.exports = {

    registerUser: (req, res, next) => {
        const db = req.app.get('db');
        const { username, password, profile_pic } = req.body;

        db.create_user([username, password, profile_pic])
            .then((user) => res.status(200).send(user))
            .catch(() => res.status(500).send());
    },

    loginUser: (req, res, next) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        db.login_user([username, password])
            .then((user) => res.status(200).send(user))
            .catch(() => res.status(500).send());
    },

    getPosts: (req, res, next) => {
        const db = req.app.get('db');
        const { userid } = req.params;
        const { usersearch, userpost } = req.query;

        if (userpost == 'true' && usersearch.length !== 0) {
            db.find_posts_user_yes_search_yes([usersearch])
                .then((posts) => res.status(200).send(posts))
                .catch(() => res.status(500).send());
        }
        else if (userpost == 'false' && usersearch.length === 0) {
            db.find_posts_user_no_search_no([userid])
                .then((posts) => res.status(200).send(posts))
                .catch(() => res.status(500).send());
        }
        else if (userpost == 'false' && usersearch.length !== 0) {
            db.find_posts_user_no_search_yes([userid, usersearch])
                .then((posts) => res.status(200).send(posts))
                .catch(() => res.status(500).send());
        }
        else if (userpost == 'true' && usersearch.length === 0) {
            db.find_posts_user_yes_search_no()
                .then((posts) => res.status(200).send(posts))
                .catch(() => res.status(500).send());
        }
    },

    getPost: (req, res, next) => {
        const db = req.app.get('db');
        const { postid } = req.params;

        db.find_post([postid])
            .then((post) => res.status(200).send(post))
            .catch(() => res.status(500).send());
    },

    createPost: (req, res, next) => {
        const db = req.app.get('db');
        const { userid } = req.params;
        const { title, img, content } = req.body;

        db.create_new_post([title, img, content, userid])
            .then(() => res.status(200).send())
            .catch(() => res.status(500).send());
    }
}