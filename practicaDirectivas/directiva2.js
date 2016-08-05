'use strict'
angular.module('cowAPP2', []).
	controller('miController',function($scope){
		$scope.nombre = 'cow';
		$scope.apellido = 'mu';
		$scope.email = 'cow@cow.org';

		$scope.persona = {
			nombre : 'cow',
			apellido : 'mu',
			email : 'cow@cow.org'
		};
		$scope.color = 'red';
		$scope.titulo = 'muuu';
		$scope.bgColor = function(){
			return $scope.color;
		}
		$scope.closeThis = function(){
			$scope.chauCuadrado = true;
		}
	})
	.directive('miDirectiva',function(){
		return {
			template : '<h3 ng-click="borrarNombre()">Hola {{nombre}}</h3>',
			restric : 'A',
			scope : false,
			controller : function($scope){
				$scope.borrarNombre = function(){
					$scope.nombre = '';
				}
			}
		}
	})
	.directive('miDirectiva2',function(){
		return {
			template : '<h3 ng-click="borrarNombre()">Apellido: {{apellido}}</h3>',
			restric : 'A',
			scope : true,
			controller : function($scope){
				$scope.borrarNombre = function(){
					$scope.apellido = '';
				}
			}
		}
	})

	.directive('miDirectiva3',function(){
		return {
			template : '<h3 ng-click="agregarEmail()">Email: {{email}}</h3><input type="text" ng-model="datos.email" ng-if="habilitado">datos.email {{datos.email}} ',
			restric : 'A',
			scope : {},
			controller : function($scope){
				$scope.datos={};
				$scope.agregarEmail = function(){
					$scope.habilitado = true;
				}
			}
		}
	})

	.directive('miDirectiva4',function(){
		return {
			restric : 'A',
			scope : {
				persona : '=people',
				callBack : '&cb',
				titulo : '@'

			},			
			link : function(scope,elements,attr){
				console.log(scope.persona);
				scope.persona.nombre = 'fake-fn';
				scope.persona.apellido = 'fake-ln';
				scope.persona.email = 'fake-email';
				scope.titulo = 'fake-titulo';
				elements.attr('style','background-color:'+scope.callBack()());
				
				var _attachFunction = function(elements,scope){

					var color = angular.element(elements.find('input')[elements[0].children.length-1]);
					color.bind('blur',function(event){						
						elements.attr('style','background-color:'+event.target.value);
					});
				};


				_attachFunction(elements,scope)


			}
				
			

			
		}
	})
	.directive('clickOut', function($document) {
    return {
        restrict: 'A',
        scope: {
            clickOut: '&'
        },
        link: function (scope, element) {
            var handler = function(event) {
                if (element[0].contains(event.target)) {
                    scope.$apply(function () {
                        scope.clickOut({ $event : event }); 
                    });
                }
            };

            $document.on('click', handler);
            scope.$on('$destroy', function() {
                $document.off('click', handler);
            });
        }
    };
    })
;