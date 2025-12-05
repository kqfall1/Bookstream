import mongoose from "mongoose";
import Book from "./models/book.model.js";
import config from "../config.js";

// Connect to MongoDB
mongoose.connect(config.mongoUri, { dbName: "bookstream" })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

const newBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream through the mysterious Jay Gatsby.",
    isbn: "9780743273565",
    photoPath: "",
    price: 12.99,
    publisher: "Scribner",
    yearPublished: 1925
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence in the American South, told through the eyes of young Scout Finch.",
    isbn: "9780061120084",
    photoPath: "",
    price: 14.99,
    publisher: "Harper Perennial",
    yearPublished: 1960
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    description: "A controversial novel following teenager Holden Caulfield as he navigates alienation and identity in post-war America.",
    isbn: "9780316769488",
    photoPath: "",
    price: 11.99,
    publisher: "Little, Brown",
    yearPublished: 1951
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    description: "An epic fantasy adventure following Frodo Baggins' quest to destroy the One Ring and save Middle-earth from the Dark Lord Sauron.",
    isbn: "9780544003415",
    photoPath: "",
    price: 29.99,
    publisher: "Mariner Books",
    yearPublished: 1954
  },
  {
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    category: "Fantasy",
    description: "A magical series of seven fantasy novels about the adventures of children who visit the magical land of Narnia.",
    isbn: "9780066238500",
    photoPath: "",
    price: 24.99,
    publisher: "HarperCollins",
    yearPublished: 1950
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "Science",
    description: "A science fiction masterpiece set on the desert planet Arrakis, exploring politics, religion, and ecology in a far future.",
    isbn: "9780441172719",
    photoPath: "",
    price: 16.99,
    publisher: "Ace",
    yearPublished: 1965
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    category: "Science",
    description: "A thrilling survival story of astronaut Mark Watney, stranded alone on Mars and fighting to stay alive.",
    isbn: "9780553418026",
    photoPath: "",
    price: 15.99,
    publisher: "Crown",
    yearPublished: 2011
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    description: "The authorized biography of Apple co-founder Steve Jobs, based on exclusive interviews with Jobs and his family.",
    isbn: "9781451648539",
    photoPath: "",
    price: 18.99,
    publisher: "Simon & Schuster",
    yearPublished: 2011
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Non-Fiction",
    description: "Nobel Prize winner Daniel Kahneman explores the two systems that drive the way we think and make decisions.",
    isbn: "9780374533557",
    photoPath: "",
    price: 17.99,
    publisher: "Farrar, Straus",
    yearPublished: 2011
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    description: "A Pulitzer Prize-winning examination of why some societies conquered others and shaped the modern world.",
    isbn: "9780393317558",
    photoPath: "",
    price: 19.99,
    publisher: "W. W. Norton",
    yearPublished: 1997
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    description: "A landmark volume exploring cosmology, black holes, and the nature of time from one of the greatest minds of our time.",
    isbn: "9780553380163",
    photoPath: "",
    price: 14.99,
    publisher: "Bantam",
    yearPublished: 1988
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "Biography",
    description: "The powerful and moving diary of a young Jewish girl hiding from the Nazis during World War II.",
    isbn: "9780553296983",
    photoPath: "",
    price: 9.99,
    publisher: "Bantam",
    yearPublished: 1947
  },
  {
    title: "Where the Wild Things Are",
    author: "Maurice Sendak",
    category: "Children",
    description: "A beloved children's classic about Max's imaginative journey to the land of Wild Things.",
    isbn: "9780060254926",
    photoPath: "",
    price: 8.99,
    publisher: "Harper Collins",
    yearPublished: 1963
  },
  {
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    category: "Children",
    description: "A classic picture book following a caterpillar's transformation into a beautiful butterfly.",
    isbn: "9780399226908",
    photoPath: "",
    price: 7.99,
    publisher: "Philomel Books",
    yearPublished: 1969
  },
  {
    title: "Charlotte's Web",
    author: "E.B. White",
    category: "Children",
    description: "A timeless tale of friendship between a pig named Wilbur and a clever spider named Charlotte.",
    isbn: "9780064400558",
    photoPath: "",
    price: 10.99,
    publisher: "Harper Trophy",
    yearPublished: 1952
  },
  {
    title: "Game of Thrones",
    author: "George R.R. Martin",
    category: "Fantasy",
    description: "The first book in the epic A Song of Ice and Fire series, featuring political intrigue and dragons.",
    isbn: "9780553103540",
    photoPath: "",
    price: 19.99,
    publisher: "Bantam",
    yearPublished: 1996
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    category: "Fiction",
    description: "A gripping mystery thriller about journalist Mikael Blomkvist and hacker Lisbeth Salander.",
    isbn: "9780307454546",
    photoPath: "",
    price: 15.99,
    publisher: "Vintage",
    yearPublished: 2005
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    category: "Fiction",
    description: "A fast-paced thriller involving symbology, art, and a conspiracy within the Catholic Church.",
    isbn: "9780307474278",
    photoPath: "",
    price: 14.99,
    publisher: "Anchor",
    yearPublished: 2003
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    category: "Non-Fiction",
    description: "A counterintuitive approach to living a good life through accepting limitations and embracing uncertainty.",
    isbn: "9780062457714",
    photoPath: "",
    price: 16.99,
    publisher: "Harper One",
    yearPublished: 2016
  },
  {
    title: "Outliers",
    author: "Malcolm Gladwell",
    category: "Non-Fiction",
    description: "An examination of what makes high-achievers different, exploring the hidden factors behind success.",
    isbn: "9780316017930",
    photoPath: "",
    price: 16.99,
    publisher: "Little, Brown",
    yearPublished: 2008
  }
];

async function seedBooks() {
  try {
    console.log("Starting to add books...");

    for (const book of newBooks) {
      try {
        // Check if book already exists by ISBN
        const existing = await Book.findOne({ isbn: book.isbn });
        if (existing) {
          console.log(`Skipping "${book.title}" - already exists`);
          continue;
        }

        await Book.create(book);
        console.log(`✓ Added: ${book.title}`);
      } catch (err) {
        console.error(`✗ Error adding "${book.title}":`, err.message);
      }
    }

    console.log("\nSeeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedBooks();
