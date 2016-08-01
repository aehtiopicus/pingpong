        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'DiscountHotelController': function(Util, DiscountHotelService, CRUDService, limitToFilter, HaloService,$scope) { 
            $scope.name = 'Descuento por hotel';
            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};


            var getInput=function(input){
              return HaloService.getHotelList({
               'limit' : 10,
               'offset' : 0,
               'name' : input,
               'completenessFrom' : 0,
               'completenessTo' : 100
              }).$promise.then(function(data){
                console.log('Segunda data', data);
                if (data.length === 0) {
                  var noResults = {'code' : -1, 'hotelName' : 'No hay hoteles'};
                  data.push(noResults);  
                }

                return limitToFilter(data, 10);
              });
            };           


            var autocomplete = {'name':'autocompleteHotel',
                              'getInput':getInput,
                              'key':'code',
                              'value':'hotelName',
                              'firstValue':'code'};

            var select = { 
                          'name':'select',
                          'options':'providers',
                          'key':'id',
                          'value':'label'};

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
                                {'name':'Discount',
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
                              
            

              $scope.crudOperations =new CRUDService(DiscountHotelService,'ruleId');  
            }
    });

})();
         
