/* global angularApp, angular, moment */
(function(){

    'use strict';

    angularApp.controller({'CreditCardCommonsAddController': function($scope,DidadiConstant,CreditCardCommonsService,CRUDService,$location, UICtrl, config){

        $scope.crudOperations = new CRUDService(CreditCardCommonsService);
        $scope.object = {};
        $scope.objects = [];
        $scope.errorCuotas = [];
        $scope.gcaConfig = config['hoteles-admin-ui']['gca-percent'] * 100;
        $scope.modo = 'new';

        $scope.name = 'Agregar Promo Financiación';

        //Servicios Didadi
        var bancos = DidadiConstant.bancos();
        var tarjetas = DidadiConstant.tarjetas();

        $scope.seltarjetas = [];
        $scope.bancos = angular.copy(bancos);
        $scope.tarjetas = angular.copy(tarjetas);

        $scope.cuotas =
            [
                {
                    select: true, cuotas: 1, intereses: 0, gca: 0, isDelete: false, disabled: true, selectDisabled: true
                },
                {
                    select: false, cuotas: 3, intereses: 0, gca: 0, isDelete: false, disabled: true, selectDisabled: false
                },
                {
                    select: false, cuotas: 6, intereses: 0, gca: 0, isDelete: false, disabled: true, selectDisabled: false
                },
                {
                    select: false, cuotas: 9, intereses: 0, gca: 0, isDelete: false, disabled: true, selectDisabled: false
                },
                {
                    select: false, cuotas: 12, intereses: 0, gca: 0, isDelete: false, disabled: true, selectDisabled: false
                }
            ];


        $scope.todosTarjetas = function(val){
            $scope.seltarjetas = [];
            $scope.seltarjetas = val ? angular.copy(tarjetas): [];
        };

        $scope.todosBancos = function(val){
            $scope.selbancos = [];
            $scope.selbancos = val ? angular.copy(bancos): [];
        };

        $scope.agregar = function() {
            var sum;
            if($scope.cuotas){
                sum = $scope.cuotas[$scope.cuotas.length - 1].cuotas < 10 ? 3 : 6;
            }
            else{
                sum = 1;
            }

            var nuevo = {};
            nuevo.select = false;
            nuevo.cuotas = $scope.cuotas[$scope.cuotas.length - 1].cuotas + sum;
            nuevo.intereses = 0;
            nuevo.gca = 0;
            nuevo.isDelete = true;
            nuevo.disabled = false;
            nuevo.selectDisabled = false;
            $scope.cuotas.push(nuevo);
        };

        $scope.removeRow = function(item) {
            $scope.cuotas.splice(item, 1);
        };

        $scope.errFilter = function(item){
            var flag = false;
            $scope.errorCuotas.forEach(function(cuotas){
                if(cuotas.id === item.id){
                    flag = true;
                }
            });

            return flag;
        };

        $scope.validDate = false;

        $scope.validarFechas = function(fechaDesde, fechaHasta){
            if(fechaDesde > fechaHasta) {
                $scope.validDate = true;
                return true;
            } else {
                $scope.validDate = false;
                return false;
            }
        };

        $scope.validarFechasButton = function(){
            var flag = false;
            if($scope.modo !== 'new') {
                $scope.objects.forEach(function (obj) {
                    if (obj.startDate > obj.finishDate) {
                        flag = true;
                    }
                });
            }
            return flag;
        };

        $scope.reloadPage = function(){window.location.reload();};
        $scope.back = function(){$location.path('/commons-credit-cards');};

        $scope.guardar = function(){

            UICtrl.showLoading();
            if($scope.errorCuotas.length===0) {
                //Generar el producto cartesiano de Bancos - Tarjetas - Cuotas
                var i = 0;
                $scope.selbancos.forEach(function (bancoValue) {

                    $scope.seltarjetas.forEach(function (tarjetaValue) {

                        $scope.cuotas.forEach(function (cuotaValue) {

                            if (cuotaValue.select === true) {

                                $scope.object.id = i++;
                                $scope.object.bankId = bancoValue.id;
                                $scope.object.bankName = bancoValue.name;
                                $scope.object.creditCardId = tarjetaValue.id;
                                $scope.object.creditCardName = tarjetaValue.name;
                                $scope.object.installmentCount = cuotaValue.cuotas;
                                $scope.object.finishDate = moment($scope.fechaHasta).format('YYYY-MM-DD HH:mm');
                                $scope.object.gcaPercent = cuotaValue.gca / 100;
                                $scope.object.interest = cuotaValue.intereses / 100;
                                $scope.object.startDate = moment($scope.fechaDesde).format('YYYY-MM-DD HH:mm');

                                $scope.objects.push($scope.object);
                                $scope.object = {};

                            }
                        });
                    });
                });
            }else{ //Entro por aca cuando reenvio los errores corregidos
                $scope.errorCuotas.forEach(function(err){
                    $scope.objects[err.id].startDate = moment($scope.objects[err.id].startDate).format('YYYY-MM-DD HH:mm');
                    $scope.objects[err.id].finishDate = moment($scope.objects[err.id].finishDate).format('YYYY-MM-DD HH:mm');
                });
            }

            //Enviar al servicio Custom
            $scope.crudOperations.onCreateCustom(
                $scope.objects,
                function(object, message) {
                    $scope.objects = [];
                    $scope.errorCuotas = [];
                    console.log('Exito:', message);
                    $scope.modo = 'ok';
                    UICtrl.hideLoading();
                    $scope.back();
                },
                function(rows) {
                    if(rows.length>=1){
                        $scope.errorCuotas = rows;
                    }
                    console.log('Error:',$scope.errorCuotas.length);
                    $scope.modo = 'error';
                    UICtrl.hideLoading();
            });

        };
    }
    });


    /******************** DatePicker *******************/
    angularApp.directive('tarjetasDatetimepicker', function() {
        var format = 'YYYY-MM-DD HH:mm';

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attributes, ctrl) {
                element.datetimepicker({
                    format: format,
                    sideBySide: true

                });
                var picker = element.data('DateTimePicker');

                ctrl.$formatters.push(function(value) {
                    var aux = value.match(/^(\d+)\/(\d+)\/(\d+) (\d+)\:(\d+)$/);
                    var date = moment(new Date(aux[3], aux[2] - 1, aux[1], aux[4], aux[5], '00'));
                    if (date.isValid()) {
                        return date.format(format);
                    }
                    return '';
                });

                element.on('dp.change', function() {
                    scope.$apply(function() {
                        var date = picker.viewDate();
                        ctrl.$setViewValue(date.valueOf());
                    });
                });
            }
        };
    });

})();
