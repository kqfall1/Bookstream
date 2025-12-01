import app from "./express.js";
import config from "../config.js";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose
  .connect(config.mongoUri, {
    dbName:"bookstream" 
  })
  .then(() => {
    console.log("Connected to the database!");
  });

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});