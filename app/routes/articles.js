// Require necessary npm packages
const express = require('express');

//Require Mongoose Model for Article
const Article = require('../models/article')

// Instantiate a Router , which is basically a mini app that only handles routes.
const router = express.Router();


/****************************************************************
 * #	Action 	URL      	 HTTP Verb	mongoose method             *
 * 1	Index  	/logs    	 GET      	Log.find({})                *
 * 2	Show   	/logs/:id	 GET      	Log.findById(req.params.id) *
 * 3	Create 	/logs    	 POST     	Log.create(req.body)        *
 * 4	Update 	/logs/:id	 PUT/PATCH	Log.findByIdAndUpdate()     *
 * 5	Destroy	/logs    	 DELETE   	Log.findByIdAndRemove()     *
 ****************************************************************/


/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Description: Get All the articles
 */

router.get('/api/articles', (request, response) => {
    Article.find()
        .then((articles) => {
            // Return all Articles as an Array
            response.status(200).json({ articles: articles })
        })
        .catch((error) => {
            // Catch any errors that might occur
            response.status(500).json({ error: error })
        })
});

/**
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/articles/79f548s97877f5w45
 * Description: Get an article by Article ID
 */

router.get('/api/articles/:id', (request, response) => {
    response.json({ message: `You are seeing the article with the ID ${requset.params.id}` })
});

/**
 * Action:      Create
 * Method:      POST
 * URI:         /api/articles
 * Description: Create a new Article
 */
router.get('/api/articles', (request, response) => {
    response.status(200).json({ message: 'Welcome to /api/article created' })
});
/**
* Action:      UPDATE
* Method:      PATCH
* URI:         /api/articles/79f548s97877f5w45
* Description: Update an Article by Article ID
*/
router.get('/api/articles', (request, response) => {
    response.status(200).json({ message: 'Welcome to /api/article created' })
});
/**
* Action:      DESTROY
* Method:      DELETE
* URI:         /api/articles/79f548s97877f5w45
* Description: Delete an Article by Article ID
*/



// Export the Router so we can use it in the severjs file
module.exports = router;