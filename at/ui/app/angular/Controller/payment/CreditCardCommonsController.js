/* global angularApp*/
(function(){

    'use strict';

   angularApp.controller({'CreditCardCommonsController': function(Util, CreditCardCommonsService,CRUDService,limitToFilter,
        HaloService,$scope) {
            $scope.name = 'ON/OFF de TC, Bancos y Cuotas en Hoteles';

            var selectBank =  {'name':'select',
                              'options':'bancos',
                              'key':'id',
                              'value':'name'
                        };


           var selectCreditCard = {'name':'select',
                              'options':'tarjetas',
                              'key':'id',
                              'value':'name'
                        };

            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};

            $scope.columns =  [ {'name':'Nombre del banco',
                                 'id':'bankName',
                                'type':selectBank,
                                'bind' : 'bankId',
                                'editMode' : 'readOnly',
                              },
                                {'name':'Nombre de la tarjeta de crédito',
                                 'id':'creditCardName',
                                'type':selectCreditCard,
                                'bind' : 'creditCardId',
                                'editMode' : 'readOnly',
                              },
                                {'name':'Cantidad de cuotas',
                                 'id':'installmentCount',
                                },
                                {'name':'Intereses',
                                 'id':'interest',
                                 'type':'percentage',
                                 'validator': Util.getInterestValidator()
                                },
                                {'name':'% valor a cobrar de GCA',
                                 'id':'gcaPercent',
                                 'type':'percentage',
                                 'validator': Util.getGCAValidator()
                                },
                                {'name':'Fecha Desde',
                                 'id':'startDate',
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date}
                                ];
            $scope.crudOperations =new CRUDService(CreditCardCommonsService,'ruleId');
            }
    });

})();
