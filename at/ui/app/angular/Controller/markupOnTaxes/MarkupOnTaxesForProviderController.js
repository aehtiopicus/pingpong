        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'MarkupOnTaxesForProviderController': function(Util,MarkupOnTaxesForProviderService,CRUDService, $scope) {      
           $scope.name = 'Markup a impuestos por Proveedor';
            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};
         var select = {       'name':'select',
                              'options':'providers',
                              'key':'id',
                              'value':'label'};
                              
           $scope.columns =  [ {'name':'Nombre',
                                 'id':'proveedorName',
                                'type':select,
                                'bind' : 'proveedorId'},
                               {'name':'Markup',
                                 'id':'markup',
                                 'type':'percentage',
                                 'validator': Util.getMarkUpValidator()},
                                {'name':'Fecha Desde',
                                 'id':'startDate',
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date}];

            $scope.crudOperations =new CRUDService(MarkupOnTaxesForProviderService,'ruleId');                    
            }
    });
})();



