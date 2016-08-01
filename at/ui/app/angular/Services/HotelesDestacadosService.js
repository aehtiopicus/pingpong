/* global angularApp */
(function() {

    'use strict';

 	var hotelesDestacadosUrl = 'hoteles_destacados';

 	
    angularApp.factory('HotelesDestacadosService', ['$resource', 'config',
        function($resource,config) {
            var target = config['hoteles-admin-ui']['product-manager-url']+hotelesDestacadosUrl;
            return $resource(target, {id:'@id'}, {
                list: {
                    method: 'GET',
                    isArray: true,                                      
                },
                delete: {
                    method: 'DELETE',
                    url: target + '/:id'
                },
                update: {
                    method: 'PUT',
                    isArray: false,
                    url: target + ':hotelDestacadoDTO'
                },
                create: {
                    method: 'POST',
                    isArray: false,
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
                }        

            });
        }
    ]);

})();	

