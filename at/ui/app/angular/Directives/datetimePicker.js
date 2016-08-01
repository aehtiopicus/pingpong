/* global angularApp, moment*/
(function() {

    'use strict';


    /******************** DatePicker *******************/
    angularApp.directive('hotelesDatetimepicker', function() {
        var format = 'DD/MM/YYYY HH:mm';

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attributes, ctrl) {
                element.datetimepicker({
                    defaultDate: attributes.defaultdate,
                    format: format,
                    sideBySide: true

                });
                var picker = element.data('DateTimePicker');

                setTimeout(function() {
                    if(ctrl.$modelValue) {
                        picker.date( ctrl.$modelValue );
                    }
                });

                ctrl.$formatters.push(function(value) {
                    var date = moment(value);
                    if (date.isValid()) {
                        return date;
                    }
                    return '';
                });

                element.on('dp.change', function() {
                    scope.$apply(function() {
                        var date = picker.viewDate();
                        ctrl.$setViewValue(date);
                    });
                });

            }
        };
    });


})();
