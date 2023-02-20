const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');
const dotenv = require('dotenv');
dotenv.config();

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initializing the app
const app = express();

// connecting the database
async function connectdb() {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 8000;

async function startServer() {
  try {
    await connectdb();
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();

module.exports = app;

