        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'MarkupOnTaxesForHotelController': function(Util, MarkupOnTaxesForHotelService,CRUDService,limitToFilter, HaloService, $scope) { 
            $scope.name = 'Markup a impuestos por hotel';
            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};
                       

           var getInput = function(input){
              return HaloService.getHotelList({
               'limit' : 10,
               'offset' : 0,
               'name' : input,
               'completenessFrom' : 0,
               'completenessTo' : 100
              }).$promise.then(function(data){

                if (data.length === 0) {
                  var noResults = {'code' : -1, 'hotelName' : 'No hay hoteles'};
                  data.push(noResults);  
                }

                return limitToFilter(data, 10);
              });
            };  
         


           var select = { 
                          'name':'select',
                          'options':'providers',
                          'key':'id',
                          'value':'label'};

            var autocomplete = {'name':'autocompleteHotel',
                              'getInput':getInput,
                              'key':'code',
                              'value':'hotelName',
                              'firstValue':'code'};

            $scope.columns =  [ {'name':'Nombre',
                                 'id':'hotelName',
                                 'type':autocomplete,
                                 'bind' : 'hotelId',
                                 'editMode' : 'readOnly'
                                },
                                {'name':'Proveedor',
                                 'id':'providerName',
                                'type':select,
                                'bind' : 'providerId'},
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
                                 'type':date}];
                  $scope.crudOperations =new CRUDService(MarkupOnTaxesForHotelService,'ruleId');                       
         
            }
    });

})();
         
