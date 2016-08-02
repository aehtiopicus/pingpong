'use strict';

angular.module('pingpongapp', ['ui.router','ngResource','ui.bootstrap','flow'])
.config(['$stateProvider', '$urlRouterProvider','flowFactoryProvider',function($stateProvider, $urlRouterProvider,flowFactoryProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.participantes', {
                url:'participantes',
                views: {
                    'content@': {
                        templateUrl : 'views/participantes.html',
                        controller  : 'ParticipantesController'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
        flowFactoryProvider.defaults = {
            target: '/upload',
            permanentErrors:[404, 500, 501]
        };
    // You can also set default events:
        flowFactoryProvider.on('catchAll', function (event) {
            console.log(event);      
        });
    }])
;
