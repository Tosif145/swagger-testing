const express = require('express');
const router = express.Router();
const { addBook, deleteBook } = require('../controllers/bookController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.post('/add', authenticateToken, addBook);

router.delete('/delete', authenticateToken, deleteBook);

module.exports = router;
