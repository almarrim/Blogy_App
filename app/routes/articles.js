/***************************
 * *********ROUTER***********
 * article routers
 ****************************/

// Require necessary npm packages
const express = require('express');

//Require Mongoose Model for Article
const Article = require('../models/article').Article;

// Instantiate a Router , which is basically a mini app that only handles routes.
const router = express.Router();


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
    Article.findById(request.params.id)
        .then((reqArticle) => {
            if (reqArticle) {
                // Pass the result of Mongoose's '.get' method to the next '.then' statment
                response.status(200).json({ article: reqArticle });
            } else {
                // If we couldn't find a document with the matching ID
                response.status(404).json({
                    error: {
                        name: "DocumentNotFoundError",
                        message: " the provided ID doesn\'t match any document"
                    }
                })
            }
        })
        // Catch any errors
        .catch((error) => {
            response.status(500).json({ error: error })
        })
})


/**
 * Action:      Create
 * Method:      POST
 * URI:         /api/articles
 * Description: Create a new Article
 */
router.post('/api/articles', (request, response) => {
    Article.create(request.body.article)
        //On a successful 'create' action, respond with 201
        // HTTP status and the content of the new article.
        .then((newarticle) => {
            response.status(201).json({ article: newarticle })
        })
        //Catch any errors that might occur
        .catch((error) => {
            response.status(500).json({
                error: error
            });
        })
});
/**
* Action:      UPDATE
* Method:      PATCH
* URI:         /api/articles/79f548s97877f5w45
* Description: Update an Article by Article ID
*/
router.patch('/api/articles/:id', (request, response) => {
    Article.findById(request.params.id)
        .then((article) => {
            if (article) {
                // Pass the result of Mongoose's '.patch' method to the next '.then' statment
                return article.updateOne(request.body.article);
            } else {
                // If we couldn't find a document with the matching ID
                response.status(404).json({
                    error: {
                        name: "DocumentNotFoundError",
                        message: " the provided ID doesn\'t match any document"
                    }
                })
            }
        })
        // then for the article ".remove()" method
        .then((newArticle) => {
            // If the update succeeded, return 202 and no JSON
            response.status(202).json({ newArticle });
        })
        // Catch any errors
        .catch((error) => {
            response.status(500).json({ error: error })
        })
})

/**
* Action:      DESTROY
* Method:      DELETE
* URI:         /api/articles/79f548s97877f5w45
* Description: Delete an Article by Article ID
*/
router.delete('/api/articles/:id', (request, response) => {
    Article.findById(request.params.id)
        .then((article) => {
            if (article) {
                // Pass the result of Mongoose's '.delete' method to the next '.then' statment
                return article.remove();
            } else {
                // If we couldn't find a document with the matching ID
                response.status(404).json({
                    error: {
                        name: "DocumentNotFoundError",
                        message: " the provided ID doesn\'t match any document"
                    }
                })
            }
        })
        // then for the article ".remove()" method
        .then(() => {
            // If the deletion succeeded, return 204 and no JSON
            response.status(204).end();
        })
        // Catch any errors
        .catch((error) => {
            response.status(500).json({ error: error })
        })
})


// Export the Router so we can use it in the severjs file
module.exports = router;