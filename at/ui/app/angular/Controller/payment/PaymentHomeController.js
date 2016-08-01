/* global angularApp*/
(function(){

    'use strict';

    angularApp.controller({'PaymentHomeController': function($scope) {                        
            $scope.rules=[
                    { 'id':1,
                     'name':'Métodos de Pago General',
                     'description':'Permite definir los métodos de pago válidos para todas las verticales(vuelos, hoteles, etc...)',
                     'viewUrl':'/commons-payment'
                    },
                    { 'id':2,
                     'name':'Métodos de Pago de Hoteles',
                     'description':'Permite definir los métodos de pago válidos para los hoteles',
                     'viewUrl':'/hotels-payment'
                    },
                    { 'id':3,
                     'name':'Tarjetas de Crédito General',
                     'description':'Permite definir las tarjetas de crédito válidas para todas las verticales(vuelos, hoteles, etc...)',
                     'viewUrl':'/commons-credit-cards'
                    },
					{ 'id':4,
		             'name':'Tarjetas de Crédito de Hoteles',
		             'description':'Permite definir las tarjetas de crédito válidas para todas los hoteles',
		             'viewUrl':'/hotels-credit-cards'
		            }
			];
    }});
        angularApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/commons-payment', {
                    controller:'PaymentMethodCommonsController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
                }).
                when('/hotels-payment', {
                    controller:'PaymentMethodHotelesController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
                }).
                when('/commons-credit-cards', {
                    controller:'CreditCardCommonsController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
            	}).
                when('/commons-credit-cards/new', {
                    controller:'CreditCardCommonsAddController',
                    templateUrl:'views/hoteles-admin-ui/credit-card-add.html'
                }).
                when('/hotels-credit-cards', {
                    controller:'CreditCardHotelsController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
            	});
  }]);
})();
