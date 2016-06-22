angular.module('githubRepositories')

.directive('githubRepos', function() {
	return {
		restrict : 'E',
		scope : {
			repos : '='
		},
		templateUrl : 'partials/repositories.html'
	};
});