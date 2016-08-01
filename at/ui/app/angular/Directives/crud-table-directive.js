/* global angularApp,_,moment */
(function() {

    'use strict';

    angularApp.directive('crudTable', ['CRUDValidator', function(CRUDValidator) {  
        return {    
            restrict: 'AE',
                replace: false,
            templateUrl: '/views/hoteles-admin-ui/template/crud-table-directive-template.html',
            scope: {
                columns: '=',
                crudoperations: '=',
                order: '=',
            },
            controller: ['$scope', '$rootScope', 'DidadiConstant', '$location', function($scope, $rootScope, DidadiConstant, $location) {
                $scope.objects = [];
                $scope.addMode = false;
                $scope.activate = false;
                $scope.priorityMode = false;
                $scope.filters = {};
                $scope.object = {};
                $scope.aux = {};
                $scope.orderBy = {};
                $scope.selectedProvider = '';
                $scope.selectedBank = '';
                $scope.selectedPaymentMethod = '';
                $scope.validator = new CRUDValidator($scope.columns);
                $scope.pageSize = 10;

                moment.locale('es');

                if ($scope.crudoperations.onDelete) {
                    $scope.deleteableMode = true;
                }
                if ($scope.crudoperations.onCreate) {
                    $scope.creatableMode = true;
                }
                if ($scope.crudoperations.onListAllObjects) {
                    $scope.showActiveMode = true;
                }
                if ($scope.crudoperations.onOrderPriority) {
                    $scope.priorityMode = true;
                }

                var allOpt = {
                    'id': 'ALL',
                    'label': 'Todos'
                };

                $scope.getOptions = function(name, allOption) {
                    if (name !== undefined) {
                        var didadi = DidadiConstant[name]();
                        return allOption ? _.union([allOpt], didadi) : didadi;
                    }
                    return [];
                };

                $scope.getSelectedValue = function(object, column) {
                    var opt = '';
                    var didadi = DidadiConstant[column.type.options]();
                    var options = column.type.allOption ? _.union([allOpt], didadi) : didadi;
                    options.forEach(function(option) {
                        if (option[column.type.value] === object[column.id] &&
                            option[column.type.key] === object[column.bind]) {
                            opt = option;

                        }
                    });
                    return opt;
                };

                $scope.update = function(value, object, column) {
                    if (value !== undefined) {
                        object[column.bind] = value[column.type.key];
                        object[column.id] = value[column.type.value];
                    }
                };

                $scope.toggleAddMode = function() {

                    //Hack para saltar el compartamiento si estoy en Financiación Bulk (/commons-credit-cards)
                    if($location.path() === '/commons-credit-cards'){
                        $location.path('/commons-credit-cards/new');
                    } else {
                        $scope.addMode = !$scope.addMode;
                        $scope.object = {};
                        $scope.validator.cleanInputValues();
                    }
                };


                $scope.setOrderBy = function(field) {
                    var asc = $scope.orderBy.field === field ? !$scope.orderBy.asc : true;
                    $scope.orderBy = {
                        field: field,
                        asc: asc
                    };
                };

                $scope.objectCopied = {};

                $scope.toggleEditMode = function(object) {
                    console.log('toggleEditMode', object);
                    object.editMode = !object.editMode;
                    var index = $scope.objects.indexOf(object);
                    $scope.objectCopied[index] = _.clone(object);
                };
                $scope.resetObjectValues = function(object) {
                    var index = $scope.objects.indexOf(object);
                    object = $scope.objectCopied[index];

                    $scope.objects[index] = object;
                    object.editMode = !object.editMode;
                };




                $scope.createObject = function(addRuleDivId, lastPriority) {
                    // Al crear una instancia, debo pasarle la prioridad (para reglas de location).
                    // Le seteo la ultima prioridad +1.
                    if (lastPriority !== null) {
                        $scope.object.priority = lastPriority + 1;
                    }
                    if ($scope.validator.isObjectValid(addRuleDivId, $scope.object)) {

                        $('#addRule :input').attr('disabled', true);
                        $scope.crudoperations.onCreate(
                            $scope.object,
                            function(object, message) {
                                $scope.objects.push($scope.object);
                                $scope.object = {};
                                $scope.aux = {};
                                $scope.toggleAddMode();
                                showSuccessMessage(message);
                                $('#addRule :input').attr('disabled', false);
                            },
                            function(message) {
                                showErrorMessage(message);
                                $('#addRule :input').attr('disabled', false);
                            });
                    }
                };

                $scope.listObjects = function() {
                    $scope.objects = [];
                    $scope.crudoperations.onList(function(data, message) {
                        $scope.objects = data;
                        $scope.orderBy = {
                            field: 'active',
                            asc: true
                        };
                        console.log(message);
                        //$scope.showErrorMessage(message);
                    }, showErrorMessage);
                };

                $scope.listObjects();

                $scope.deleteObject = function(object) {
                    $scope.crudoperations.onDelete(object, function(data, message) {
                        object.active = 'false';
                        if (!$scope.activate) {
                            var index = $scope.objects.indexOf(object);
                            $scope.objects.splice(index, 1);
                        }
                        showSuccessMessage(message);
                    }, showErrorMessage);
                };
                $scope.listAllObjects = function() {
                    $scope.activate = ($scope.activate === false) ? true : false;
                    if ($scope.activate) {
                        $scope.crudoperations.onListAllObjects(function(data, message) {
                            $scope.objects = data;
                            //$scope.showSuccessMessage(message);
                            console.log(message);
                        }, showErrorMessage);
                    } else {
                        $scope.listObjects();
                    }
                };
                $scope.activateObject = function(object) {
                    $scope.crudoperations.activateObject(object, function(data, message) {
                        object.active = 'true';
                        showSuccessMessage(message);
                    }, showErrorMessage);
                };

                //CRUD
                $scope.updateObject = function(object, divId) {

                    if ($scope.validator.isObjectValid(divId, object)) {
                        var objectToUpdate = _.omit(object, 'editMode');
                        $scope.crudoperations.onUpdate(objectToUpdate,
                            function(data, message) {
                                object.editMode = !object.editMode;
                                showSuccessMessage(message);
                            },
                            function(message) {
                                showErrorMessage(message);
                                //$scope.listAllObjects();
                            });
                    }
                };

                $scope.selectResult = function(itemSelected, object, column) {
                    if (itemSelected[column.type.key] !== -1) {
                        if (itemSelected[column.type.firstValue] !== undefined) {
                            object[column.id] = itemSelected[column.type.firstValue] + ' - ' + itemSelected[column.type.value];
                        } else {
                            object[column.id] = itemSelected[column.type.value];
                        }
                        if (column.bind) {
                            object[column.bind] = itemSelected[column.type.key];
                        }
                    }

                };

                $scope.formatLabel = function(input, column) {
                    if (input && column.type.key && input[column.type.key] !== -1) {
                        if (input[column.type.firstValue] !== undefined) {
                            return input[column.type.firstValue] + ' - ' + input[column.type.value];
                        } else {
                            return input[column.type.value];
                        }
                    }
                    return '';
                };

                $scope.parseDate = function(date, object, id) {
                    object[id] = moment(new Date(date)).format('YYYY-MM-DD HH:mm');
                };

                $scope.validate = function(divId, object, input) {
                    $scope.validator.validateInputOnBlur(divId, object, $('#' + divId + ' [name=' + input + ']'));
                };
                $scope.persistPriorities = function() {
                    var elements = $scope.objects.map(function(element) {
                        var reindexedElement = {
                            ruleId: element.ruleId,
                            priority: element.priority
                        };
                        return reindexedElement;
                    });
                    $scope.$broadcast('close_alerts');
                    $scope.crudoperations.onPersistPriorities(elements,
                        function(data, message) {
                            showSuccessMessage(message);
                        },
                        function(message) {
                            showErrorMessage(message);
                            $scope.listObjects();
                        });

                };
                $scope.eventCancellation = function(event) {
                    event.preventDefault();
                };
                $scope.getLastPriority = function() {
                    var maxPriority = null;
                    $scope.objects.forEach(function(element) {
                        if (maxPriority < element.priority || maxPriority === null) {
                            maxPriority = element.priority;
                        }
                    });
                    return parseInt(maxPriority);
                };

                $scope.dragStart = function(event) {
                    if ($scope.priorityMode) {
                        $scope.draggedRule = event.srcElement.id;
                    }
                };
                $scope.dropThis = function(event) {
                    if ($scope.priorityMode) {
                        $scope.$broadcast('close_alerts');
                        $scope.$broadcast('new_alert', {
                            type: 'warning',
                            msg: 'Recordá por favor guardar los cambios'
                        });

                        var reorderingFunction = function() {
                            var srcName = $scope.draggedRule;
                            var destName = '';

                            //It has to be done like this because event path get nodeList DOM objects
                            for (var i = 0; i < event.path.length; i++) {
                                if (event.path[i].nodeName === 'TR') {
                                    destName = event.path[i].getAttribute('id');
                                }
                            }
                            //Objeto a cambiar de lugar
                            var srcId = srcName.replace('rule', '');
                            var destId = destName.replace('rule', '');

                            //Cambio de lugar los objetos y seteo la prioridad correspondiente.
                            var srcPriority = $scope.objects[srcId].priority;
                            var destPriority = $scope.objects[destId].priority;
                            var aux = $scope.objects[destId];

                            $scope.objects[destId] = $scope.objects[srcId];
                            $scope.objects[destId].priority = destPriority;
                            $scope.objects[srcId] = aux;
                            $scope.objects[srcId].priority = srcPriority;
                        };
                        $scope.$apply(reorderingFunction);
                    }
                };

                var showErrorMessage = function(message) {
                    $scope.$broadcast('close_alerts');
                    $scope.$broadcast('new_alert', {
                        type: 'danger',
                        msg: message
                    });
                };
                var showSuccessMessage = function(message) {
                    $scope.$broadcast('close_alerts');
                    $scope.$broadcast('new_alert', {
                        type: 'success',
                        msg: message
                    });
                };


                $scope.markupToPercentage = function(markup) {
                    return parseFloat(markup) * 100 + '%';
                };
            }]    
        };
    }]);

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
