import dbErrorHandler from "../helpers/dbErrorHandler.js";

/**
* Handles errors passed through the request object by capturing the error, formatting a 
* user-friendly error message, determining the appropriate HTTP status code, logging the 
* error, and sending a JSON response to the client.
* @param req The Express request object, expected to have an 'error' property.
* @param res The Express response object.
*/
function handleError(req, res) {
  const err = req.error; 
  const errorMessage = dbErrorHandler.getErrorMessage(err);
  const statusCode = err.status || 500; 

  console.log(err);

  res.status(statusCode).json({
    error: errorMessage,
  });
}

/**
* Generates a formatted error message from an error object.
* This function centralizes error message generation using the dbErrorHandler utility.
* @param err The error object.
* @returns An appropriate error message. 
*/
function getErrorMessage(err) {
  const errorMessage = dbErrorHandler.getErrorMessage(err);
  //console.log("Error:", errorMessage); 
  return errorMessage;
}

export default {
  handleError: handleError,
  getErrorMessage: getErrorMessage,
};
