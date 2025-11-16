import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    author: {
        type: String, 
        trim: true,
        required: "Author is required",
        minlength: [2, "Author name must be at least 2 characters long"],
        maxlength: [30, "Author name cannot exceed 30 characters"],
    },
    
    category: {
        type: String, //Perhaps an enumeration of categories should be implemented in the future. 
        trim: true,
        required: "Category is required",
        minlength: [3, "Category must be at least 3 characters long"],
        maxlength: [20, "Category cannot exceed 20 characters"],
    },

    description: {
        type: String,
        trim: true,
        required: "Description is required",
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    isbn: {
        type: String,
        trim: true,
        required: "ISBN is required",
        unique: "ISBN already exists",
        //Regex validation should be implemented in the future as well. 
    }, 

    photoPath: {
        type: String,
        trim: true,
    },

    publisher: {
        type: String,
        trim: true,
        required: "Publisher is required",
        minlength: [2, "Publisher name must be at least 2 characters long"],
        maxlength: [50, "Publisher name cannot exceed 50 characters"],
    }, 

    title: {
        type: String,
        trim: true,
        required: "Title is required",
        minlength: [1, "Title must be at least 1 character long"],
        maxlength: [75, "Title cannot exceed 75 characters"],
    }, 

    yearPublished: {
        type: Number,
        min: [1450, "Year published must be after 1450"],
        max: [new Date().getFullYear(), "Year published cannot be in the future"],
        required: "Year published is required"
    }
}, { timestamps: true}); 