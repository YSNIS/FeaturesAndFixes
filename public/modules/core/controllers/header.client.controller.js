'use strict';

angular.module('core')
	//  Controls the header on all pages.  User login services, searching games, and adding games to the DB
	.controller('HeaderController', ['$scope', '$location', 'Authentication', 'Menus', 'games', function($scope, $location, Authentication, Menus, games) {
		//  Sets the current user logged in
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		
		//  Sets the search text to empty
		$scope.searchText = "";

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		// Stops the dropdown from closing when selecting an input box
		$scope.stopPropagation = function ($event) {
			$event.stopPropagation();
		};

		// Search funtion using the searchText entered by a user to find a game
		$scope.search = function() {
			$location.path('/search/' + $scope.searchText);
		}

		// Variables for adding a game to the DB: name, developer, year.
		$scope.name = "";
		$scope.developer = "";
		$scope.year;

		// Function for adding a game to the DB.  All fields must be entered.
		$scope.addGame = function () {
			if ($scope.name === "" || $scope.developer === "" || $scope.year === undefined) { return; }
			games.create({
				name: $scope.name,
				developer: $scope.developer,
				year: $scope.year
			});
		};
	}]);