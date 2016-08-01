/* global angularApp, _ */
(function() {

    'use strict';

    angularApp.factory('LomaSearchService', ['$resource','config',
        function($resource,config) {
            var lomaRestLocation = config['hoteles-admin-ui']['loma-url'];
            return $resource(lomaRestLocation, {}, {
                getLocations: {
                    method: 'GET',
                    isArray: false,
                    url: lomaRestLocation +'?lang=es&search=:search'
                },
                getParentsByIds: {
                    method: 'GET',
                    isArray: false,
                    url: lomaRestLocation +'?lang=es&downdegree=1&nodeIds=:nodeIds'
                },
                getParentsById: {
                    method: 'GET',
                    isArray: false,
                    url: lomaRestLocation +'?lang=es&downdegree=1&nodeIds=:nodeIds'
                }
            });
        }
    ]);

    angularApp.service('LomaUtils', [ 'LomaSearchService',
        function( LomaSearchService ) {

            function converPath(path) {
                var redableList = _.map(path, function(n) {return n.label;} );
                var el = path[0];

                return {
                    id: el.id,
                    label: redableList.join(', ')
                };
            }
            
            function createRedablePath(data) {
                return data.paths ? _.map(data.paths, converPath) : []; 
            }

            function find(criteria) {

                var p = LomaSearchService.getLocations({
                    'search' : criteria
                }).$promise; 
 
                return p.then(createRedablePath);
            }

            function getParentsById(id) {
                var p = LomaSearchService.getParentsById({
                    'nodeIds' : id
                }).$promise; 
 
                return p.then(function(data) {
                    if(data.paths && data.paths[0]) {
                        var path = data.paths[0];
                        var i = 0;
                        while(path[i].id !== id) {
                            i++;
                        }
                        path = path.slice(i);
                        var converted = converPath(path);
                        converted.locationName = path[0].label;
                        return [converted];
                    } else {
                        return [];
                    }
                });
            }


            //public api
            var api = {};

            api.findByName = function(text) { return find(text); };

            api.getParentsById = function(id) { return getParentsById(id); };

            api.createRedablePath = createRedablePath;

            return api;
        }
    ]);

})();	
