'use strict';

angular.module('pingpongapp').
	controller('LoginController',['$scope','$log','miembroFactory',function($scope,$log,miembroFactory){

		$scope.doLogin = function(){
			miembroFactory.list().$promise.then(function(response){
				response.forEach(function(miembro){
					if(miembro.usuario === $scope.loginData.userName && miembro.passwd === $scope.loginData.password){
						$scope.loginCompleted(miembro);
					}
				});
				console.log(response);
			},function(errorResponse){
				$log.error(errorResponse);
			});
		};

		$scope.loginData = {
			userName : null,
			password : null	
		};
		
		$scope.loginCompleted = function(miembro){
			localStorage.setItem('loggedUser',miembro);
		};

}]);
