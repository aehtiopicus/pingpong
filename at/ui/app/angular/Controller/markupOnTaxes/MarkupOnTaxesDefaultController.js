        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'MarkupOnTaxesDefaultController': function(Util, MarkupOnTaxesDefaultService, $scope) {      
        $scope.name = 'Markup a impuestos por Default';
           $scope.columns =  [  {'name':'Markup',
                                 'id':'markup',
                                 'validator': Util.getMarkUpValidator()}
                                ];
            $scope.crudOperations = {
                    onUpdate: function(object, onSucces, onError){
                        MarkupOnTaxesDefaultService.update(object,function(){
                            onSucces(object,'ok');         
                        },
                        function(){
                            onError('error');
                        });                      
                    },
                    onList:function(onSucces, onError){
                        MarkupOnTaxesDefaultService.list({}).$promise.then(function(data){
                            onSucces(data,'ok'); 
                        }, function(){
                            onError('error');
                        });
                    },
                };
            }
    });

})();