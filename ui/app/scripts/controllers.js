/*global angular, _ */
'use strict';

angular.module('pingpongapp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = 'Loading ...';
            menuFactory.getDishes().query(
                function(response){
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response){
                     $scope.message = 'Error: '+response.status + ' '+response.statusText;
                }
            );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            
            $scope.showDish = false;
            $scope.message = 'Loading ...';

            menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
                function (response){
                    $scope.showDish = true;
                    $scope.dish = response;
                },
                function (response){
                     $scope.message = 'Error: '+response.status + ' '+response.statusText;
                }
            );
            
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.dish.comments.push($scope.mycomment);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        .controller('GlobalController',['$scope','ControllerCommunicationFactory','localStorageService',function($scope,ControllerCommunicationFactory,localStorageService){            
             $scope.loginRequired = false;
             ControllerCommunicationFactory.onMsg(ControllerCommunicationFactory.loginCompleted,$scope,function(emitScope,miembro){
                $scope.loadUser(miembro);
            });

            ControllerCommunicationFactory.onMsg(ControllerCommunicationFactory.logoutCompleted,$scope,function(emitScope,msg){
                console.log(msg);
                $scope.loadUser();
            });

            var _userLoggedKey = localStorageService.retrieveKey(localStorageService.availableKeys()[0]);

            $scope.loadUser = function(miembro){                
                if(!_.isNull(miembro) && !_.isUndefined(miembro)){
                    $scope._miembro = miembro;
                    $scope.loginRequired = true;
                }else{
                    $scope.loginRequired = false;
                    $scope._miembro = {};
                }
            };

            (function(){
                $scope.loadUser(localStorageService.retrieveFromLocalStorage(_userLoggedKey));
            })();

            $scope.unsubscribe = function(miembro){
                ControllerCommunicationFactory.emitMsg(ControllerCommunicationFactory.unsubscribe,miembro);
            };
            
        }])

        .controller('ParticipantesController',['$scope','miembroFactory','MatchInformationFactory',function($scope,miembroFactory,MatchInformationFactory){
            
            $scope.miembros = [];
            miembroFactory.list().$promise.then(
                function(responseOk){
                    $scope.miembros = responseOk;
                },
                function(responseFailure){
                    console.log(responseFailure);
                    $scope.miembros = [];
                }

            );

            $scope.getStatusData = function(miembro,callback){                
                var _playInfo = {
                            pj : 0, 
                            po : 0 
                };              
                MatchInformationFactory.list().$promise.then(
                    function(resultOk){                                  
                        resultOk.forEach(function(element){
                            if(element.players[0].id === miembro.id || element.players[1].id === miembro.id){
                                _playInfo.pj ++;
                                if(element.ganador.id === miembro.id ){
                                     _playInfo.p0 = _playInfo.p0+3;
                                }
                            }
                        });
                        callback(_playInfo);
                    },
                    function(resultFailure){
                        console.log(resultFailure);
                        callback(null);
                    }
                );
                console.log(miembro,callback);
            };
        }])

         .controller('FixtureController',['$scope','FixtureInformationController','$uibModal','$log','miembroFactory',
            function($scope,FixtureInformationController,$uibModal,$log,miembroFactory){            
            $scope.fixture = {};
            $scope.callBacks = 0;
            var fixtureFunction = function(response){
                $scope.fixture.fechas = _.sortBy(response,function(element){
                        return element.nro;
                });
                $scope.fixture.nroFechas = $scope.fixture.fechas.length;  
                if($scope.fixture.nroFechas === 0){
                    $scope.generated = true;
                } else{
                     $scope.generated = false;
                }            
            };
            var removeFunction = function(element){
                FixtureInformationController.remove({id:element}).$promise.then(
                    function(){
                       console.log('removed');
                    },
                    function(){
                        console.log('error');
                    }
                );
            };
            $scope.eliminar = function(){
                for(var i = 0 ; i< $scope.fixture.fechas.length; i++){
                    removeFunction($scope.fixture.fechas[i].id);
                }
                fixtureFunction([]);
            };

            FixtureInformationController.list().$promise.then(
                function(responseOk){
                    fixtureFunction(responseOk);
                },
                function(resultFailure){
                     console.log(resultFailure);
                }
            );

            miembroFactory.list().$promise.then(
                function(responseOk){
                    $scope.miembros = responseOk;
                },
                function(responseFailure){
                    console.log(responseFailure);
                }
            ); 

            var _createFechas = function(_fecha){
                  FixtureInformationController.create(_fecha).$promise.then(
                    function (responseOk){
                        $scope.callBacks--;
                        $scope.fixture.fechas_tmp.push(responseOk);
                        if($scope.callBacks === 0){
                            fixtureFunction($scope.fixture.fechas_tmp);
                        }
                    },
                    function (resultFailure){
                        console.log(resultFailure);
                        $scope.callBacks--;
                        if($scope.callBacks === 0){
                            fixtureFunction($scope.fixture.fechas_tmp);
                        }
                    }
                );
            }; 
            var _createOponents = function(miembro,miembros){
                var _players = [];
                miembros.forEach(function(_miembro){                    
                    _players.push({player1 : miembro, player2:_miembro});
                });
                return _players;
            };
            var _makeFechaWithPlayer = function(nro){
                var fecha ={
                        nro : nro,
                        players : []
                };
                var _miembros = JSON.parse(JSON.stringify($scope.miembros));
                _miembros.forEach(function(_miembro){                    
                    delete _miembro.superUser;
                    delete _miembro.passwd;
                    delete _miembro.avatarImg;
                });
                while(_miembros.length > 1){
                    Array.prototype.push.apply(fecha.players,(_createOponents(_miembros.splice(0,1)[0],_miembros)));
                }
                return fecha;
            };  
            
            $scope.checkNewValue = function(){           
                console.log($scope.fixture.nroFechas);
            };
            $scope.generar = function(){
                var _fechas = [];
                for(var i = 0; i < $scope.fixture.nroFechas; i++){
                    _fechas.push(_makeFechaWithPlayer(i+1));
                }
                 $scope.callBacks = _fechas.length;
                 $scope.fixture.fechas_tmp = [];
                _fechas.forEach(function(_fecha){
                    _createFechas(_fecha);
                });                

            };
            $scope.openFecha = function(fecha){
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'views/fechasConfig.html',
                    controller: 'FechasConfigController',
                    resolve: {
                        fecha: fecha,
                    }
                });
            
                modalInstance.result.then(function (selectedItem) {      
                    $scope.loginCompleted(selectedItem);
                    $scope.newMiembro();
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            
        }])
        .controller('FechasConfigController',['$scope','$uibModalInstance', 'fecha', 'miembroFactory', function ($scope, $uibModalInstance, fecha,miembroFactory) {

            $scope.fecha = fecha;
            $scope.miembro = fecha;
            $scope.selected = {
                miembro: $scope.miembro
            };

            var _retrievePlayer = function(id){

                miembroFactory.getOne({id:id}).$promise.then(
                    function(responseOk){
                        $scope.fecha.players.forEach(function(_players){
                            if(_players.player1.id === responseOk.id){
                                _players.player1.avatarImg = responseOk.avatarImg;
                            }else if(_players.player2.id === responseOk.id){
                                _players.player2.avatarImg = responseOk.avatarImg;
                            }
                        });
                         
                    },
                    function(responseFailure){
                        console.log(responseFailure);
                    }
                );
            };

            (function(){
                var _ids = [];
                $scope.fecha.players.forEach(function(_players){                    
                    if(!_.contains(_ids,_players.player1.id)){
                        _ids.push(_players.player1.id);    
                    }
                    if(!_.contains(_ids,_players.player2.id)){
                        _ids.push(_players.player2.id);       
                    }
                    
                });            
                _ids.forEach(function(id){
                    _retrievePlayer(id);
                });
            })();
            

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
                });        
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
}])

;
