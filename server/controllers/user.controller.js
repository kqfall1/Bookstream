import User from "../models/user.model.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

/**
Creates a new user based on the User model using the request body data
Then, the save method is called on the user object to save it to the database. 
 If the save operation is successful, a JSON response with a status code of 200 and a message of "Successfully signed up!" is sent back to the client. 
 If the save operation fails, an error is caught and a JSON response with a status code of 400 and an error message is sent back to the client.
* @param req The Express request object, expected to have an User json in the form of the User schema model.
* @param res The Express response object.
*/
const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/** 
 * List of users
 * Retrieves a list of users, selecting specific fields (name, email, updated,created).
 * Returns the list of users or an error message.
 * @param res The Express response object expected to return a JSON array of all users in the database
*/
const list = async (req, res) => {
  try {
    let users = await User.find().select("name email role updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

 /**
 * Middleware to load a user by ID from the database and attach it to the request object (req.profile).
 * 
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 * @param id - The user ID extracted from the route parameter
 */
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "User not found",
      });
    req.profile = user;
    next(); // middleware function that passes control to the next middleware function or route handler
  } catch (err) {
    return res.status(404).json({
      error: "Could not retrieve user",
    });
  }
};

//Returns the user profile with sensitive information (password and salt) removed [Currently commented out for testing].
const read = (req, res) => {
  //rexq.profile.hashed_password = undefined;
  //rexq.profile.salt = undefined;
  return res.json(req.profile);
};

/*
Updates the user profile with data from req.body and the current timestamp.
o Saves the updated user profile to the database.
o Returns the updated profile with sensitive information removed, or an error message on failure.
*/
const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

/*
Deletes the user profile from the database.
o Returns the deleted user profile with sensitive information removed, or an error message on failure.
*/
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


export default { create, userByID, read, list, remove, update };
