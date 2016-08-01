/* global angularApp */
(function() {
    'use strict';

    angularApp.factory('CRUDService', [function(){

        var  CrudService = function(service,objectId) {
            this.service = service;
            this.objectId=objectId;
        };

        CrudService.prototype.onUpdate= function(object, onSuccess, onError){
            this.service.update(object,function(data){
               if(data.notification!==undefined && data.notification.indexOf('Error')!==-1){
                     onError(data.notification);
               }else{
                     onSuccess(object,'Regla actualizada correctamente.');  
               }
            },
            function(){
                onError('Error al actualizar la regla.');
            });                      
        };
        CrudService.prototype.onCreate= function(object, onSuccess, onError){
            this.service.create(object).$promise.then(function(data){
                if(data.notification!==undefined && data.notification.indexOf('Error')!==-1){
                     onError(data.notification);
               }else{
                    onSuccess(object,'Regla creada correctamente.');
               }
            },function(){
                onError('Error al crear la regla.');
            });
        };

        /*Financiación Custom*/
        CrudService.prototype.onCreateCustom= function(object, onSuccess, onError){
            this.service.create(object).$promise.then(function(data){
                if(data.status!==undefined && data.status.indexOf('ERROR')!==-1){
                    onError(data.rows);
                }else{
                    onSuccess(object,'Regla creada correctamente.');
                }
            },function(){
                onError('Error al crear la regla.');
            });
        };

        CrudService.prototype.onList=function(onSuccess, onError){
            this.service.list({}).$promise.then(function(data){
                onSuccess(data,'Reglas cargadas correctamente');            
            }, function(){
                onError('Error al cargar las reglas.');
            });
        };
        CrudService.prototype.onDelete=function(object, onSuccess, onError){
            var data = {
                id: object[this.objectId]
            };
            this.service.delete(data,
            function(){
                onSuccess({},'Regla borrada correctamente.');   
            },function(){
                onError('Error al eliminar la regla.');
            });
        };
        CrudService.prototype.onListAllObjects=function(onSuccess, onError){
            this.service.listAll({}).$promise.then(function(data){
                onSuccess(data,'Reglas cargadas correctamente.');            
            }, function(){
                onError('Error al cargar las reglas.');
            });
        };
        CrudService.prototype.onPersistPriorities= function(object, onSuccess, onError){
            this.service.persistPriorities(object,function(){
                onSuccess(object,'Prioridad actualizada correctamente.');         
            },
            function(){
                onError('Error al actualizar prioridad.');
            });                      
        };
        CrudService.prototype.activateObject=function(object, onSucces, onError){
            var data = {
                id: object[this.objectId]
            };
            this.service.activate(data,
                function(data){
                if(data.notification!==undefined && data.notification.indexOf('Error')!==-1){
                         onError(data.notification);
                   }else{
                         onSucces({},'Regla activada correctamente.');  
                   }
                },function(){
                    onError('Error al activar la regla.');
                });
            };
            return  CrudService;    
         }]);
})();   