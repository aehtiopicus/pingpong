/* global angularApp */
(function() {
    'use strict';

    var discountHotelPath = 'discount_hotel';
    var discountLocationPath = 'location_discount';
    var discountProveedorPath = 'provider_discount';

    function createCrudService(url) {
        return function($resource, config) {
            var target = config['hoteles-admin-ui']['product-manager-url']+url;
            return $resource(target,{id:'@id'}, {
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
    angularApp.factory('DiscountHotelService', ['$resource', 'config', createCrudService(discountHotelPath)]);
    angularApp.factory('DescuentoDestinoService', ['$resource', 'config', createCrudService(discountLocationPath)]);	
    angularApp.factory('DiscountProveedorService', ['$resource', 'config', createCrudService(discountProveedorPath)]);
})();   
