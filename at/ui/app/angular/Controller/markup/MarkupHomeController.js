/* global angularApp*/
(function(){

    'use strict';

    angularApp.controller({'MarkupHomeController': function($scope) {                        
            $scope.rules=[
                    { 'id':1,
                     'name':'Markup por Destino (Locación)',
                     'description':'Permite definir el markup a utilizar para todos los hoteles de un destino(el cual puede ser una ciudad o un  país)',
                     'viewUrl':'/markup-por-location'
                    },
                    { 'id':2,
                     'name':'Markup por Hotel',
                     'description':'Permite definir el markup a utilizar para un hotel',
                     'viewUrl':'/markup-por-hotel'
                    },
                    { 'id':3,
                     'name':'Markup por Default',
                     'description':'XXXXXXXXXXXXX',
                     'viewUrl':'/markup-por-default'
                    },
					{ 'id':4,
				             'name':'Markup por Proveedor',
				             'description':'Permite definir el markup a aplicar sobre todos los hoteles que prevee un proveedor',
				             'viewUrl':'/markup-por-proveedor'
				            },
					{ 'id':5,
				             'name':'Markup sobre impuestos',
				             'description':'Permite definir el markup a aplicar sobre los impuestos',
				             'viewUrl':'/markup-sobre-impuesto'
				            },
				        ];
    }});
        angularApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/markup-por-location', {
                    controller:'MarkupLocationController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
                }).
                when('/markup-por-hotel', {
                    controller:'MarkupHotelController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
                }).
                when('/markup-por-default', {
                    controller:'MarkupDefaultController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
            	}).
                when('/markup-por-proveedor', {
                    controller:'MarkupProveedorController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
            	}).
                when('/markup-sobre-impuesto', {
                    controller:'MarkupOnTaxesController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
            	});
  }]);
})();
