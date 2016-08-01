/* global angularApp */
(function() {
    'use strict';

    var markupLocationPath ='markup_location';
    var markupHotelPath = 'markup_hotel';
    var markupDefaultPath ='markup_default';
    var markupProveedorPath ='markup_proveedor';
    var markupOnTaxesForProviderPath ='markup_on_taxes_provider';
    var markupOnTaxesForHotelPath ='markup_on_taxes_hotel';
    var markupOnTaxesForLocationPath ='markup_on_taxes_location';
    var markupOnTaxesDefaultPath ='markup_on_taxes_default';

    function createCrudService(url) {
        console.log(url);
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
    angularApp.factory('MarkupHotelService', ['$resource', 'config', createCrudService(markupHotelPath)]);
    angularApp.factory('MarkupDefaultService', ['$resource', 'config', createCrudService(markupDefaultPath)]);
    angularApp.factory('MarkupLocationService', ['$resource', 'config', createCrudService(markupLocationPath)]);
    angularApp.factory('MarkupProveedorService', ['$resource', 'config', createCrudService(markupProveedorPath)]);
    angularApp.factory('MarkupOnTaxesForProviderService', ['$resource', 'config', createCrudService(markupOnTaxesForProviderPath)]);
    angularApp.factory('MarkupOnTaxesForHotelService', ['$resource', 'config', createCrudService(markupOnTaxesForHotelPath)]);
    angularApp.factory('MarkupOnTaxesForLocationService', ['$resource', 'config', createCrudService(markupOnTaxesForLocationPath)]);
    angularApp.factory('MarkupOnTaxesDefaultService', ['$resource', 'config', createCrudService(markupOnTaxesDefaultPath)]);
})();   
