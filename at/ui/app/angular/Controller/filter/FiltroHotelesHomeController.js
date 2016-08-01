/* global angularApp*/
(function(){

    'use strict';

    angularApp.controller({'FiltroHotelesHomeController': function($scope) {                        
            $scope.rules=[
                    { 'id':1,
                     'name':'Filtro por Destino',
                     'description':'Permite seleccionar un pais y filtrar sus Hoteles',
                     'viewUrl':'/filtro-por-destino'
                    },
                    { 'id':2,
                     'name':'Filtro por Hotel',
                     'description':'Permite seleccionar un hotel y filtrarlo',
                     'viewUrl':'/filtro-por-hotel'
                    }
                ];
    }});
    angularApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/filtro-por-destino', {
                    controller:'FiltroDestinoController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
                }).
                when('/filtro-por-hotel', {
                    controller:'FiltroHotelController',
                    templateUrl:'views/hoteles-admin-ui/crud-view.html'
            });
  }]);
})();
