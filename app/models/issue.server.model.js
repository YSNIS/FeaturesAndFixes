'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Issue Schema
 */
var IssueSchema = new Schema({
	title: String,
	text: String,
	type: String,
	upvotes: {type: Number, default: 0 },
	game: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
	dateCreated: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

IssueSchema.methods.upvote = function (cb) {
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('Issue', IssueSchema);