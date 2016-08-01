/* global angularApp, Avantrip, DidadiClient  */
(function() {

    'use strict';

    //from berazategui:
    var didadiEndpoint = Avantrip.getConfig().didadiEndpoint;
    var dd = new DidadiClient(didadiEndpoint.host + ':'+didadiEndpoint.port);

    //find All:

    var cache = {};

    function fetch(c) {
        cache[c] = [];
        dd.getCollection(c, {}, function(value){ 
            cache[c] = value;
          }, 
          function(err){ console.log(err); 
        });

    }

    ['gds', 'bancos','tarjetas','medios_de_pago'].forEach(fetch);

        /*
    dd.getCollections(function(col){ 
        console.log(col); 
 
        col.forEach(fetch);

      }, 
      function(err){ console.log(err); 
    });
    */

    function get(key) {
        return cache[key] || [];
    }

    angularApp.service('DidadiConstant', function(){  
      return {
        cache: function() { return cache; },
        providers: function() { return get('gds'); },
        bancos: function() {    return get('bancos'); },
        tarjetas: function() {    return get('tarjetas'); },
        mediosDePago: function() {  return get('medios_de_pago');    },
      };
    });
})();   