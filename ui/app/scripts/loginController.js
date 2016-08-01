/*global angular, _ */
'use strict';

angular.module('pingpongapp').
	controller('LoginController',['$scope','$log','miembroFactory','localStorageService','ControllerCommunicationFactory',function($scope,$log,miembroFactory,localStorageService,ControllerCommunicationFactory){
		
		var _userLoggedKey = localStorageService.retrieveKey(localStorageService.availableKeys()[0]);
		
		$scope._loginChecker = false;
		
		$scope.doLogin = function(){
			miembroFactory.list().$promise.then(function(response){
				response.forEach(function(miembro){
					if(_.isNull(miembro.usuario) || _.isNull(miembro.passwd)){
						$scope.loginFailure = false;
						return;
					}
					if(miembro.usuario.toString() === $scope.loginData.userName && miembro.passwd.toString() === $scope.loginData.password && !miembro.deleted){
						$scope.loginCompleted(miembro);
						$scope.loginFailure = false;
						return;
					}
				});
				$scope.loginFailure = true;
			},function(errorResponse){
				$log.error(errorResponse);
			});
		};

		var _clearLogin = function(){
			$scope.loginData = {
				userName : null,
				password : null	
			};
			$scope.userLoggedIn = false;	
			$scope.loginFailure = false;
		};		
		
		$scope.loginCompleted = function(miembro){
			localStorageService.saveInLocalStorage(_userLoggedKey,miembro);
			$scope.user = miembro;
			$scope.userLoggedIn = true;
			
			$scope.showParticipante = !_.isUndefined(miembro.superUser);	
			ControllerCommunicationFactory.emitMsg(ControllerCommunicationFactory.loginCompleted,miembro);                 
		};

		(function(){
			$scope.user = localStorageService.retrieveFromLocalStorage(_userLoggedKey);
			_clearLogin();
			if(!_.isNull($scope.user)){
				$scope.loginCompleted ($scope.user);
			}else{
				$scope.userLoggedIn = false;	
			}
			$scope._loginChecker = true;
		})();
		
		$scope.logout = function(){
			localStorageService.removeFromLocalStorage(_userLoggedKey);
			_clearLogin();	
			ControllerCommunicationFactory.emitMsg(ControllerCommunicationFactory.logoutCompleted,'out');                 		
		};
		

}]);
