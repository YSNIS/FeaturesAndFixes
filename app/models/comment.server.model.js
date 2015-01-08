'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	user: String,
	text: String,
	upvotes: Number,
	issue: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue'}]
});

CommentSchema.methods.upvote = function (cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Comment', CommentSchema);