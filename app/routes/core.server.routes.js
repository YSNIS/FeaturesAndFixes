'use strict';

var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Issue = mongoose.model('Issue');
var Comment = mongoose.model('Comment');

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	
	// Get a list of all games
	app.get('/games', function (req, res, next) {
		Game.find(function(err, games){
			if (err) { return next(err); }

			res.json(games);
		});
	});

	// Add a game to the database
	app.post('/games', function (req, res, next) {
		var game = new Game(req.body);

		game.save(function(err, post) {
			if (err) { return next(err); }

			res.json(game);
		});
	});

	// // Create the param ':game' using a game's id and return it
	app.param('game', function (req, res, next, id) {
		console.log("Getting Game Param");
		var query = Game.findById(id);

		query.exec(function (err, game) {
			if (err) {return next(err); }
			if (!game) { return next (new Error("Can't find game")); }

			req.game = game;
			return next();
		});
	});

	// Get a specific game's information
	app.get('/games/:game', function(req, res, next) {
		req.game.populate('issues', function(err, game) {
		    console.log("Getting Game");
		    res.json(game);
		});
	});

	// // Create the param ':issue' using a game's id and return it
	app.param('issue', function (req, res, next, id) {
		console.log("Getting Issue Param");
		var query = Issue.findById(id);

		query.exec(function (err, issue) {
			if (err) {return next(err); }
			if (!issue) { return next (new Error("Can't find issue")); }

			req.issue = issue;
			return next();
		});
	});

	// Get a specific issue's information
	app.get('/games/:game/issues/:issue', function(req, res, next) {
		console.log("Getting Issue");
		req.issue.populate('comments', function(err, issue) {
		    // console.log(issue);
		    res.json(issue);
		});
	});

	// Create a new issue
	app.post('/games/:game/issues/', function (req, res, next) {
		var issue = new Issue(req.body);
		issue.game = req.game;
		issue.save(function (err, issue) {
			if (err) { return next(err); }
			req.game.issues.push(issue);
			req.game.save(function (err, game) {
				if ( err) {return next(err); }
				res.json(issue);
			});
		});
	});

	// Create a new comment
	app.post('/games/:game/issues/:issue', function (req, res, next) {
		var comment = new Comment(req.body);
		comment.issue = req.issue;

		comment.save(function (err, comment) {
			if (err) { return next(err); }
			req.issue.comments.push(comment);
			req.issue.save(function (err, issue) {
				if (err) { return next(err); }
				res.json(comment);
			});
		});
		console.log("adding comment");
	});

	// Create a param for :search
	app.param('search', function (req, res, next, text) {
		console.log("Getting Search Param");
		var query = Game.find({name: {$regex: "(?i)"+text}})
		// var query = Game.find({name: text});
		// console.log(query);

		query.exec(function (err, results) {
			if (err) {return next(err); }
			if (!results) { return next (new Error("Can't find search results")); }

			req.results = results;
			return next();
		});
	});

	// // Create the param ':comment' using a comments's id and return it
	app.param('comment', function (req, res, next, id) {
		console.log("Getting Comment Param");
		var query = Comment.findById(id);

		query.exec(function (err, comment) {
			if (err) {return next(err); }
			if (!comment) { return next (new Error("Can't find comment")); }

			req.comment = comment;
			return next();
		});
	});	

	// Search for a game
	app.get('/search/:search', function (req, res, next) {
		res.json(req.results);
		console.log(req.results);
	});

	// Upvote an issue
	app.put('/games/:game/issues/:issue/upvote', function(req, res, next) {
		req.issue.upvote(function (err, issue) {
			if (err) { return next(err); }

			res.json(issue);
		});
	});

	// Upvote an issue
	app.put('/games/:game/issues/:issue/comments/:comment/upvote', function(req, res, next) {
		req.comment.upvote(function (err, comment) {
			if (err) { return next(err); }

			res.json(comment);
		});
	});
};