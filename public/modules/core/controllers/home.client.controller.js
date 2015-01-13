'use strict';

angular.module('core')
	//  Controller for handling the home page.  Has a list of games and authentication information for logging in.
	.controller('HomeController', ['$scope', 'Authentication', 'games', function($scope, Authentication, games) {
		//  This provides Authentication context.
		$scope.authentication = Authentication;
		//  Pulls a list of games from the games service
		$scope.games = games.games;
	}]);