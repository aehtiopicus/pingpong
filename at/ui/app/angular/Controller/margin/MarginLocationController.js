        /* global angularApp, angular */
(function(){

  'use strict';
  angularApp.controller({'MarginLocationController': function($scope, $route, MarginProviderService, MarginLocationService, LomaUtils) {
    
    $scope.providerTitle = 'Margenes';
    $scope.locationTitle = 'Margenes Destinos';

    var providerId = $route.current.params.providerId;
    var marginLocations = [];

    $scope.providerColumnTitles = ['Proveedor', 'Margen aplicado', 'MU tarifa', 'MU impuesto', 'Prevision de cambio', 'Editar'];
    $scope.locationColumnTitles = ['Destino', 'Código LOMA', 'Margen aplicado', 'MU tarifa', 'MU impuesto', 'Prevision de cambio', 'Ver destino', 'Editar'];

    $scope.marginProvider = {};
    $scope.marginLocations = [];

    var toPercentage = function(stringNumber){
      return parseFloat((stringNumber * 100).toFixed(2));
    };

    var formatMarginProvider = function(response){
        response.marginApplied = toPercentage(response.marginApplied);
        response.rateMarkup = toPercentage(response.rateMarkup);
        response.taxMarkup = toPercentage(response.taxMarkup);
        response.changePrevision = toPercentage(response.changePrevision);

        $scope.marginProvider = angular.copy(response);
    };

    var callbackListError = function(){
      addAlert('danger', 'No pudieron obtenerse los margenes');
    };

    MarginProviderService.get({id: providerId}).$promise.then(formatMarginProvider, callbackListError);

    var compareLocations = function(a, b) {
        if(a.locationName < b.locationName) {
          return -1;
        } else if(a.locationName > b.locationName) {
          return 1;
        }
        return 0;
    };

    var formatMarginLocation = function(response){
      for(var i = 0; i < response.length; i++){
        response[i].marginApplied = toPercentage(response[i].marginApplied);
        response[i].rateMarkup = toPercentage(response[i].rateMarkup);
        response[i].taxMarkup = toPercentage(response[i].taxMarkup);
        response[i].changePrevision = toPercentage(response[i].changePrevision);
        marginLocations.push(response[i]);
      }

      marginLocations = marginLocations.sort(compareLocations);

      if(marginLocations.length > 0) {
        //getTooltip(0);
        getTooltips();
      }
    };

    MarginLocationService.getByProvider({id: providerId}).$promise.then(formatMarginLocation, callbackListError);

    $scope.isProviderEditing = false;

    $scope.editingRowNumber = -1;

    $scope.marginProviderEditingValues = angular.copy($scope.marginProvider);

    $scope.marginLocationEditingValues = {'marginApplied': 0, 'rateMarkup': 50, 'taxMarkup': 50, 'changePrevision': 0};

    $scope.alert = null;

    $scope.enableProviderMarginEdition = function(){
      $scope.isProviderEditing = true;
      $scope.marginProviderEditingValues = angular.copy($scope.marginProvider);
    };

    $scope.cancelProviderMarginEdition = function(){
      $scope.marginProviderEditingValues = angular.copy($scope.marginProvider);
      $scope.isProviderEditing = false;
    };

    $scope.enableLocationMarginEdition = function(index){
      $scope.editingRowNumber = index;
      $scope.marginLocationEditingValues = angular.copy($scope.marginLocations[index]);
    };

    $scope.cancelLocationMarginEdition = function(){
      $scope.marginLocationEditingValues = angular.copy($scope.marginLocations[$scope.editingRowNumber]);
      $scope.editingRowNumber = -1;
    };

    $scope.calculeTaxMarkupProvider = function(){
      if(!isNaN($scope.marginProviderEditingValues.rateMarkup)){
        $scope.marginProviderEditingValues.taxMarkup = parseFloat((100 - $scope.marginProviderEditingValues.rateMarkup).toFixed(2));
      }
    };

    $scope.calculeRateMarkupProvider = function(){
      if(!isNaN($scope.marginProviderEditingValues.taxMarkup)){
        $scope.marginProviderEditingValues.rateMarkup = parseFloat((100 - $scope.marginProviderEditingValues.taxMarkup).toFixed(2));
      }
    };

    $scope.calculeTaxMarkupLocation = function(){
      if(!isNaN($scope.marginLocationEditingValues.rateMarkup)){
        $scope.marginLocationEditingValues.taxMarkup = parseFloat((100 - $scope.marginLocationEditingValues.rateMarkup).toFixed(2));
      }
    };

    $scope.calculeRateMarkupLocation = function(){
      if(!isNaN($scope.marginLocationEditingValues.taxMarkup)){
        $scope.marginLocationEditingValues.rateMarkup = parseFloat((100 - $scope.marginLocationEditingValues.taxMarkup).toFixed(2));
      }
    };

    $scope.updateMarginProvider = function(){
      var marginToUpdate = angular.copy($scope.marginProviderEditingValues);

      marginToUpdate.marginApplied = (marginToUpdate.marginApplied / 100).toFixed(4).toString();
      marginToUpdate.rateMarkup = (marginToUpdate.rateMarkup / 100).toFixed(4).toString();
      marginToUpdate.taxMarkup = (marginToUpdate.taxMarkup / 100).toFixed(4).toString();
      marginToUpdate.changePrevision = (marginToUpdate.changePrevision / 100).toFixed(4).toString();

      MarginProviderService.update(marginToUpdate).$promise.then(callbackUpdateMarginProviderOK, callbackUpdateMarginProviderError);
    };

/*
    var getTooltip = function(index) {
      var margin = marginLocations[index];
      LomaUtils.getParentsById(margin.locationId).then(function(response) {
        if(response.length > 0) {
          margin.locationPath = response[0].label;
          margin.locationName = response[0].locationName;
        }
        
        $scope.marginLocations.push(margin);
        if(index + 1 < marginLocations.length) {
          getTooltip(index + 1);
        }
      }, function() {
        if(index + 1 < marginLocations.length) {
          getTooltip(index + 1);
        }
      });
    };
*/

    var getTooltips = function() {
      //var promises = [];
      var count = 0;
      marginLocations.forEach(function(margin, index) {
        LomaUtils.getParentsById(margin.locationId).then(function(response) {
          if(response.length > 0) {
            margin.locationPath = response[0].label;
            margin.locationName = response[0].locationName;
          }
          marginLocations[index] = margin;

          count++;
          if(count === marginLocations.length) {
            $scope.marginLocations = marginLocations.sort(compareLocations);
          }
        });
      });
    };

    var callbackUpdateMarginProviderOK = function(response){
      addAlert('success', 'Margen de ' + $scope.marginProvider.providerName + ' actualizado exitosamente');

      response.$promise.$$state.value.marginApplied = toPercentage(response.$promise.$$state.value.marginApplied);
      response.$promise.$$state.value.rateMarkup = toPercentage(response.$promise.$$state.value.rateMarkup);
      response.$promise.$$state.value.taxMarkup = toPercentage(response.$promise.$$state.value.taxMarkup);
      response.$promise.$$state.value.changePrevision = toPercentage(response.$promise.$$state.value.changePrevision);

      $scope.marginProvider = response.$promise.$$state.value;
      $scope.isProviderEditing = false;
    };

    var callbackUpdateMarginProviderError = function(){
      addAlert('danger', 'El margen de ' + $scope.marginProvider.providerName + ' no se pudo actualizar');
    };

    $scope.updateMarginLocation = function(){
      var marginToUpdate = angular.copy($scope.marginLocationEditingValues);

      delete marginToUpdate.locationPath;
      marginToUpdate.marginApplied = (marginToUpdate.marginApplied / 100).toFixed(4).toString();
      marginToUpdate.rateMarkup = (marginToUpdate.rateMarkup / 100).toFixed(4).toString();
      marginToUpdate.taxMarkup = (marginToUpdate.taxMarkup / 100).toFixed(4).toString();
      marginToUpdate.changePrevision = (marginToUpdate.changePrevision / 100).toFixed(4).toString();

      MarginLocationService.update(marginToUpdate).$promise.then(callbackUpdateMarginLocationOK, callbackUpdateMarginLocationError);
    };

    var callbackUpdateMarginLocationOK = function(response){
      addAlert('success', 'Margen de ' + $scope.marginLocations[$scope.editingRowNumber].locationName + ' actualizado exitosamente');

      $scope.marginLocations[$scope.editingRowNumber].marginApplied = toPercentage(response.$promise.$$state.value.marginApplied);
      $scope.marginLocations[$scope.editingRowNumber].rateMarkup = toPercentage(response.$promise.$$state.value.rateMarkup);
      $scope.marginLocations[$scope.editingRowNumber].taxMarkup = toPercentage(response.$promise.$$state.value.taxMarkup);
      $scope.marginLocations[$scope.editingRowNumber].changePrevision = toPercentage(response.$promise.$$state.value.changePrevision);      

      $scope.editingRowNumber = -1;
    };

    var callbackUpdateMarginLocationError = function(){
      addAlert('danger', 'El margen de ' + $scope.marginLocations[$scope.editingRowNumber].locationName + ' no se pudo actualizar');
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
    when('/margenes-destino/:providerId', {
      controller:'MarginLocationController',
      templateUrl:'views/hoteles-admin-ui/margin-location.html'
    });
  }]);  

})();