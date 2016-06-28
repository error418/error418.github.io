angular.module('ghRepositories', ['ngResource'])

.factory('Repositories', ['$resource', function($resource) {
	return $resource('/users/:user/repos', null, {
		get : {
			url : 'https://api.github.com/users/:user/repos',
			method : 'GET',
			isArray : true
		}
	});
}])

.directive('githubRepos', ['Repositories', function(Repositories) {
	return {
		restrict : 'E',
		scope : {
			user : '@'
		},
		templateUrl : 'partials/repositories.html',
		link : function(scope) {
			Repositories.get({
				user : scope.user
			}, function(success) {
				scope.repos = success;
			});
		}
	};
}]);