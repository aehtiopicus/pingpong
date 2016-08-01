        /* global angularApp, angular */
(function(){

  'use strict';
  angularApp.controller({'MarginsLocationController': function($scope, $route, MarginProviderService, MarginLocationService) {
    
    var locationId = $route.current.params.locationId;
    
    $scope.tableTitle = 'Margenes';
    $scope.columnTitles = ['Proveedores', 'Margen de Proveedor', 'Margen aplicado', 'MU Tarifa', 'MU Imp.', 'Previsión de Cambio', 'Editar'];
    $scope.locationName = '';
    $scope.notApply = 'N/A';
    $scope.offProvider = 'Off';
    $scope.editing = -1;
    $scope.alert = null;

    $scope.marginProviders = [];
    $scope.marginsLocation = [];
    $scope.editingMarginsLocation = [];

    $scope.requiredError = 'Este campo es requerido';
    $scope.marginRangeError = 'El valor de Margen Aplicado deberá ser entre 0% y 100%.';
    $scope.changePrevisionRangeError = 'El valor de Previsión de cambio deberá ser mayor a 0%.';
    $scope.rateMarkupRangeError = 'El valor de % MU Tarifa deberá ser entre 0% y 100%.';
    $scope.taxMarkupRangeError = 'El valor de % MU Impuestos deberá ser entre 0% y 100%.';
    $scope.markupSumError = 'La suma de % MU Tarifa y % MU Impuestos deberá ser 100%.';
    $scope.sumError = false;

    var marginProvidersCallback = function(response) {
      for (var i = 0; i < response.length; i++) {
        var marginProvider = response[i];
        marginProvider.marginApplied = toPercentage(marginProvider.marginApplied);
        marginProvider.active = marginProvider.active === 'true';
        $scope.marginProviders.push(marginProvider);
      }

      // Una vez que tengo los proveedores, busco los margenes para esta location
      MarginLocationService.getByLocation({id: locationId}).$promise.then(marginsLocationCallback, marginsLocationErrorCallback);
    };

    var marginProvidersErrorCallback = function() {
      createAlert('danger', 'No se pudo obtener los márgenes de proveedor');
    };

    // Obtener los providers
    MarginProviderService.listAll().$promise.then(marginProvidersCallback, marginProvidersErrorCallback);

    var marginsLocationCallback = function(response) {
      $scope.marginsLocation = new Array($scope.marginProviders.length);

      if(response.length > 0) {
        $scope.locationName = response[0].locationName;
        $scope.columnTitles[2] = $scope.columnTitles[2] + ' "' + $scope.locationName + '"';
      }

      for(var i = 0; i < response.length; i++) {
        var marginLocation = response[i];
        marginLocation.marginApplied = toPercentage(marginLocation.marginApplied);
        marginLocation.rateMarkup = toPercentage(marginLocation.rateMarkup);
        marginLocation.taxMarkup = toPercentage(marginLocation.taxMarkup);
        marginLocation.changePrevision = toPercentage(marginLocation.changePrevision);

        for(var j = 0; j < $scope.marginProviders.length; j++) {
          if(marginLocation.providerId === $scope.marginProviders[j].providerId) {
            $scope.marginsLocation[j] = marginLocation;
            break;
          }
        }
      }

      $scope.editingMarginsLocation = angular.copy($scope.marginsLocation);
    };

    var marginsLocationErrorCallback = function() {
      createAlert('danger', 'No se pudo obtener los márgenes de destino');
    };

    $scope.enableEdition = function(index) {
      $scope.sumError = false;
      $scope.editing = index;
    };

    $scope.cancelEdition = function() {
      $scope.editingMarginsLocation[$scope.editing] = angular.copy($scope.marginsLocation[$scope.editing]);
      $scope.editing = -1;
    };

    $scope.updateMarginsLocation = function() {
      $scope.alert = null;

      var toUpdate = angular.copy($scope.editingMarginsLocation[$scope.editing]);
      toUpdate.marginApplied = fromPercentage(toUpdate.marginApplied);
      toUpdate.rateMarkup = fromPercentage(toUpdate.rateMarkup);
      toUpdate.taxMarkup = fromPercentage(toUpdate.taxMarkup);
      toUpdate.changePrevision = fromPercentage(toUpdate.changePrevision);

      MarginLocationService.update(toUpdate).$promise.then(callbackUpdatedOK, callbackUpdatedBad);
    };

    var callbackUpdatedOK = function(marginLocation) {
      marginLocation.marginApplied = toPercentage(marginLocation.marginApplied);
      marginLocation.rateMarkup = toPercentage(marginLocation.rateMarkup);
      marginLocation.taxMarkup = toPercentage(marginLocation.taxMarkup);
      marginLocation.changePrevision = toPercentage(marginLocation.changePrevision);

      $scope.marginsLocation[$scope.editing] = marginLocation;
      $scope.updateMarginsLocation[$scope.editing] = marginLocation;

      createAlert('success', 'Margen de ' + marginLocation.providerName + ' actualizado exitosamente');
      $scope.editing = -1;
    };

    var callbackUpdatedBad = function() {
      $scope.editingMarginsLocation[$scope.editing] = $scope.marginsLocation[$scope.editing];
      createAlert('danger', 'El margen de ' + $scope.editingMarginsLocation[$scope.editing].providerName + ' no se pudo actualizar');
      $scope.editing = -1;
    };

    var toPercentage = function(stringNumber){
      return parseFloat((stringNumber * 100).toFixed(2));
    };

    var fromPercentage = function(stringPercentage) {
      return parseFloat((stringPercentage / 100).toFixed(4));
    };

    var createAlert = function(type, msg){
      $scope.alert = {'type': type, 'msg': msg};
    };

    $scope.closeAlert = function() {
      $scope.alert = null;
    };

    $scope.isEditing = function() {
      return $scope.editing > -1;
    };

    $scope.isEditingRow = function(index) {
      return $scope.editing === index;
    };

    $scope.calculateRateMarkup = function() {
      var taxMarkup = $scope.editingMarginsLocation[$scope.editing].taxMarkup;
      if(!isNaN(taxMarkup)){
        $scope.editingMarginsLocation[$scope.editing].rateMarkup = parseFloat((100 - taxMarkup).toFixed(2));
      }
    };

    $scope.calculateTaxMarkup = function() {
      var rateMarkup = $scope.editingMarginsLocation[$scope.editing].rateMarkup;
      if(!isNaN(rateMarkup)){
        $scope.editingMarginsLocation[$scope.editing].taxMarkup = parseFloat((100 - rateMarkup).toFixed(2));
      }
    };
  }});

  angularApp.config(['$routeProvider', function($routeProvider) {      
    $routeProvider.
    when('/margen-destino/:locationId', {
      controller:'MarginsLocationController',
      templateUrl:'views/hoteles-admin-ui/margins-location.html'
    });
  }]);  

})();