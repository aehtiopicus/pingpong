        /* global angularApp */
(function(){

    'use strict';

    angularApp.controller({'PaymentMethodHotelesController': function(Util, PaymentMethodHotelesService,CRUDService,limitToFilter, HaloService, $scope) {
            $scope.name = 'ON/OFF Métodos de Pago de Hoteles (En construcción)';

              var selectPaymentMethod = {'name':'select',
                              'options':'mediosDePago',
                              'key':'id',
                              'value':'name'
                        };

            $scope.columns =  [ {'name':'Método de pago',
                                 'id':'paymentMethodTypeName',
                                'type':selectPaymentMethod,
                                'bind' : 'paymentMethodTypeId'}];
                  $scope.crudOperations =new CRUDService(PaymentMethodHotelesService,'ruleId');

            }
    });

})();
