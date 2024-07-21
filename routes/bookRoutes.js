const express = require('express');
const router = express.Router();
const { addBook, deleteBook } = require('../controllers/bookController');
const { authenticateToken } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /books/add:
 *   post:
 *     summary: Add a favorite book
 *     security:
 *       - jwtBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookName:
 *                 type: string
 *                 description: Name of the book to add
 *     responses:
 *       201:
 *         description: Book added
 */
router.post('/add', authenticateToken, addBook);

/**
 * @openapi
 * /books/delete:
 *   delete:
 *     summary: Delete a favorite book
 *     security:
 *       - jwtBearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookName:
 *                 type: string
 *                 description: Name of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete('/delete', authenticateToken, deleteBook);

module.exports = router;
