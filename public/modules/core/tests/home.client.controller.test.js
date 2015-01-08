

(function() {
	describe('HomeController', function() {
		//Initialize global variables
		var scope,
			HomeController;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope.$new();

			HomeController = $controller('HomeController', {
				$scope: scope,
			});
		}));

		it('should expose the authentication service', function() {
			expect(scope.authentication).toBeTruthy();
		});

		it('should receive a list of default games (2) from the games service', function() {	
			expect(scope.games.length).toBe(2);
		});

	});
})();