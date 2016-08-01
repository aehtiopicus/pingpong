/* global angularApp */
(function(){

    'use strict';

angularApp.directive('percentage', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {

            function fromUser(value) {
                return parseFloat(value)/100+'';
            }

            function toUser(value) {
                return parseFloat(value)*100+'';
            }

            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
        }
    };
});

})();

