         /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'CreditCardHotelsController': function(Util, CreditCardHotelsService,CRUDService,limitToFilter, HaloService, $scope) {
            $scope.name = 'ON/OFF de TC, Bancos y Cuotas General (En construcción)';

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

           var selectBank =  {'name':'select',
                              'options':'bancos',
                              'key':'id',
                              'value':'name'
                        };

            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};

           var selectCreditCard = {'name':'select',
                              'options':'tarjetas',
                              'key':'id',
                              'value':'name'
                        };

            $scope.columns =  [ {'name':'Hotel',
                                  'id':'hotelName',
                                  'type' : autocomplete,
                                  'bind' : 'hotelId',
                                  'editMode' : 'readOnly'
                                },
                                {'name':'Nombre del banco',
                                 'id':'bankName',
                                'type':selectBank,
                                'bind' : 'bankId'},
                                {'name':'Nombre de la tarjeta de crédito',
                                 'id':'creditCardName',
                                'type':selectCreditCard,
                                'bind' : 'creditCardId'},
                                {'name':'Cantidad de cuotas',
                                 'id':'installmentCount',
                                },
                                {'name':'Intereses',
                                 'id':'interest',
                                 'type':'percentage',
                                 'validator': Util.getInterestValidator()
                                },
                                {'name':'Fecha Desde',
                                 'id':'startDate',
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date}
                                ];
                $scope.crudOperations =new CRUDService(CreditCardHotelsService,'ruleId');

            }
    });

})();
