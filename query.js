// Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// Find books published after a certain year
db.books.find({ year: { $gt: 1932 } });

// Find books by a specific author
db.books.find({ author: "J.R.R. Tolkien" });

// Update the price of a specific book
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 15.76 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "Brave New World" });

// Write a query to find books that are both in stock and published after 2010
db.books.find({
  inStock: true,
  year: { $gt: 2010 }
});

// Use projection to return only the title, author, and price fields in your queries
db.books.find(
  { genre: "Science Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
);

// Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 }); // Ascending order
db.books.find().sort({ price: -1 }); // Descending order

// Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find().skip(0).limit(5); // First page
db.books.find().skip(5).limit(5); // Second page

// Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);


//  Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      count: 1,
      _id: 0
    }
  }
]);

// Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 });


// Create a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: 1 });


// Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "1984" }).explain("executionStats");




