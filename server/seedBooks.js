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
    photoPath: "/assets/TheGreatGatsby.jpg",
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
    photoPath: "https://books.google.com/books/content?id=OjwiAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "/assets/TheCatcherintheRye.jpg",
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
    photoPath: "https://books.google.com/books/content?id=Wbro1vVXYjcC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=FQMQAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "/assets/Dune.jpg",
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
    photoPath: "https://books.google.com/books/content?id=vH5FAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "/assets/SteveJobs.jpg",
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
    photoPath: "https://books.google.com/books/content?id=ZmyQErkqFaUC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=PWnWRFURXNMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=1MhtWPHcdJkC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=0bvwAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=vW22hqXG3PgC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=bmKiQgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=FQMQAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "/assets/GameofThrones.jpg",
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
    photoPath: "https://books.google.com/books/content?id=_xqoHp1HGi0C&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=qUjGkAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "https://books.google.com/books/content?id=IWakCgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
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
    photoPath: "/assets/Outliers.jpg",
    price: 16.99,
    publisher: "Little, Brown",
    yearPublished: 2008
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    category: "Biography",
    description: "An intimate, powerful memoir by the former First Lady of the United States, chronicling her journey from childhood to the White House.",
    isbn: "9781524763138",
    photoPath: "https://books.google.com/books/content?id=hi2zDQAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 17.99,
    publisher: "Crown Publishing",
    yearPublished: 2018
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Non-Fiction",
    description: "A handbook of agile software craftsmanship teaching the principles of writing clean, maintainable code.",
    isbn: "9780132350884",
    photoPath: "/assets/CleanCode.jpg",
    price: 54.99,
    publisher: "Prentice Hall",
    yearPublished: 2008
  },
  {
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    category: "Adventure",
    description: "Jim Hawkins sets sail to find buried treasure, facing pirates and mutiny along the way.",
    isbn: "9780140437683",
    photoPath: "https://books.google.com/books/content?id=1ruuAAAAQAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 10.5,
    publisher: "Penguin Classics",
    yearPublished: 1883
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Business",
    description: "Notes on startups and how to build the future from PayPal cofounder Peter Thiel.",
    isbn: "9780804139298",
    photoPath: "https://books.google.com/books/content?id=OGDoAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 16.99,
    publisher: "Currency",
    yearPublished: 2014
  },
  {
    title: "Matilda",
    author: "Roald Dahl",
    category: "Children",
    description: "A gifted girl uses her brilliance and a bit of magic to stand up to cruel adults.",
    isbn: "9780142410370",
    photoPath: "https://books.google.com/books/content?id=NXpiNwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 8.99,
    publisher: "Puffin Books",
    yearPublished: 1988
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    category: "Fantasy",
    description: "The beginning of Harry Potter's journey into the wizarding world and Hogwarts.",
    isbn: "9780590353427",
    photoPath: "https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 12.99,
    publisher: "Scholastic",
    yearPublished: 1997
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    description: "A dystopian classic about surveillance, control, and resistance in a totalitarian state.",
    isbn: "9780451524935",
    photoPath: "https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 9.99,
    publisher: "Signet Classics",
    yearPublished: 1949
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Mystery",
    description: "A twisting psychological thriller about a marriage gone wrong and a missing wife.",
    isbn: "9780307588371",
    photoPath: "https://books.google.com/books/content?id=QrqwL_PwY6cC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 14.99,
    publisher: "Crown",
    yearPublished: 2012
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Adventure",
    description: "Bilbo Baggins joins a band of dwarves on a quest to reclaim their mountain home from the dragon Smaug.",
    isbn: "9780547928227",
    photoPath: "https://books.google.com/books/content?id=IXz2xAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 13.99,
    publisher: "Mariner Books",
    yearPublished: 1937
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "Business",
    description: "A framework for building startups that succeed by continuously testing and learning.",
    isbn: "9780307887894",
    photoPath: "https://books.google.com/books/content?id=tvfyz-4JILwC&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 16.0,
    publisher: "Crown Business",
    yearPublished: 2011
  },
  {
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    category: "Fantasy",
    description: "Four siblings enter the magical land of Narnia and join Aslan to defeat the White Witch.",
    isbn: "9780064471046",
    photoPath: "https://books.google.com/books/content?id=Np9BAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 8.99,
    publisher: "HarperCollins",
    yearPublished: 1950
  },
  {
    title: "And Then There Were None",
    author: "Agatha Christie",
    category: "Mystery",
    description: "Ten strangers stranded on an island are accused of past crimes as they are killed one by one.",
    isbn: "9780062073488",
    photoPath: "https://books.google.com/books/content?id=2jw3AAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    price: 10.99,
    publisher: "William Morrow",
    yearPublished: 1939
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
          const shouldUpdateCover =
            !existing.photoPath ||
            existing.photoPath.includes("books.google.com") ||
            existing.photoPath.includes("gbs_api");

          if (shouldUpdateCover) {
            existing.photoPath = book.photoPath;
            await existing.save();
            console.log(`Updated cover for "${book.title}"`);
          } else {
            console.log(`Skipping "${book.title}" - already exists`);
          }
          continue;
        }

        await Book.create(book);
        console.log(`Added: ${book.title}`);
      } catch (err) {
        console.error(`Error adding "${book.title}":`, err.message);
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
