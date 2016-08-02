'use strict';

angular.module('pingpongapp').
	controller('InscripcionController',['$scope','$uibModal','$log','ControllerCommunicationFactory','miembroFactory',function($scope,$uibModal,$log,ControllerCommunicationFactory,miembroFactory){

  $scope.animationsEnabled = true;

  ControllerCommunicationFactory.onMsg(ControllerCommunicationFactory.unsubscribe,$scope,function(emitScope,miembro){
    miembro.deleted = true;
        miembroFactory.update({id:miembro.id},miembro).$promise.then(
          function(success){
            console.log(success);
            $scope.logout();
          },
          function(failure){
            console.log(failure);
          }
        );
  });
    

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
      templateUrl: 'views/inscripcion.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        miembro: function () {
          return $scope.miembro;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {      
    	$scope.loginCompleted(selectedItem);
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
          $scope.selected.miembro.id = responseOk.id;
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