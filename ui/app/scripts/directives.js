/* global angular _*/
/*jshint unused: false*/
/*jshint debug: true*/
'use strict';

/* Directives */

angular.module('pingpongapp').
	directive('playerInfo', ['$parse','MatchInformationFactory',function($parse,MatchInformationFactory) {
		return{
			restrict : 'E',
			templateUrl : 'views/playerInfo.html',
			scope :{
				//isolate scope
				miembro: '=',
				statusData : '&',
				info :'@',
				infoDelete :'&unsubscribe'				
			},
			link : function(scope,elements,attr){
				
				scope.mostrar = false;

				debugger;

				if(!attr.info){

					var _restrieveDataFn = $parse(scope.statusData());
					if(_restrieveDataFn()){
						scope.mostrar = true;
					}
					scope.mostrarEstadisticas = function(){
						MatchInformationFactory.list().$promise.then(
						function(resultOk){
							scope.statsReady = true;
						},
						function(resultFailure){
							scope.statsReady = false;
						});				
					};

					scope.ocultarEstadisticas = function(){
						scope.statsReady = false;
					};
				}else{
					
					scope.unsubscribe = function(){
						$parse(scope.infoDelete())(scope.miembro);
					}
					;
				}
				
			}
		};
		
    }])
    .directive('datosJugador', [function() {
		return{
			restrict : 'EA',
			template : '<h3 align=center style="text-align:left;">Datos del jugador</h3>',
			link : ['scope','elements','attr',function(scope,elements,attr){
				
			}]
		};
		
    }])
   ;
