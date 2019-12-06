/***********************************
 * ************ Models *************
 * Article and Comment Schemas and Models.
 * Since articles and comments relationship is 
 * one to many, embedded method is used.
 * Comment Schema is embedded in Article Schema.
 * Both are compiled into models.
 * Both are exported.
 ***********************************/

// Require necessary NPM Packages
const mongoose = require('mongoose')

// Define Comment Schema
const commentSchema = new mongoose.Schema({
    content: String
}, { timestamps: true });

// Define Article Schema 
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
    author: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: true
    },
    publishedOn: {
        type: Date, default: Date.now
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

// Compile our Models based on the Schema
const Comment = mongoose.model('Comment', commentSchema);
const Article = mongoose.model('Article', articleSchema);

// Export our Model for use
module.exports = { Article, Comment }