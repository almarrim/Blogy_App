// Require necessary npm packages
const express = require('express');
const mongoose = require('mongoose');

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5002

// Start the server to listen for request on a given port
app.listen(port, () => {
    console.log(`blogy is listening on port ${port}`);
});
