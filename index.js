const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { swaggerOptions } = require('./config/swagger');
const connectDB = require('./config/db');

const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve Swagger UI assets
app.use('/swagger-ui', express.static(path.join(__dirname, 'swagger-ui')));

// Routes
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
