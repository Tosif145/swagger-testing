const User = require('../models/userModel');

// Add a book to the user's list
const addBook = async (req, res) => {
  const { bookName } = req.body;
  const { username } = req.user;
  
  if (!bookName) return res.status(400).send('Book name is required');

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');

    user.books.push(bookName);
    await user.save();
    res.status(201).send(`Book '${bookName}' added`);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Delete a book from the user's list
const deleteBook = async (req, res) => {
  const { bookName } = req.body;
  const { username } = req.user;
  
  if (!bookName) return res.status(400).send('Book name is required');

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');

    user.books = user.books.filter(book => book !== bookName);
    await user.save();
    res.status(200).send(`Book '${bookName}' deleted`);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = { addBook, deleteBook };
