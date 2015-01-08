'use strict';

angular.module('core')

	.factory('games', ['$http', function ($http) {
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
		o.getAll = function () {
			return $http.get('/games').success(function(data) {
				angular.copy(data, o.games);
			});
		};
		o.create = function (game) {
			return $http.post('/games', game).success(function(data){
				o.games.push(data);
			});
		};
		o.get = function (id) {
			return $http.get('/games/' + id).then(function(res) {
				return res.data;
				// console.log('hi');
				// return {name: "Jake"};
			});
		};
		o.addIssue = function (id, issue) {
			return $http.post('/games/' + id + '/issues', issue);
		};
		o.getIssue = function (gameId, issueId) {
			return $http.get('/games/' + gameId + '/issues/' + issueId).then(function(res) {
				return res.data;
			});
		};
		o.addComment = function (gameId, issueId, comment) {
			return $http.post('/games/' + gameId + '/issues/' + issueId, comment);
		};
		o.searchGames = function(searchText) {
			return $http.get('/search/' + searchText);
		};
		o.upvoteIssue = function(gameId, issueId) {
			return $http.put('/games/' + gameId + '/issues/' + issueId + '/upvote').success(function(data){
				// console.log(data);
			});
		};
		o.upvoteComment = function(gameId, issueId, commentId) {
			return $http.put('/games/' + gameId + '/issues/' + issueId + '/comments/' + commentId + '/upvote').success(function(data){
				console.log("yay");
			});
		};
		return o;
	}])
	.controller('HomeController', ['$scope', 'Authentication', 'games', function($scope, Authentication, games) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.games = games.games;
	}]);