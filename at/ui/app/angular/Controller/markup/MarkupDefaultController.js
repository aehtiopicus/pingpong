        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'MarkupDefaultController': function(Util, MarkupDefaultService, $scope) {      
   $scope.name = 'Markup por default';
            $scope.columns =  [ {'name':'Markup',
                                 'id':'markup',
                                 'validator': Util.getMarkUpValidator()
                             }];

            $scope.crudOperations = {
                    onUpdate: function(object, onSucces, onError){
                        MarkupDefaultService.update(object,function(){
                            onSucces(object,'ok');         
                        },
                        function(){
                            onError('error');
                        });                      
                    },
                    onList:function(onSucces, onError){
                        MarkupDefaultService.list({}).$promise.then(function(data){
                            onSucces(data,'ok'); 
                        }, function(){
                            onError('error');
                        });
                    },
                };
            }
    });

})();