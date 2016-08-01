		/* global angularApp */
(function(){

    'use strict';

	angularApp.controller({'DiscountDestinoController':
        function(Util, LomaUtils, DescuentoDestinoService, CRUDService,limitToFilter, $scope) {
          $scope.name = 'Descuento por destino';
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

			    var date = {'name':'date',
                     'format':'yyyy-MM-dd'};

    	  	$scope.columns =  [ {'name':'Destino',
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
                               'type':date
                             }];

       		  var crudService =new CRUDService(DescuentoDestinoService,'ruleId');
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
