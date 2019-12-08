// Require necessary npm packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require Route Files
const indexRouter = require('./app/routes/index');
const articlesRouter = require('./app/routes/articles');
const commentsRouter = require('./app/routes/comments')

//Require the DB Configuration file
const db = require('./config/db')
// Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo')
})

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on
const port = process.env.PORT || 5000
// Frontend's(react) local port
const reactPort = 3000


/******* Middleware ********/
// The method '.use' sets up midlleware for the Express applicatoin


// Add 'bodyParser' middleware which will parse JSON request into
// JS objects before they reach the route files.
app.use(express.json());

// Set CORS headers on response from this API using the 'cors' NPM package
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhose:${reactPort}` }));

/******* Routes ********/
// Mount imported Routers
app.use(indexRouter);
app.use(articlesRouter);
app.use(commentsRouter);

/******* End of Routes ******/
// Start the server to listen for request on a given port
app.listen(port, () => {
    console.log(`blogy is listening on port ${port}`);
});
