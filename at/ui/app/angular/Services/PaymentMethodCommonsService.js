/* global angularApp */
(function() {
    'use strict';

    var paymentMethodTypeCommonsPath ='payment_method_type_commons';
    var paymentMethodTypePath = 'payment_method_type';
    var creditCardCommonsPath ='credit_card_commons';
    var creditCardCommonsOnHotelPath ='credit_card_commons_on_hotel';

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
    angularApp.factory('PaymentMethodCommonsService', ['$resource', 'config', createCrudService(paymentMethodTypeCommonsPath)]);
    angularApp.factory('PaymentMethodHotelesService', ['$resource', 'config', createCrudService(paymentMethodTypePath)]);
    angularApp.factory('CreditCardCommonsService', ['$resource', 'config', createCrudService(creditCardCommonsPath)]);
    angularApp.factory('CreditCardHotelsService', ['$resource', 'config', createCrudService(creditCardCommonsOnHotelPath)]);
})();   
