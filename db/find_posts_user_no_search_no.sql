select posts.id as post_id, * from posts
join users on posts.author_id = users.id
where not author_id = $1;