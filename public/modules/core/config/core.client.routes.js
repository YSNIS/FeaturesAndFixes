'use strict';

// Setting up route
angular.module('core', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider
		//  This is the route for the homepage
		.state('home', {
			//  Defining the URL for this route
			url: '/',
			//  Link to the view
			templateUrl: 'modules/core/views/home.client.view.html',
			//  Defines the controller as the HomeController
			controller: 'HomeController',
			//  Creates a promise called gamePromise which will load all the games in the database to the service games
			//  There is no dependecy for the HomeController to use since the function simply loads the games into the service
			//  This will load first when the page is initially called so the controller can access it
			resolve: {
				gamePromise: ['games', function (games) {
					//  Calls the games service's getAll function which loads all the games in the db to the games service
					return games.getAll();
				}]
			}
		})
		//  This is the route for displaying a particular game
		.state('games', {
			//  URL is attaching the id of the game to $stateParams
			url: '/games/{id}',
			//  Link to the view for this route
			templateUrl: 'modules/core/views/game.client.view.html',
			//  Defines the controller for this route to GameController
			controller: 'GameController',
			//  Creates a promise called game to be filled with the specified game's data
			//  The game's information will be accessible by the controller as the dependency 'game'
			//  This promise will be called before the page is loaded to ensure the proper information is rendered
			resolve: {
				game: ['$stateParams', 'games', function ($stateParams, games){
					// return {name: jake};
					// console.log(games.get($stateParams.id));
					return games.get($stateParams.id);
				}]
			}
		})
		//  This is the route for displaying a particular issue for a game
		.state('issues', {
			//  URL is attaching both the game id and issue id to $stateParams
			url: '/games/{gameId}/issues/{issueId}',
			//  Link to the view
			templateUrl: 'modules/core/views/issue.client.view.html',
			//  Defines the controller for the view to the IssueController
			controller: 'IssueController',
			//  Creates a promise called issue to be filled with the specified issue's data
			//  This will be accessible by the controller as the dependency 'issue'
			//  This promise will be called before the page is loaded to ensure the proper information is rendered
			resolve: {
				issue: ['$stateParams', 'games', function ($stateParams, games) {
					//  Calls the games service 'getIssue' function to search for a particular issue
					return games.getIssue($stateParams.gameId, $stateParams.issueId);
				}]
			}
		})
		// This is the route for searching for games
		.state('search', {
			//  URL pulls the info in searchText as the $stateParams
			url: '/search/{searchText}',
			//  Link to the view
			templateUrl: 'modules/core/views/search.client.view.html',
			//  Defines the controller for the view as SearchController
			controller: 'SearchController',
			//  Creates a promise called searchResults to be filled the results of the search
			//  This will be accessible by the controller as the dependency 'searchResults'
			//  This promise will be called before the page is loaded to ensure the proper information is rendered
			resolve: {
				searchResults: ['$stateParams', 'games', function ($stateParams, games) {
					//  Calls the games service "searchGames" function using the searchText entered by the user
					return games.searchGames($stateParams.searchText);
				}]
			}
		});
	}]);