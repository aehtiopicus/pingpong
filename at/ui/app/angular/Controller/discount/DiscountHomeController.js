/* global angularApp*/
(function(){

    'use strict';

    angularApp.controller({'DiscountHomeController': function($scope) {                        
            $scope.rules=[
                    { 'id':1,
                     'name':'Descuento por Hotel',
                     'description':'Permite indicar el descuento para un hotel',
                     'viewUrl':'/discount-per-hotel'
                    },
                    { 'id':2,
                     'name':'Descuento por Location',
                     'description':'Permite indicar el descuento para todos los hoteles que se encuentren en un Location',
                     'viewUrl':'/discount-per-location'
                    },
                    { 'id':3,
                     'name':'Descuento por Proveedor',
                     'description':'Permite indicar el descuento para todos los hoteles que provee un proveedor',
                     'viewUrl':'/discount-per-provider'
                    },
                ];
    }});
        angularApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/discount-per-hotel', {
                	 controller:'DiscountHotelController',
                	 templateUrl:'views/hoteles-admin-ui/crud-view.html'
                }).
				when('/discount-per-location', {
                    controller:'DiscountDestinoController',
                	templateUrl:'views/hoteles-admin-ui/crud-view.html'
                }).
				when('/discount-per-provider', {
                    controller:'DiscountProveedorController',
                	templateUrl:'views/hoteles-admin-ui/crud-view.html'
                });
  }]);
})();
