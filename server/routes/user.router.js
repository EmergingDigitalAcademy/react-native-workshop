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
    users.push({ id: numberOfUsers, profileImage: "", username, email });
    res.status(201).send(users[users.length - 1]);
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
