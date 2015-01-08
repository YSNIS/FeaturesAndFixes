'use strict';

/*
/	This is the controller for handling search results for games.  The controller simply pulls the search results information from the searchResults promise and attaches them to the scope for use in the view
/	
/	Dependencies - searchResults is filled via a promise in the client routes when the page is loaded
*/
angular.module('core').controller('SearchController', ['$scope', 'searchResults',
	function($scope, searchResults) {
		//  Sets the scope's results to equal the search results from the searchResults 
		$scope.results = searchResults.data;
	}]);