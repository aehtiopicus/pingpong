/* global angularApp */
(function() {

    'use strict';

    angularApp.factory('HaloService', ['$resource','config',
        function($resource,config) {
            var haloRestLocation = config['hoteles-admin-ui']['halo-url'];
            console.log('url: ' + haloRestLocation + '/hotels/finder');
            return $resource(haloRestLocation, {}, {
                getHotelList: {
                    method: 'GET',
                    isArray: true,
                    url: haloRestLocation +'/hotels/finder',
                    transformResponse: function (data) {
                        var results = [];
                        JSON.parse(data).data.forEach(function(element){
                             console.log('Ingreso en el for', element);
                             var providers = '';
                             if('@EXP' in element.providers){
                                providers = providers + 'Expedia '; 
                             }
                             if('@HDO' in element.providers){
                                providers = providers + 'HotelDo '; 
                             }
                             if('@HBED' in element.providers){
                                providers = providers + 'HotelBeds '; 
                             }
                             console.log('element', element.providers);
                             console.log('code', element.code);
                             console.log('hotelName', element.hotelName._es);
                             var result = {'code' : element.code, 'hotelName' : element.hotelName._es + ' - ' + providers + ' - ' + element.location.locationmanager.lmpath.label};
                             results.push(result); 
                        });
                        return results;
                    },
                }  
            });
        }
    ]);

})();	

