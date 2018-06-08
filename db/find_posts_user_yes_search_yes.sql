select posts.id as post_id, * from posts
join users on posts.author_id = users.id
where title like %$1%;