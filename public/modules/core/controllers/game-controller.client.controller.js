'use strict';

angular.module('core')
	//  Controller for the single game info page
	.controller('GameController', ['$scope', '$location', 'games', 'game', function($scope, $location, games, game) {
		
		// Variables for holding the data of the game
		$scope.name = game.name;
		$scope.developer = game.developer;
		$scope.year = game.year;
		$scope.id = game._id;
		$scope.issues = game.issues;
		// $scope.title = "hi";
		
		// Function for adding an issue for the game
		$scope.addIssue = function() {
			// Issue information
			var d = new Date();
			var date = d.toDateString();
			var issue = {
				title: $scope.title,
				text: $scope.text,
				type: $scope.type,
				dateCreated: date
			};
			//  Adds the issue to the game
			games.addIssue(game._id, issue)
				// If successful go to the page of the newly created issue				
				.success(function (userIssue) {
					// console.log(userIssue._id);
					// $window.location.href = '#!/games/' + game._id + '/issues/' + userIssue._id;
					$location.path('/games/' + game._id + '/issues/' + userIssue._id);
				});
		};

		//  Allows an issue to be upvoted
		$scope.upvoteIssue = function (issue) {
			games.upvoteIssue(game._id, issue._id);
			// console.log(issue);
		};

		// Creates a toggle button to show/hide the issue fields for adding an issue
		$(".addIssueButton").click(function() {
			$(".addIssueDropdown").slideToggle();
		});
		// console.log(date);
	}]);