        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'MarkupLocationController': function(Util, MarkupLocationService,CRUDService,LomaUtils,limitToFilter, $scope) {
            $scope.name = 'Markup por Destino';
            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};

            var locations = function(input){

            var loc = LomaUtils.findByName(input).then( function(data) {
              if (data.length === 0) {
                var noResults = {'id': -1,  'label' : 'No hay ciudades'};
                data.push(noResults);
              }
                 return limitToFilter(data, 10);
             });
               return loc;
            };

          var select = {'name':'select',
                        'options':'providers',
                        'key':'id',
                        'value':'label',
                        'allOption': true};

          var autocomplete = {'name':'autocomplete',
                              'getInput':locations,
                              'key':'id',
                              'value':'label'};

            $scope.columns =  [{'name':'Destino',
                               'id':'locationName',
                               'type' : autocomplete,
                               'bind' : 'locationId',
                               'editMode' : 'readOnly'
                               },
                               {'name':'Proveedor',
                                'id':'providerName',
                               'type':select,
                               'bind' : 'providerId'
                                },
                                {'name':'Markup',
                                 'id':'markup',
                                 'type':'percentage',
                                 'validator': Util.getMarkUpValidator()
                                },
                                {'name':'Fecha Desde',
                                 'id':'startDate',
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date},
                             ];

            var crudService =new CRUDService(MarkupLocationService,'ruleId');
            crudService.onOrderPriority=function(onSuccess, onError){
            this.service.onOrderPriority(function(){
                  onSuccess('','ok');
              },function(){
                  onError('error');
              });
            };

            $scope.crudOperations=crudService;
            }
    });

})();
