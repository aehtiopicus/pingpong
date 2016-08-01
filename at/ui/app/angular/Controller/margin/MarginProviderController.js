        /* global angularApp, angular*/
(function(){

  'use strict';
  angularApp.controller({'MarginProviderController': function($scope, MarginProviderService) {
    
    $scope.name = 'Margenes Proveedores';

    $scope.columnTitles = ['Proveedor', 'Margen aplicado', 'MU tarifa', 'MU impuesto',
                          'Prevision de cambio', 'Ver proveedor', 'Activo', 'Editar'];

    $scope.marginProviders = [];

    var toPercentage = function(stringNumber){
      return parseFloat((stringNumber * 100).toFixed(2));
    };

    var formatMarginProvider = function(response){
      for(var i = 0; i < response.length; i++){
        response[i].marginApplied = toPercentage(response[i].marginApplied);
        response[i].rateMarkup = toPercentage(response[i].rateMarkup);
        response[i].taxMarkup = toPercentage(response[i].taxMarkup);
        response[i].changePrevision = toPercentage(response[i].changePrevision);

        $scope.marginProviders.push(response[i]);
      }
    };

    var callbackListError = function(){
      addAlert('danger', 'No pudieron obtenerse los margenes');
    };

    MarginProviderService.listAll().$promise.then(formatMarginProvider, callbackListError);

    $scope.editingRowNumber = -1;

    $scope.editValues = {'marginApplied': 0, 'rateMarkup': 50, 'taxMarkup': 50, 'changePrevision': 0};

    $scope.alert = null;

    $scope.activateEditMode = function(index){
      $scope.editingRowNumber = index;
      $scope.editValues = angular.copy($scope.marginProviders[index]);
    };

    $scope.cancelEdition = function(){
      $scope.editValues = angular.copy($scope.marginProviders[$scope.editingRowNumber]);
      $scope.editingRowNumber = -1;
    };

    $scope.calculeTaxMarkup = function(){
      if(!isNaN($scope.editValues.rateMarkup)){
        $scope.editValues.taxMarkup = 100 - $scope.editValues.rateMarkup;
      }
    };

    $scope.calculeRateMarkup = function(){
      if(!isNaN($scope.editValues.taxMarkup)){
        $scope.editValues.rateMarkup = 100 - $scope.editValues.taxMarkup;
      }
    };

    $scope.updateMargin = function(){
      var marginToUpdate = angular.copy($scope.editValues);

      marginToUpdate.marginApplied = (marginToUpdate.marginApplied / 100).toFixed(4).toString();
      marginToUpdate.rateMarkup = (marginToUpdate.rateMarkup / 100).toFixed(4).toString();
      marginToUpdate.taxMarkup = (marginToUpdate.taxMarkup / 100).toFixed(4).toString();
      marginToUpdate.changePrevision = (marginToUpdate.changePrevision / 100).toFixed(4).toString();

      MarginProviderService.update(marginToUpdate).$promise.then(callbackUpdateOK, callbackUpdateError);
    };

    var callbackUpdateOK = function(response){
      addAlert('success', 'Margen de ' + $scope.marginProviders[$scope.editingRowNumber].providerName + ' actualizado exitosamente');

      response.$promise.$$state.value.marginApplied = toPercentage(response.$promise.$$state.value.marginApplied);
      response.$promise.$$state.value.rateMarkup = toPercentage(response.$promise.$$state.value.rateMarkup);
      response.$promise.$$state.value.taxMarkup = toPercentage(response.$promise.$$state.value.taxMarkup);
      response.$promise.$$state.value.changePrevision = toPercentage(response.$promise.$$state.value.changePrevision);

      $scope.marginProviders[$scope.editingRowNumber] = response.$promise.$$state.value;
      //$scope.editValues = angular.copy($scope.marginProviders[$scope.editingRowNumber]);
      $scope.editingRowNumber = -1;
    };

    var callbackUpdateError = function(){
      addAlert('danger', 'El margen de ' + $scope.marginProviders[$scope.editingRowNumber].providerName + ' no se pudo actualizar');
    };

    $scope.enableDisableMargin = function(index){
      if ($scope.marginProviders[index].active === 'true'){
        MarginProviderService.delete({id: $scope.marginProviders[index].ruleId}).$promise.then(callbackDeleteOK, callbackDeleteError);
      }
      else{
        MarginProviderService.activate({id: $scope.marginProviders[index].ruleId}).$promise.then(callbackActivateOK, callbackActivateError);
      }
    };

    var callbackActivateOK = function(){
      addAlert('success', 'Margen de ' + $scope.marginProviders[$scope.editingRowNumber].providerName + ' activado exitosamente');
      $scope.marginProviders[$scope.editingRowNumber].active = 'true';
      $scope.editingRowNumber = -1;
    };

    var callbackActivateError = function(){
      addAlert('danger', 'El margen de ' + $scope.marginProviders[$scope.editingRowNumber].providerName + ' no se pudo activar');
    };

    var callbackDeleteOK = function(){
      addAlert('success', 'Margen de ' + $scope.marginProviders[$scope.editingRowNumber].providerName + ' desactivado exitosamente');
      $scope.marginProviders[$scope.editingRowNumber].active = 'false';
      $scope.editingRowNumber = -1;
    };

    var callbackDeleteError = function(){
      addAlert('danger', 'El margen de ' + $scope.marginProviders[$scope.editingRowNumber].providerName + ' no se pudo desactivar');
    };

    var addAlert = function(type, msg){
      $scope.alert = {'type': type, 'msg': msg};
    };

    $scope.closeAlert = function() {
      $scope.alert = null;
    };

  }});

  angularApp.config(['$routeProvider', function($routeProvider) {      
    $routeProvider.
    when('/margenes-proveedor', {
      controller:'MarginProviderController',
      templateUrl:'views/hoteles-admin-ui/margin-provider.html'
    });
  }]);  

})();