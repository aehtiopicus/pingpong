		/* global angularApp */
(function(){

    'use strict';

	angularApp.controller({'HotelesDestacadosController': 
        function(HotelesDestacadosService, HaloService, CRUDService,$scope) {			

            var getInput=function(input){
                  return  HaloService.getHotelList({
                     'limit' : 10,
                     'offset' : 0,
                     'name' : input,
                     'completenessFrom' : 0,
                     'completenessTo' : 100
                  }).$promise.then(function(data){

                    if (data.length === 0) {
                      var noResults = {'code':-1, 'hotelName' : 'No hay hoteles'};
                      data.push(noResults);  
                    }

                    return data;
                  });
            };

            var autocomplete = {'name':'autocompleteHotel',
                              'getInput':getInput,
                              'key':'code',
                              'value':'hotelName',
                              'firstValue':'code'};

			      var date = {'name':'date',
                        'format':'yyyy-MM-dd'};	

    	  	$scope.columns =  [ {'name':'Hotel',
                                  'id':'hotelName',
                                  'type' : autocomplete, 
                                  'bind' : 'hotelId',
                                  'editMode' : 'readOnly'
                                },           
                                {'name':'Fecha Desde',
                                 'id':'startDate',
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date}];

         $scope.crudOperations =new CRUDService(HotelesDestacadosService,'ruleId');          
        }
	});

})();
            
