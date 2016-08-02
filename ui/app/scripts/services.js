/*global angular, _ */
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
                        url : baseUrl + 'miembros/:id'
                    },
                    update : {
                        method : 'PUT',
                        isArray : false,
                        url : baseUrl + 'miembros/:id'
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
                    },

                    remove : {
                        method : 'DELETE',
                        url : baseUrl +"miembros/:id"
                    }


                });
                        
        }])
      .service('localStorageService',[function() {
            var _keys = {loginInfo : 'logInfo',partidos :'partidos'};
            var lsObject = {
                date : null,
                value : null
            };
            var lsRemove = function(key){
                localStorage.removeItem(key);
            };
            var lsDateChecker = function(lsObject){
                var date = new Date();
                if(date.getTime()- new Date(lsObject.date).getTime() > (15*60*1000)){
                    //invalid object
                    return false;
                }
                return true;
            };       
            this.saveInLocalStorage = function(key,data){
                lsObject.date = new Date();
                lsObject.value = data;
                localStorage.setItem(key,JSON.stringify(lsObject));
            };

            this.retrieveFromLocalStorage = function(key){
                var result = localStorage.getItem(key);
                if(!_.isNull(result)){
                    var _result = JSON.parse(result);
                    if(lsDateChecker(_result)){
                        return _result.value;
                    }else{
                        lsRemove(key);
                    }                    
                }
                return null;                
            };

            this.availableKeys = function(){
                return Object.keys(_keys);
            };

            this.retrieveKey = function(key){
                return _keys[key];
            };
            this.removeFromLocalStorage = function(key){
                lsRemove(key);
            };
           
      }])
    .factory('ControllerCommunicationFactory',['$rootScope',function($rootScope){        
        return { 
            emitMsg : function(element,args){
                $rootScope.$emit(element,args);
            },
            onMsg : function(msg,scope,func){
                var unbind = $rootScope.$on(msg,func);
                scope.$on('$destroy', unbind);
            },
            loginCompleted : 'loginCompleted',
            logoutCompleted : 'logoutCompleted',
            unsubscribe : 'unsubscribe'            

        };

    }])

    .factory('MatchInformationFactory',['$resource','baseUrl',function($resource,baseUrl){        
        return $resource(baseUrl+'matches',null,
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
                    }


                });

    }])

    .factory('FixtureInformationController',['$resource','baseUrl',function($resource,baseUrl){        
        return $resource(baseUrl+'fixture',null,
                {
                    list : {
                        method : 'GET',
                        isArray : true
                    },
                    getOne : {
                        method : 'GET',
                        isArray : false,
                        url : baseUrl + 'fixture/:id'
                    },
                    update : {
                        method : 'PUT',
                        isArray : false,
                        url : baseUrl + 'fixture/:id'
                    },
                    create : {
                        method : 'POST',
                        isArray : false                       
                    },
                    remove : {
                        method : 'DELETE',
                        isArray : false,
                        url : baseUrl + 'fixture/:id'
                    }


                });

    }])

;
