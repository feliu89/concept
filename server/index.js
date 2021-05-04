const express = require('express');
const cors = require('cors');
const router = require('./router');
const db = require('./config/db');
require('dotenv').config();

// Init
const app = express();
const PORT = process.env.PORT || 5000;

// Database
db.authenticate()
  // eslint-disable-next-line
  .then(() => console.log(`Database connected...`))
  .catch((err) => new Error(err));

// Middlewares
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server is running at port ${PORT} 🚀`))