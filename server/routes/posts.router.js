const express = require("express");
const router = express.Router();
const posts = require("../modules/posts.json");
const users = require("../modules/users.json");
const helpers = require("../modules/helpers");

// Used to track the post ID so no post has the same ID as another post, even if there are deleted posts

let numberOfPosts = posts.length;

// Error Messages

const noPostsErrorMessage = "cannot find any posts at index";
const missingDataErrorMessage = helpers.errorMessages.missingDataErrorMessage;
const postTooLongErrorMessage = "post is over 250 characters, try again";
const noIndexErrorMessage = helpers.errorMessages.noIndexErrorMessage;
const alreadyLikedErrorMessage = "post has already been liked by user";

// Get all posts

router.get("/fetch", (req, res) => {
  console.log("in fetch all posts");
  const updatedPosts = [];

  for (const post of posts) {
    for (const user of users) {
      if (user.id === post.userId) {
        updatedPosts.push({ ...post, userId: user });

        break;
      }
    }
  }

  res.status(200).send(updatedPosts);
});

// Get all posts of user by userId
// Checks if users posts by checking if there are posts with the given ID
// Return a collection of posts from the user by ID or an error depending
// On if there are posts by that user

router.get("/fetch-user-posts/:userId", (req, res) => {
  console.log("in fetch posts by userId");
  const filteredPosts = posts.filter(
    (post) => post.userId === Number(req.params.userId)
  );

  if (filteredPosts.length > 0) {
    // only return 200 if the user has posts
    res.status(200).send(filteredPosts);
  } else {
    console.log(noPostsErrorMessage);
    res.status(404).send(noPostsErrorMessage);
  }
});

// Create post
// Check if post length is less than 250 characters, error out if it isnt, else check
// if the required data is included in the post, error out if it isnt, else increment
// number of posts and add post to the posts data, send back newly created post

router.post("/add-post", (req, res) => {
  console.log("in add post");
  const text = req.body.text;
  const userId = req.body.userId;

  if (text.length > 250) {
    console.log(postTooLongErrorMessage);
    res.status(400).send(postTooLongErrorMessage);
  } else {
    if (!text || !userId) {
      console.log(missingDataErrorMessage);
      res.status(400).send(missingDataErrorMessage);
    } else {
      numberOfPosts++;
      posts.push({
        id: numberOfPosts,
        userLikes: [],
        userId: Number(userId),
        text,
      });
      res.status(201).send(posts[posts.length - 1]);
    }
  }
});

// Like post
// find the index of the current post trying to be liked
// using the found index and the user id, check if the post is already liked,
// if it is, error out, if it isnt check if the user has already liked the post,
// if they have, error out, else check if the userId is sent in the request body,
// if it's not error out, else check if the post index is greater than -1
// (-1 means nothing is found), then push the id of the user to the array of
// user likes and send back 200 if there is no index found, error out

router.put("/like-post/:id", (req, res) => {
  console.log("in like post");
  const userId = req.body.userId;
  const postId = req.params.id;
  const postIndex = helpers.findIndexByIdOrEmail(posts, postId);
  const userLikesArray = posts[postIndex].userLikes;
  const alreadyLiked = userLikesArray.find(
    (likedId) => likedId === Number(userId)
  )
    ? true
    : false;

  if (alreadyLiked) {
    const userIdIndexInUserLikes = userLikesArray.findIndex(
      (id) => id === Number(userId)
    );

    userLikesArray.splice(userIdIndexInUserLikes, 1);

    res.sendStatus(200);
  } else {
    if (!userId || !postId) {
      console.log(missingDataErrorMessage);
      res.status(400).send(missingDataErrorMessage);
    } else {
      if (postIndex > -1) {
        posts[postIndex].userLikes.push(Number(userId));
        res.sendStatus(200);
      } else {
        console.log(noIndexErrorMessage);
        res.status(404).send(noIndexErrorMessage);
      }
    }
  }
});

module.exports = router;
