//import config from "./../../config.js";
import config from "../../config.js"
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/**
 * Checks to see if the user has authorization for a given operation.
 * @returns A 403 error response if the user does not have authorization.
 */
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile?._id == req.auth?._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }

  next();
};

/**
 * Middleware that checks for a valid JWT in the request to determine if the user is signed in.
 * The JWT is expected to be sent in the Authorization header as a Bearer token. If the token is
 * valid, the decoded token is attached to req.auth.
 */
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

/**
 * Determines if the user can be signed in with the provided credentials. If so, a JWT
 * is created and stored in the client browser's local storage.
 * @returns A JSON object containing the JWT and user details if the user can be signed in;
 * otherwise, an error message.
 */
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }
 console.log("JWT_SECRET used for signing:", config.jwtSecret);

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

/**
 * Removes the JWT from the client browser's local storage, effectively signing the user out.
 * @returns A successful response message.
 */
const signout = (req, res) => {
  res.clearCookie("t", {
    path: "/",
    httpOnly: true,
    sameSite: "Lax", // or 'None' if using cross-origin with HTTPS
    secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
  });
  return res.status(200).json({
    message: "signed out",
  });
};

export default { signin, signout, requireSignin, hasAuthorization };
