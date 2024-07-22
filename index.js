const express = require('express');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { swaggerOptions } = require('./config/swagger');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Routes
app.use('/', authRoutes);
app.use('/', bookRoutes);

// Generate Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI static files
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Serve swagger.json
app.get('/docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Serve index.html at /docs
app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
