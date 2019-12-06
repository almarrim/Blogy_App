
/****************************************
 * *********ROUTER***********************
 * Comments routers.
 * Comments routers need Article models since comments's
 * documents are embedded in it Article documnets
 ****************************************/
// Require necessary npm packages
const express = require('express');

//Require Mongoose Models for Comment and Article
const Article = require('../models/article').Article
const Comment = require('../models/article').Comment

// Instantiate a Router , which is basically a mini app that only handles routes.
const router = express.Router();


/*
* Action:      INDEX
* Method:      GET
* URI:         /api/articles/:article_id/comments
* Description: Get All comments of an articles
*/
router.get('/api/articles/:article_id/comments', (request, response) => {
    const articleId = request.params.article_id;
    // search for the article with given Article ID
    Article.findById(articleId)
        // findById response
        .then((reqArticle) => {
            // if Article is found
            if (reqArticle) {
                response.status(200).json({ comments: reqArticle.comments })
            } else {
                // Article not found
                response.status(404).json({
                    error:
                    {
                        name: "DocumentNotFoundError",
                        message: "There is no Article with the given ID"
                    }
                })
            }
        })
        // if there are any errors
        .catch((error) => {
            response.status(500).json({ error: error })
        })
});
/*
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/articles/:article_id/comments/:comment_id
 * Description: Show a comment with a given ID from an article
 */
router.get('/api/articles/:article_id/comments/:comment_id', (request, response) => {
    Article.findById(request.params.article_id)
        .then(reqArticle => {
            if (reqArticle && reqArticle.comments.id(request.params.comment_id)) {
                response.status(200).json({ comment: reqArticle.comments.id(request.params.comment_id) })
            } else {
                response.status(404).json({
                    error:
                    {
                        name: "DocumentNotFoundError",
                        message: "There is no Article or Comment with the given IDs"
                    }
                })
            }
        })
        .catch(error => {
            response.status(500).json({ error: error })
        })
});

/*
 * Action:      Create
 * Method:      POST
 * URI:         /api/articles/:article_id/comments
 * Description: Create a new comment for an Article
 */
router.post('/api/articles/:article_id/comments', (request, response) => {
    // create the comment
    const newComment = new Comment({ content: request.body.content })
    //search for the article with the given ID
    Article.findById(request.params.article_id)
        .then((reqArticle) => {
            if (reqArticle) {
                reqArticle.comments.push(newComment);
                reqArticle.save((error, newArticle) => {
                    response.status(201).json({ article: newArticle })
                })
            } else {
                response.status(404).json({
                    error:
                    {
                        name: "DocumentNotFoundError",
                        message: "There is no Article with the given IDs"
                    }
                })
            }
        })
        .catch((error) => {
            response.status(500).json({ error: error })
        })
});
/*
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/articles/:article_id/comments/:comment_id
 * Description: Update a comment with a given ID from an article
 */
router.patch('/api/articles/:article_id/comments/:comment_id', (request, response) => {
    Article.findById(request.params.article_id)
        .then(reqArticle => {
            if (reqArticle && reqArticle.comments.id(request.params.comment_id)) {
                reqArticle.comments.id(request.params.comment_id).content = request.body.content;
                reqArticle.save()
                    .then(() => {
                        response.status(202).json(reqArticle.comments.id(request.params.comment_id))
                    })
                // return reqArticle.save((error, upArticle) => {
                //     if (!error) {
                //         response.status(202).json(upArticle.comments.id(request.params.comment_id))
                //     }
                // })
            } else {
                response.status(404).json({
                    error:
                    {
                        name: "DocumentNotFoundError",
                        message: "There is no Article with the given IDs"
                    }
                })
            }
        })
        .catch(error => {
            response.status(500).json({ error: error })
        })
});

/*
 * Action:      Destroy
 * Method:      DELETE
 * URI:         /api/articles/:article_id/comments/:comment_id
 * Description: Delete a comment with a given ID from an article
 */
router.delete('/api/articles/:article_id/comments/:comment_id', (request, response) => {
    Article.findById(request.params.article_id)
        .then(reqArticle => {
            if (reqArticle && reqArticle.comments.id(request.params.comment_id)) {
                return reqArticle.update({
                    $pull: {
                        comments: {
                            _id: request.params.comment_id
                        }
                    }
                })
                    .then(() => {
                        response.status(204).end();
                    })
            } else {
                response.status(404).json({
                    error:
                    {
                        name: "DocumentNotFoundError",
                        message: "There is no Article or Comment with the given IDs"
                    }
                })
            }
        })
        .catch(error => {
            response.status(500).json({ error: error })
        })
});


module.exports = router;