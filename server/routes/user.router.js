const express = require("express");
const router = express.Router();
const users = require("../modules/users.json");
const helpers = require("../modules/helpers");

// Used to track the user ID so no user has the same ID as another user, even if there are deleted users

let numberOfUsers = users.length;

// Error Messages

const noIndexErrorMessage = helpers.errorMessages.noIndexErrorMessage;
const missingDataErrorMessage = helpers.errorMessages.missingDataErrorMessage;

// Get all users

router.get("/fetch", (req, res) => {
  console.log("in fetch all users");

  res.status(200).send(users);
});

// Get user by ID or email
// Grab ID or email from request parameters and call function to find index
// Send back the user info at the user index

router.get("/fetch/:idOrEmail", (req, res) => {
  console.log("in fetch by id");
  const idOrEmail = req.params.idOrEmail;
  const userIndex = helpers.findIndexByIdOrEmail(users, idOrEmail);

  if (userIndex > -1) {
    res.status(200).send(users[userIndex]);
  } else {
    console.log(noIndexErrorMessage);
    res.status(404).send(noIndexErrorMessage);
  }
});

// Add new user
// Check if username or email is a falsey value (there is actually data in the request)
// and send error message if it is, if not, add user to memory and increment the ID tracker

router.post("/add-user", (req, res) => {
  console.log("in add user");
  const username = req.body.username;
  const email = req.body.email;

  if (!username || !email) {
    console.log(missingDataErrorMessage);
    res.status(400).send(missingDataErrorMessage);
  } else {
    numberOfUsers++;
    users.push({
      id: numberOfUsers,
      profileImage: "",
      profileSpash: "",
      following: [],
      followers: [],
      username,
      email,
    });
    
    res.status(201).send(users[users.length - 1]);
  }
});

// Follow user
// Grab the currentUserId (the user that is trying to follow) form the body and grab the
// targetUserId (the user that is going to be followed) from the parameters
// Find the index of each user in the global array of users
// Grab the list of all users followed by the current user, and grab a list of
// all users that are following the target user
// Check if the current user is already following the target user
// If they are, remove the targetUserId from the list of users that the current user is following
// and remove the currentUserId from the list of users that are following the target user

// If the current user is already following the target user, check if the required data is
// in the request, if it isn't then error out, if it is then check if the indexes of the
// users are both greater than -1 (meaning both users are found), if they are,
// add the currentUserId to the target users list of followers, and add the
// targetUserId to the current users list of following, if they arent
// then error out

router.put("/follow-user/:targetProfileId", (req, res) => {
  console.log("in follow user");
  const currentUserId = req.body.userId;
  const targetUserId = req.params.targetProfileId;

  if (!currentUserId || !targetUserId) {
    console.log(missingDataErrorMessage);
    res.status(400).send(missingDataErrorMessage);
  }

  const currentUserIndex = helpers.findIndexByIdOrEmail(users, currentUserId);
  const targetUserIndex = helpers.findIndexByIdOrEmail(users, targetUserId);
  const currentUserFollowing = users[currentUserIndex].following;
  const targetUserFollowers = users[targetUserIndex].followers;
  const alreadyFollowing = currentUserFollowing.find(
    (followingId) => followingId === Number(targetUserId)
  )
    ? true
    : false;

  if (currentUserIndex === -1 && targetUserIndex === -1) {
    console.log(noIndexErrorMessage);
    res.status(404).send(noIndexErrorMessage);
  }

  if (alreadyFollowing) {
    const currentUserIdIndexInTargetUserFollowers =
      targetUserFollowers.findIndex((id) => id === Number(currentUserId));
    const targetUserIdIndexInCurrentUserFollowing =
      currentUserFollowing.findIndex((id) => id === Number(targetUserId));

    currentUserFollowing.splice(targetUserIdIndexInCurrentUserFollowing, 1);
    targetUserFollowers.splice(currentUserIdIndexInTargetUserFollowers, 1);

    res.sendStatus(200);
  } else {
    currentUserFollowing.push(Number(targetUserId));
    targetUserFollowers.push(Number(currentUserId));
    res.sendStatus(200);
  }
});

// Update user info
// Grab ID from request parameters and call function to find index
// Check if username or email is a falsey value (there is actually data in the request)
// and send error message if it is, if not, update user in memory and send back new user object if index by ID is found
// If no index is found, send out error message

router.put("/update-user/:id", (req, res) => {
  console.log("in update user");
  const updatedUser = req.body;
  const username = req.body.username;
  const email = req.body.email;
  const userIndex = helpers.findIndexByIdOrEmail(users, req.params.id);

  if (!username || !email) {
    console.log(missingDataErrorMessage);
    res.status(400).send(missingDataErrorMessage);
  } else {
    if (userIndex > -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      res.status(200).send(users[userIndex]);
    } else {
      console.log(noIndexErrorMessage);
      res.status(404).send(noIndexErrorMessage);
    }
  }
});

// Delete user
// Grab ID from request parameters and call function to find index
// splice the user out of memory if an index was found, if not then send back an error message

router.delete("/delete-user/:id", (req, res) => {
  console.log("in delete user");
  const userIndex = helpers.findIndexByIdOrEmail(users, req.params.id);

  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  } else {
    console.log(noIndexErrorMessage);
    res.status(404).send(noIndexErrorMessage);
  }
});

module.exports = router;
