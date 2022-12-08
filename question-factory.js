var questionFactory = angular.module('questionFactory', []);

questionFactory.factory('Question', function($http)
{
	return $http.get('questions.json');
});
