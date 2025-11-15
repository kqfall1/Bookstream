const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI ||"zlaanahmedwnrzr_db_user:6xhm4qaENmGJrFbu@cluster123.0fbdvtn.mongodb.net/Skeleton?retryWrites=true&w=majority&appName=Cluster123"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/bookstream' 
    }
    export default config
   
   