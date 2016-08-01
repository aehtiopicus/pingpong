/* global angularApp */
(function() {
    'use strict';

    angularApp.factory('Util',['config', function(config){
            var validateDiscount= function(value){
                  return value<=1 && value>=0;
            }; 
            var validateMarkup= function(value){
                  return value<=10 && value>=0;
            };
            var validateGCA= function(value){
                  var valorSistemaGCA = config['hoteles-admin-ui']['gca-percent'];
                  return value<=valorSistemaGCA && value>=0;
            };

            
             var Util= {
                    getDiscountValidator : function(){
                                          var validation = {'message':'Expresar como valor entre 0 y 100',
                                                            'action':validateDiscount
                                            };
                                      return validation;
                        },
                    getMarkUpValidator: function(){
                                          var validation = {'message':'Expresar como valor entre 0 y 1000',
                                                            'action':validateMarkup
                                            };
                                      return validation;

                      },
                    getInterestValidator: function(){
                                          var validation = {'message':'Expresar como valor entre 0 y 100',
                                                            'action':validateDiscount
                                            };
                                      return validation;
                    },
                    getGCAValidator: function(){
                                          var validation = {'message':'Expresar como valor entre 0 y el valor del sistema GCA',
                                                            'action':validateGCA
                                            };
                                      return validation;
                    }                   
                     
                     
            };

            return Util;
      }]);

})();   