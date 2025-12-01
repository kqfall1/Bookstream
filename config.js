import path from "path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve("server", `.env.${process.env.NODE_ENV || "development"}`)})

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/bookstream",
};

export default config;