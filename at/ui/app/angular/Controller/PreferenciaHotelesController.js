/* global angularApp, angular */
(function(){
    'use strict';
    angularApp.controller('PreferenciaHotelesController', function($scope,CRUDService,CompetenciaService,PrioridadService,ConfigService){

        $scope.configService = new CRUDService(ConfigService);
        $scope.competenciaService = new CRUDService(CompetenciaService);
        $scope.prioridadService = new CRUDService(PrioridadService);

        $scope.selPriority = {};
        $scope.selCompetition = [];

        $scope.loading = false;

        $scope.activeConfig = {
            loaded: false,
            active: false
        };

        //Paso el array a un objeto
        $scope.competitionProviders = function(arr){
            var obj = arr.split('|').map(function(e){
                return {name: e};
            });
            return obj;
        };

        //Listado de properties
        $scope.configService.onListAllObjects(
            function(object, message) {
                $scope.haloConfigs = object.configs;
                console.log('Exito:',message);
            },
            function(message) {
                console.log('Error:',message);
            });

        //Listar property seleccionada
        $scope.selectConfig = function() {
            $scope.activeConfig.loaded = false;
            $scope.loading = true;

            $scope.configService.onList(
                function(object, message) {
                    console.log('Exito:',message);

                    $scope.selCompetition = object.values['Configurations.Competition.do-providers-competition'].value;
                    $scope.selPriority = $scope.competitionProviders(object.values['Configurations.Competition.providers-competition-priority'].value);
                    $scope.providers = angular.copy($scope.selPriority);

                    $scope.activeConfig.loaded = true;
                    $scope.activeConfig.active = true;
                    $scope.loading = false;
                },
                function(message) {
                    console.log('Error:',message);
                    $scope.loading = false;
                }
            );

        };

        $scope.save = function(key){

            $scope.loading = true;
            $scope.obj = {};
            $scope.saveMsg = null;

            if(key==='selCompetition'){
                $scope.obj = {value:$scope.selCompetition};

                $scope.competenciaService.onUpdate(
                    $scope.obj,
                    function(object, message) {
                        console.log('Exito:', message);
                        $scope.saveMsg = 'Cambios guardados correctamente';
                    },
                    function(message) {
                        console.log('Error:',message);
                    });

            }else if(key==='selPriority'){

                //To string
                var strProviders = '';
                var separator = '';
                $scope.selPriority.forEach(function(pr){
                        strProviders = strProviders + separator + pr.name;
                        separator = '|';
                });

                $scope.obj = {value:strProviders};
                $scope.prioridadService.onUpdate(
                    $scope.obj,
                    function(object, message) {
                        console.log('Exito:', message);
                        $scope.saveMsg = 'Cambios guardados correctamente';
                    },
                    function(message) {
                        console.log('Error:',message);
                    });
            }
            $scope.loading = false;
        };




    }); //-- Fin Controller


    //------------------------


})();
