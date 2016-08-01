		/* global angularApp */
(function(){

    'use strict';

	angularApp.controller({'FiltroDestinoController': 
        function(LomaUtils, FiltroDestinoService, limitToFilter,CRUDService, $scope) {			
          
          $scope.name = 'Filtro por Destino';
          
          var locations = function(input){ 
          var loc = LomaUtils.findByName(input).then( function(data) {
                      if(data.length === 0) {
                          var noResults = {'id': -1,  'label' : 'No hay ciudades'};
                          data.push(noResults);  
                      }
                      return limitToFilter(data, 10);
                    });
            return loc;
          };

          var autocomplete = {'name':'autocomplete',
                              'getInput':locations,
                              'key':'id',
                              'value':'label'};

			    var date = {'name':'date',
                      'format':'yyyy-MM-dd'};

    	  	$scope.columns =  [ {'name':'Destino',
                                 'id':'locationFiltradaName',
                                 'type' : autocomplete,
                                 'bind' : 'locationFiltradaId',
                                 'editMode' : 'readOnly'
                                },
                                {'name':'Fecha Desde',
                                 'id':'startDate', 
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date}
                             ];

           var crudService =new CRUDService(FiltroDestinoService,'ruleId');
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
            