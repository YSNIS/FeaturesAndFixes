'use strict';

angular.module('core')
	//  Creating the service which stores the list of games in the DB as well as performs REST functions
	.factory('games', ['$http', function ($http) {
		//  Initializing the games variable to include a list of two games by default
		var o = {
			games: [
				{
					name: "Sonic",
					developer: "Sega",
					year: 1991
				},
				{
					name: "Mega Man",
					developer: "Capcom",
					year: 1986
				}
			]
		};
		//  Gets the games in the DB and replaces the list of games in the service with the games in the DB
		o.getAll = function () {
			return $http.get('/games').success(function(data) {
				angular.copy(data, o.games);
			});
		};
		//  Creates a new game in the DB
		o.create = function (game) {
			return $http.post('/games', game).success(function(data){
				o.games.push(data);
			});
		};
		//  Get's a specific game's information such as list of issues
		o.get = function (id) {
			return $http.get('/games/' + id).then(function(res) {
				return res.data;
				// console.log('hi');
				// return {name: "Jake"};
			});
		};
		//  Add's an issue to a game
		o.addIssue = function (id, issue) {
			return $http.post('/games/' + id + '/issues', issue);
		};
		//  Get's a specific issue's information such as comments and body
		o.getIssue = function (gameId, issueId) {
			return $http.get('/games/' + gameId + '/issues/' + issueId).then(function(res) {
				return res.data;
			});
		};
		//  Adds a comment to an issue
		o.addComment = function (gameId, issueId, comment) {
			return $http.post('/games/' + gameId + '/issues/' + issueId, comment);
		};
		//  Looks for a game in the DB using a string of search text
		o.searchGames = function(searchText) {
			return $http.get('/search/' + searchText);
		};
		//  Adds an upvote to an issue of a specified game
		o.upvoteIssue = function(gameId, issueId) {
			return $http.put('/games/' + gameId + '/issues/' + issueId + '/upvote').success(function(data){
				// console.log(data);
			});
		};
		//  Upvotes a comment of a specified issue
		o.upvoteComment = function(gameId, issueId, commentId) {
			return $http.put('/games/' + gameId + '/issues/' + issueId + '/comments/' + commentId + '/upvote').success(function(data){
				console.log("yay");
			});
		};
		//  Returns the service allowing the app to use these functions
		return o;
	}]);