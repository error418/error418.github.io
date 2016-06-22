angular.module('githubRepositories', []);
angular.module("main", ['ngResource', 'githubRepositories'])

.factory('Repositories', ['$resource', function($resource) {
	return $resource(
				'/users/:user/repos', 
				null,
			    {
			        get: {
			        	url: 'https://api.github.com/users/:user/repos',
			        	method:'GET',
			        	isArray: true
			        }
			    }
	);
}])

.controller("MainController", ['Repositories', '$filter', '$scope', function (Repositories, $filter, $scope) {
	Repositories.get(
			{user: "error418"},
			function (success) {
				$scope.repos = success;
			}
	);
}]);