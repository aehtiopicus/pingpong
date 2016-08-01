        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'DiscountProveedorController': function(Util, DiscountProveedorService, CRUDService, $scope) { 
            $scope.name = 'Descuento por Proveedor';
            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};

           var select = {     'name':'select',
                              'options':'providers',
                              'key':'id',
                              'value':'label'};

                              
           $scope.columns =  [ {'name':'Nombre',
                                 'id':'proveedorName',
                                'type':select,
                                'bind' : 'proveedorId'},
                                
                                {'name':'Descuento',
                                 'id':'discount',
                                 'type':'percentage',
                                  'validator': Util.getDiscountValidator()
                                },
                                {'name':'Fecha Desde',
                                 'id':'startDate',
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date}];
                                 
        $scope.crudOperations =new CRUDService(DiscountProveedorService,'ruleId');                                   
        }
    });

})();
         
