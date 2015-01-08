'use strict';

angular.module('core')
	.controller('HeaderController', ['$scope', '$location', 'Authentication', 'Menus', 'games', function($scope, $location, Authentication, Menus, games) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
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

		// Search funtion
		$scope.search = function() {
			$location.path('/search/' + $scope.searchText);
		}

		$scope.name = "";
		$scope.developer = "";
		$scope.year;
		$scope.addGame = function () {
			if ($scope.name === "" || $scope.developer === "" || $scope.year === undefined) { return; }
			games.create({
				name: $scope.name,
				developer: $scope.developer,
				year: $scope.year
			});
		};
	}]);