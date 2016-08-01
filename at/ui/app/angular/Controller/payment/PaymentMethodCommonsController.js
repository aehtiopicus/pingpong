        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'PaymentMethodCommonsController': function(Util, PaymentMethodCommonsService,CRUDService,limitToFilter, HaloService, $scope) {
            $scope.name = 'ON/OFF Métodos de Pago General (En construcción)';
            $scope.description = 'En este administrador se detallan los horarios de filtrado por metodo de pago. Si no se especifica los mismos estaran disponibles';


            var selectPaymentMethod = {'name':'select',
                              'options':'mediosDePago',
                              'key':'id',
                              'value':'name'
                        };

            var date = {'name':'date',
                        'format':'yyyy-MM-dd'};

            $scope.columns =  [  {'name':'Método de pago',
                                 'id':'paymentMethodTypeName',
                                'type':selectPaymentMethod,
                                'bind' : 'paymentMethodTypeId'},
                                {'name':'Fecha Desde',
                                 'id':'startDate',
                                 'type':date},
                                {'name':'Fecha Hasta',
                                 'id':'finishDate',
                                 'type':date}  ];
            $scope.crudOperations =new CRUDService(PaymentMethodCommonsService,'ruleId');

            }
    });

})();
