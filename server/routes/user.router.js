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
  const name = req.body.name;
  const email = req.body.email;

  if (!name || !email) {
    console.log(missingDataErrorMessage);
    res.status(400).send(missingDataErrorMessage);
  } else {
    numberOfUsers++;
    users.push({
      id: numberOfUsers,
      profileImage: "",
      profileSplash: "",
      bio: "",
      following: [],
      followers: [],
      username: `${name.replace(/\s+/g, "")}`,
      name,
      email,
    });

    res.status(201).send(users[users.length - 1]);
  }
});

// Follow user
// Grab the currentUserId (the user that is trying to follow somone) from the request body
// and grab the targetUserId (the user that is being followed) from the request params
// check if the userId's actually exist, if they dont, error out
// find the currentUserIndex and the targetUserIndex of the of the two users in the user array
// if either user aren't found in the user list, error out
// grab the list of users that the current user is following and grab a list of users that
// the target user is being followed by (both stored on the user object). Check if the current
// user is already following the target user. If the current user is already following the
// target user, splice currentUserId out of the targetUserFollowers and splice the
// targetUserId out of the currentUserFollowing list.
// If the user is not already following, push the targetUserId to the currentUserFollowing list
// and pusht the currentUserId to the targetUserFollowers list

router.put("/follow-user/:targetProfileId", (req, res) => {
  console.log("in follow user");
  const currentUserId = req.body.userId; // could wrap in Number() here to save time later
  const targetUserId = req.params.targetProfileId; // could wrap in Number() here to save time later

  if (!currentUserId || !targetUserId) {
    console.log(missingDataErrorMessage);
    res.status(400).send(missingDataErrorMessage);
    return;
  }

  const currentUserIndex = helpers.findIndexByIdOrEmail(users, currentUserId);
  const targetUserIndex = helpers.findIndexByIdOrEmail(users, targetUserId);

  if (currentUserIndex === -1 || targetUserIndex === -1) {
    console.log(noIndexErrorMessage);
    res.status(404).send(noIndexErrorMessage);
    return;
  }

  const currentUserFollowing = users[currentUserIndex].following;
  const targetUserFollowers = users[targetUserIndex].followers;
  const alreadyFollowing = currentUserFollowing.find(
    (followingId) => followingId === Number(targetUserId)
  )
    ? true
    : false; // can drop these two lines if you want

  if (alreadyFollowing) {
    // potentially could combine these:
    // currentUserFollowing.splice(
    //   currentUserFollowing.findIndex((id) => id === (targetUserId)
    // , 1)
    // or... could just use filter (which doesnt modify inline)
    // currentUserFollowing = currentUserFollowing.filter(u => u !== targetUserId);

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
  const name = req.body.name;
  const profileImage = req.body.profileImage;
  const profileSplash = req.body.profileSplash;
  const bio = req.body.bio;

  if (!username || !name || !profileImage || !profileSplash || !bio) {
    console.log(missingDataErrorMessage);
    res.status(400).send(missingDataErrorMessage);
    return;
  }

  const userIndex = helpers.findIndexByIdOrEmail(users, req.params.id);

  if (userIndex > -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.status(200).send(users[userIndex]);
  } else {
    console.log(noIndexErrorMessage);
    res.status(404).send(noIndexErrorMessage);
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
