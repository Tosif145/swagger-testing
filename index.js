const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { swaggerOptions } = require('./config/swagger');
const connectDB = require('./config/db');
require('dotenv').config();
const router = express.Router();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

// Routes
app.use('/', authRoutes);
app.use('/', bookRoutes);

// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs',swaggerUi.setup(swaggerSpec))




app.listen(3000, () => {
  console.log('Server running on port 3000');
});