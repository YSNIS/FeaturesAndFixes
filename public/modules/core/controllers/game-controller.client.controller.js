'use strict';

angular.module('core').controller('GameController', ['$scope', '$location', 'games', 'game', function($scope, $location, games, game) {
		$scope.name = game.name;
		$scope.developer = game.developer;
		$scope.year = game.year;
		$scope.id = game._id;
		$scope.issues = game.issues;
		// $scope.title = "hi";
		
		$scope.addIssue = function() {
			var d = new Date();
			var date = d.toDateString();
			var issue = {
				title: $scope.title,
				text: $scope.text,
				type: $scope.type,
				dateCreated: date
			};
			games.addIssue(game._id, issue).success(function (userIssue) {
				// Go to the page of the newly created issue				
				console.log(userIssue._id);
				// $window.location.href = '#!/games/' + game._id + '/issues/' + userIssue._id;
				$location.path('/games/' + game._id + '/issues/' + userIssue._id);
			});
		};

		$scope.upvoteIssue = function (issue) {
			games.upvoteIssue(game._id, issue._id);
			// console.log(issue);
		};
		$(".addIssueButton").click(function() {
			$(".addIssueDropdown").slideToggle();
		});
		// console.log(date);
	}]);