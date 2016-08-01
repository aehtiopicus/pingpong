/* global angularApp */
(function() {
    'use strict';

    var locationVedada = 'locations_vedadas';
    var hotelFiltrado ='hoteles_filtrados';
    
    function createCrudService(url) {
        return function($resource, config) {
            var target = config['hoteles-admin-ui']['product-manager-url']+url;
            return $resource(target, {id:'@id'}, {
                list: {
                    method: 'GET',
                    isArray: true,
                },
                update: {
                    method: 'PUT',
                    isArray: false,
                },
                create: {
                    method: 'POST',
                    isArray: false,
                },
                delete: {
                    method: 'DELETE',
                    isArray: false,
                    url: target + '/:id',
                },
                listAll:{
                    method: 'GET',
                    isArray:true,
                    url:target+'/all',
                },
                activate:{
                    method: 'PUT',
                    isArray: false,
                    url: target + '/activate/:id',
                },
                persistPriorities:{
                    method: 'PUT',
                    isArray: true,
                    url: target + '/priority',
                }    
            });

        };

    }
 	angularApp.factory('FiltroDestinoService', ['$resource', 'config', createCrudService(locationVedada)]);
    angularApp.factory('FiltroHotelService', ['$resource', 'config', createCrudService(hotelFiltrado)]);

})();	

