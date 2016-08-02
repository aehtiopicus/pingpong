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

        .controller('IndexController',['$scope','localStorageService','ControllerCommunicationFactory',function($scope,localStorageService,ControllerCommunicationFactory){            
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
                       
            
        }])

        .controller('GlobalController',['$scope','ControllerCommunicationFactory',function($scope,ControllerCommunicationFactory){            
            ControllerCommunicationFactory.onMsg(ControllerCommunicationFactory.loginCompleted,$scope,function(emitScope,miembro){
                if(!_.isUndefined($scope.loadUser)){
                    $scope.loadUser(miembro);
                }
            });

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

;
