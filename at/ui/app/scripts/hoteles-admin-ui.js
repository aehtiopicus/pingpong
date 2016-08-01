/* global Avantrip,loadHotelesAdminUIAngularComponents */
(function startApp() {

    'use strict';

    console.log('hoteles-admin-ui: Load js');

    function addRoutes(routeProvider) {
        console.log('hoteles-admin-ui: Load route');

        routeProvider.
        when('/hoteles-destacados', {
            controller: 'HotelesDestacadosController',
            templateUrl: 'views/hoteles-admin-ui/hoteles-destacados.html'
        }).
        when('/hoteles-filtrado', {
            controller: 'FiltroHotelesHomeController',
            templateUrl: 'views/hoteles-admin-ui/filtrado-hoteles-home.html'
        }).
        when('/hoteles-preferencia', {
            controller: 'PreferenciaHotelesController',
            templateUrl: 'views/hoteles-admin-ui/preferencia-hotel.html'
        }).
        when('/discount-adm', {
            controller: 'DiscountHomeController',
            templateUrl: 'views/hoteles-admin-ui/discount-adm-home.html'
        }).
        when('/markup-adm', {
            controller: 'MarkupHomeController',
            templateUrl: 'views/hoteles-admin-ui/markup-adm-home.html'
        }).
        when('/markup-on-taxes-provider', {
            controller:'MarkupOnTaxesForProviderController',
            templateUrl:'views/hoteles-admin-ui/crud-view.html'
        }).
        when('/markup-on-taxes-hotel', {
            controller:'MarkupOnTaxesForHotelController',
            templateUrl:'views/hoteles-admin-ui/crud-view.html'
        }).
        when('/markup-on-taxes-location', {
            controller:'MarkupOnTaxesForLocationController',
            templateUrl:'views/hoteles-admin-ui/crud-view.html'
        }).
        when('/markup-on-taxes-default', {
            controller:'MarkupOnTaxesDefaultController',
              templateUrl:'views/hoteles-admin-ui/crud-view.html'
        }).
        when('/payment-adm', {
            controller: 'PaymentHomeController',
            templateUrl: 'views/hoteles-admin-ui/payment-adm-home.html'
        }).
        when('/reporte-margen-destino', {
            controller: 'ReporteMargenDestinoController',
            templateUrl: 'views/hoteles-admin-ui/reporte-margen-destino.html'
        });
    }

    function addMenu(menu) {
        console.log('hoteles-admin-ui: Load menu');

        menu.addMenu(

            'Hoteles', [{
                url: '#/hoteles-destacados',
                text: 'Destacar Hoteles'
            }]
        );

        menu.addMenu(
            'Hoteles', [{
                url: '#/hoteles-filtrado',
                text: 'Filtrado de Hoteles',
                submenu: [{
                    url: '#/filtro-por-hotel',
                    text: 'Filtro por Hotel',
                }, {
                    url: '#/filtro-por-destino',
                    text: 'Filtro por Destino',
                }]
            }]);

        menu.addMenu(

            'Hoteles', [{
                url: '#/hoteles-preferencia',
                text: 'Competencia'
            }]
        );

        menu.addMenu(
            'Margenes', [{
                url: '#/markup-adm',
                text: 'Adm. Markup',
                submenu: [{
                    url: '#/markup-por-hotel',
                    text: 'Markup por Hotel',
                }, {
                    url: '#/markup-por-location',
                    text: 'Markup por Destino',
                }, {
                    url: '#/markup-por-proveedor',
                    text: 'Markup por Proveedor',
                }, {
                    url: '#/markup-por-default',
                    text: 'Markup Default',
                }]
            }]);

        menu.addMenu(
            'Margenes', [{
                url: '#/discount-adm',
                text: 'Adm. Descuentos',
                submenu: [{
                    url: '#/discount-per-hotel',
                    text: 'Descuentos por Hotel',
                }, {
                    url: '#/discount-per-location',
                    text: 'Descuentos por Destino',
                }, {
                    url: '#/discount-per-provider',
                    text: 'Descuentos por Proveedor',
                }]
            }]);

       menu.addMenu(
       'Margenes',
       [{
           text: 'Markup sobre Impuestos',
           submenu: [{
             url: '#/markup-on-taxes-hotel',
             text: 'Markup por Hotel',
            },{
             url: '#/markup-on-taxes-provider',
             text: 'Markup por Proveedor',
            },{
             url: '#/markup-on-taxes-location',
             text: 'Markup por Destino',
            },{
             url: '#/markup-on-taxes-default',
             text: 'Markup por Default',
            }]
        }]);

       menu.addMenu(

            'Margenes', [{
                url: '#/margenes-proveedor',
                text: 'Margenes Proveedores'
            }]
        );

        menu.addMenu(
            'Métodos de Pago y Cuotas', [{
                url: '#/commons-payment',
                text: 'ON/OFF Métodos de Pago General (En construcción)',
            }, {
                url: '#/hotels-payment',
                text: 'ON/OFF Métodos de Pago de Hoteles (En construcción)',
            }, {
                url: '#/hotels-credit-cards',
                text: 'ON/OFF de TC, Bancos y Cuotas General (En construcción)',
            }, {
                url: '#/commons-credit-cards',
                text: 'ON/OFF de TC, Bancos y Cuotas en Hoteles',
            }]
        );

        menu.addMenu(
            'Reportes', [{
                url: '#/reporte-margen-destino',
                text: 'Margenes por Destinos',
            }]
        );
    }

    function createAngularApp(app) {
        console.log('hoteles-admin-ui: Load controller');

        loadHotelesAdminUIAngularComponents(app);

        app.requires.push(
          'ngSanitize','ngResource',
          'ui.bootstrap.datetimepicker',
          'angularUtils.directives.dirPagination',
          'oi.select'
          );
    }

    function init( /*avt*/ ) {
        console.log('hoteles-admin-ui Loaded');

    }

    var testApp = {};

    Avantrip.register('hoteles-admin-ui', testApp)
        .onLoad(init)
        .on('angularLoad', createAngularApp)
        .on('routeLoad', addRoutes)
        .on('menuLoad', addMenu);

})();
