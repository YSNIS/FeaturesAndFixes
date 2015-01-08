'use strict';

/*
/  This controller is used for handling information for a particular issue.  It allows comments to be added to an issue as well as those comments to be upvoted.
/
/  Dependencies
/  'issue' is a promise fulfilled by the client side route when the issue page is loaded
/  'games' is a service
*/

angular.module('core').controller('IssueController', ['$scope', 'issue', 'games',
	function($scope, issue, games) {
		//  Set's the scope issueText equal to the issue
		$scope.issueText = issue.text;
		//  Loads the issue's comments into the scope
		$scope.comments = issue.comments;
		//  Setting the commentText which the user can change to be empty
		$scope.commentText = "";
		//  FUnction for adding a comment to the issue
		$scope.addComment = function () {
			//  Create a comment object and initializing its fields
			var comment = {
				//  Setting username
				user: "jake",
				//  Setting text to equal the commentText entered by the user
				text: $scope.commentText,
				//  Initializing upvotes to 0
				upvotes: 0,
				//  Referencing the issue to which this comment will be attached
				issue: issue
			};
			//  Calling the 'games' service's addComment function passing in the particular game, issue, and the newly created comment object
			games.addComment(issue.game, issue._id, comment).success(function (userComment) {
				//  Upon success of entering a comment - reset the commentText to be blank
				$scope.commentText = "";
				//  Add the new comment to the scope's list of comments so that it shows up in the view without reloading the page
				$scope.comments.push(userComment);				
			});;
			
		};
		//  Function for upvoting a comment
		$scope.upvoteComment = function (comment) {
			//  Calls the 'games' service's upvoteComment function passing in the particular game, issue, and comment the user will upvote
			games.upvoteComment(issue.game, issue._id, comment._id);
		};
	}]);