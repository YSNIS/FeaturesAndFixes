'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
	name: String,
	developer: String,
	year: Number,
	issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Issue'}]
});

mongoose.model('Game', GameSchema);