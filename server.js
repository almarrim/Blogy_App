// Require necessary npm packages
const express = require('express');
const mongoose = require('mongoose');

// Require Route Files
const indexRouter = require('./app/routes/index');

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5000

/******* Routes ********/
// Mount imported Routers

// Index
app.use(indexRouter);

/******* End of Routes ******/
// Start the server to listen for request on a given port
app.listen(port, () => {
    console.log(`blogy is listening on port ${port}`);
});
