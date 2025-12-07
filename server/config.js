import dotenv from "dotenv"

dotenv.config()

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

console.log("JWT_SECRET loaded:", config.jwtSecret ? "YES" : "NO");
console.log("JWT_SECRET value:", config.jwtSecret);

export default config;