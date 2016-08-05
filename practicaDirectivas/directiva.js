'use strict'
angular.module('cowAPP1', []).
	controller('ctr',function($scope){
		$scope.nombre = {};		
	}).
	directive('miDirectiva',function(){
		return {
			template : '<h3>Hola</h3>'
		}
	})
	.directive('miDirectiva2',function(){
		return {
			template : '<h3>Hola</h3>',
			restrict : 'A'
		}
	})
	.directive('miDirectiva3',function(){
		return {
			templateUrl : 'directiva3.html',
			restrict : 'A'
		}
	})
	.directive('miDirectiva4',function(){
		return {
			template : '<h3 ng-if="nombre"> Hola soy {{nombre}}</h3>',
			restrict : 'A'
		}
	})
;