import config from "../config.js";
import app from "express.js";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
    dbName:""
  })
  .then(() => {
    console.log("Connected to the database!");
  });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

let app = express()

app.use("/", function (req, res) {
    res.send("Welcome to User application")
})

app.listen(3000);
console.log("Server running at http://localhost:3000/")

export default app