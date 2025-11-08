import dbErrorHandler from "../helpers/dbErrorHandler.js";

/*
 * Middleware function to handle errors passed through the request object.
 * It captures the error, formats a user-friendly error message,
 * determines the appropriate HTTP status code, logs the error for debugging,
 * and sends a JSON response to the client.
 *
 * req - The Express request object, expected to have an 'error' property.
 * res - The Express response object.
 */

function handleError(req, res) {
  const err = req.error; //capture error from request object

  const errorMessage = dbErrorHandler.getErrorMessage(err);
  const statusCode = err.status || 500; // set status code or default to 500 if no status is set

  console.log(err);

  // Send the error response as JSON
  res.status(statusCode).json({
    error: errorMessage,
  });
}

/*
 * Generates a formatted error message from an error object.
 * This function centralizes error message generation using the dbErrorHandler utility.
 
 * errMsg - The error object.
 */

function getErrorMessage(errMsg) {
  const errorMessage = dbErrorHandler.getErrorMessage(errMsg);
  //console.log("Error:", errorMessage); // Log the error for debugging
  return errorMessage;
}
// Export the functions
export default {
  handleError: handleError,
  getErrorMessage: getErrorMessage,
};
