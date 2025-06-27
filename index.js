const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // ✅ To read JSON from request body

let books = [];
let nextId = 1;

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT (update book)
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found.' });
  }
  const deleted = books.splice(index, 1);
  res.json({ message: 'Book deleted.', book: deleted[0] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
