const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
<<<<<<< HEAD
    mongoUri: process.env.MONGODB_URI ||"zlaanahmedwnrzr_db_user:6xhm4qaENmGJrFbu@cluster123.0fbdvtn.mongodb.net/Skeleton?retryWrites=true&w=majority&appName=Cluster123"||
=======
    mongoUri: process.env.MONGODB_URI ||"mongodb+srv://jzhou39_db_user:KQHb9osqa8IBy5Nl@cluster0.svci2dc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"||
>>>>>>> 92f3d98ef85374747e271388d7aee5139a1cc359
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/bookstream' 
    }
    export default config
   
   