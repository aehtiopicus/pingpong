/* global angularApp,moment*/
(function() {

    'use strict';

    angularApp.controller({
        'ReporteMargenDestinoController': function($scope, config) {
            $scope.name = 'Reporte de Magenes por Destinos';
            var today = moment();
            $scope.obj = {
                fechaDesde: today
            };
            $scope.makeUrl = function() {
                var path = config['hoteles-admin-ui']['product-manager-url'] + 'reportes/margen_destino?date=' + $scope.obj.fechaDesde.format();
                return path;
            };
        }
    });

})();
