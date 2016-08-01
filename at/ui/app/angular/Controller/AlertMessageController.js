/* global angularApp */
(function(){
    'use strict';

  angularApp.controller('AlertMessageController', function ($scope) {
  $scope.alerts = [];
/*types : 'danger' , 'success','warning'*/
  $scope.addAlert = function(alert) {
    // alert = { type: 'warning',
    //   msg:'Error !!!!!!!!!!!!!!!'};
    if($scope.alerts.length === 0){
      $scope.alerts.push(alert);
    }
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.$on('new_alert', function(event, alert) {
    $scope.addAlert(alert);
  });

  $scope.$on('close_alerts', function() {
    $scope.alerts = [];
  });

  $scope.$on('close_alert', function(event, index) {
    $scope.closeAlert(index);
  });

  });
})();
