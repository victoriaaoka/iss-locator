const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Connect to db
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'connection error:'));

// listen on port
app.listen(process.env.PORT, function () {
    console.log(`Express app listening on port ${process.env.PORT}`);
  });
  