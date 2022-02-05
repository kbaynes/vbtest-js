#!/usr/bin/env bash

# this test assumes you have httpie and jq installed

echo delete all posts to reset DB
http DELETE http://localhost:3000/posts

echo create the first post
echo '{"title": "My First Post", "content": "lorem ipsum"}' | http POST http://localhost:3000/posts

echo get all posts to show first post
http GET http://localhost:3000/posts

echo get id of first post
id=`http --body GET http://localhost:3000/posts | jq '.[0].id'`
echo id=$id
echo " "

echo get first post
http GET http://localhost:3000/posts/$id

echo update the first post
echo '{"title": "My First Post", "content": "I am now updated"}' | http PUT http://localhost:3000/posts/$id

echo get the updated post
http GET http://localhost:3000/posts/$id

echo delete all posts to test delete all
http DELETE http://localhost:3000/posts

echo get all posts to show first post is deleted
http GET http://localhost:3000/posts

echo create the second post
echo '{"title": "My Second Post", "content": "lorem ipsum SECOND"}' | http POST http://localhost:3000/posts

echo get all posts to show second post
http GET http://localhost:3000/posts

echo get id of second post
id=`http --body GET http://localhost:3000/posts | jq '.[0].id'`
echo id=$id
echo " "

echo delete second posts to test delete by id
http DELETE http://localhost:3000/posts/$id

echo get all posts to show second post is deleted
http GET http://localhost:3000/posts