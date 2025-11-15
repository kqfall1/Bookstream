import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();
router.route("/api/users").post(userCtrl.create); //route for creating a user
router.route("/api/users").get(userCtrl.list); //route for listing all users
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);
router.param("userId", userCtrl.userByID); //middleware to find user by ID, used by the routes that do things by ID
router.route("/api/users/:userId").get(userCtrl.read); //route for reading a user by ID
router.route("/api/users/:userId").put(userCtrl.update); //route for updating a user by ID
router.route("/api/users/:userId").delete(userCtrl.remove); //route for deleting a user by ID

export default router;
