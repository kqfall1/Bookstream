import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title is required"],
        minlength: [1, "Title must be at least 1 character long"],
        maxlength: [75, "Title cannot exceed 75 characters"],
        index: true
    },
    author: {
        type: String,
        trim: true,
        required: [true, "Author is required"],
        minlength: [2, "Author name must be at least 2 characters long"],
        maxlength: [30, "Author name cannot exceed 30 characters"],
        index: true
    },
    category: {
        type: String,
        trim: true,
        required: [true, "Category is required"],
        enum: ["Fiction", "Non-Fiction", "Science", "History", "Biography", "Children", "Fantasy", "Other"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Description is required"],
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    isbn: {
        type: String,
        trim: true,
        required: [true, "ISBN is required"],
        unique: true,
        match: [/^(97(8|9))?\d{9}(\d|X)$/, "Please enter a valid ISBN"]
    },
    photoPath: {
        type: String,
        trim: true,
        default: ""
    },
    price: {
        type: Number,
        min: [0, "Price cannot be negative"],
        max: [10000, "Price cannot exceed 10000"],
        required: [true, "Price is required"]
    },
    publisher: {
        type: String,
        trim: true,
        required: [true, "Publisher is required"],
        minlength: [2, "Publisher name must be at least 2 characters long"],
        maxlength: [50, "Publisher name cannot exceed 50 characters"],
    },
    yearPublished: {
        type: Number,
        min: [1450, "Year published must be after 1450"],
        max: [new Date().getFullYear(), "Year published cannot be in the future"],
        required: [true, "Year published is required"]
    }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
