/* global angularApp */
(function() {
    'use strict';

    var competenciaPath ='configs/Competition/Configurations.Competition.do-providers-competition';
    var prioridadPath ='configs/Competition/Configurations.Competition.providers-competition-priority';
    var configPath ='configs/';

    function createCrudService(url) {
        console.log(url);
        return function($resource, config) {
            var target = config['hoteles-admin-ui']['product-manager-url']+url;
            return $resource(target, {}, {
                list: {
                    method: 'GET',
                    url:target+'Competition'
                },
                update: {
                    method: 'PUT',
                    url:target+'/:value'
                },
                listAll:{
                    method: 'GET',
                }
            });
        };
    }
    angularApp.factory('CompetenciaService', ['$resource', 'config', createCrudService(competenciaPath)]);
    angularApp.factory('PrioridadService', ['$resource', 'config', createCrudService(prioridadPath)]);
    angularApp.factory('ConfigService', ['$resource', 'config', createCrudService(configPath)]);

})();

