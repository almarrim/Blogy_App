/**
 ********* ROUTES ********
 **/

// Require necessary NPM Packages
const express = require('express');

// Instantiate a Router , which is basically a mini app that only handles routes.
const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         '/'
 * Description: Get the Root Route
 */
router.get('/', (request, response) => {
    response.json({ message: 'Welcome to Blogy' })
});


// Export the Router so we can use it in the severjs file
module.exports = router;