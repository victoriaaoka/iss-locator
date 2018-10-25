const express = require('express');

const app = express();

// listen on port
app.listen(process.env.PORT, function () {
    console.log(`Express app listening on port ${process.env.PORT}`);
  });