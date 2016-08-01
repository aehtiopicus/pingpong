'use strict';

angular.module('pingpongapp')
        .constant('baseUrl','http://localhost:3000/')
        .service('menuFactory',['$resource','baseUrl', function($resource, baseUrl) {
    
            
      
                this.getDishes = function(){
                    return $resource(baseUrl+'dishes/:id',null,{'update':{method:'PUT'}});                    
                    
                };
    
                this.getPromotion = function(){
                	return $resource(baseUrl+'promotions/:id',null,{'update':{method:'PUT'}});                
                };
    
                        
        }])

        .factory('corporateFactory', ['$resource','baseUrl',function($resource,baseUrl) {
      
            var corpfac = {};

            corpfac.getLeader = function (){
            	return $resource(baseUrl+'leadership/:id',null,{'update':{method:'PUT'}}); 
            };


            return corpfac;
     
            // Implement two functions, one named getLeaders,
            // the other named getLeader(index)
            // Remember this is a factory not a service
    
    
        }])

        .factory('feedbackFactory', ['$resource','baseUrl',function($resource,baseUrl){
            return {
              getFeedback : function(){
                return $resource(baseUrl+'feedback');
              }
            };
        }])

        .factory('miembroFactory', ['$resource','baseUrl',function($resource,baseUrl){
          
            return $resource(baseUrl+'miembros',null,
                {
                    list : {
                        method : 'GET',
                        isArray : true
                    },
                    getOne : {
                        method : 'GET',
                        isArray : false,
                        url : baseUrl + '/:id'
                    },
                    update : {
                        method : 'PUT',
                        isArray : false,
                        url : baseUrl + '/:id'
                    },
                    create : {
                        method : 'POST',
                        isArray : false
                        /*interceptor: {
                            response: function(response) {      
                                var result = response.resource;        
                                result.$status = response.status;
                                return result;
                            },
                            responseError :function(response) {      
                                var result = response;        
                                result.$status = response.status;
                                return result;
                            }
                        }*/
                    }


                });
                        
        }])

;
