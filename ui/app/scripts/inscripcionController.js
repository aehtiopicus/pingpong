'use strict';

angular.module('pingpongapp').
	controller('InscripcionController',['$scope','$uibModal','$log',function($scope,$uibModal,$log){

  $scope.animationsEnabled = true;

    

  $scope.newMiembro = function(){
  	$scope.miembro = {
  		nombre: null,
  		apellido: null,
  		passwd: null,
  		usuario : null,
  		avatarImg : null
  	};
  };

   $scope.newMiembro();
  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'inscripcion.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        miembro: function () {
          return $scope.miembro;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {      
    	console.log(selectedItem);
  		$scope.newMiembro();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

	}]
).controller('ModalInstanceCtrl',['$scope','$uibModalInstance', 'miembro', 'miembroFactory', function ($scope, $uibModalInstance, miembro,miembroFactory) {

  $scope.miembro = miembro;
  $scope.selected = {
    miembro: $scope.miembro
  };

  $scope.flowData = {};

  $scope.ok = function () {
  	$scope.selected.miembro.avatarImg = angular.element( document.querySelector( '#userAvatar'))[0].src;
 	 miembroFactory.create($scope.selected.miembro).$promise.then(
      	function(responseOk){
      		console.log(responseOk);
      		$scope.showError = false;
      		$uibModalInstance.close($scope.selected.miembro);
      	},
      	function(responseError){
      		if(responseError.status === -1 ){
      			$scope.showError = false;
      			$uibModalInstance.close($scope.selected.miembro);		
      		}else{
      			$scope.showError = true;
      			$scope.errorMessage = responseError;
      		}

      	}
    );
      
    
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);