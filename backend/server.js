require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', require('./routes/authRoutes'));

// Remaining feature routes are mounted here as each one is built (users, profile, jobs, applications).

// Centralized error handler must be the LAST app.use() call.
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
