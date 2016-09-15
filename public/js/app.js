'use strict';

/*================================================
 Module - Main App Module
 ================================================ */
angular.module('postgreDbApp', ['ngRoute', 'ngMaterial', 'postgreDbApp.controllers', 'postgreDbApp.services'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        /*================================================
         Define all the Routes
         Ref.
         https://docs.angularjs.org/api/ng/provider/$locationProvider
         ================================================ */
        $routeProvider

            .when('/', {
                templateUrl: 'views/main.tpl.html',
                controller: 'MainCtrl',
                reloadOnSearch: false
            })
            .when('/register', {
                templateUrl: 'views/register.tpl.html',
                controller: 'RegisterCtrl',
                reloadOnSearch: false,
                allow: true
            })
            .when('/login', {
                templateUrl: 'views/login.tpl.html',
                controller: 'LoginCtrl',
                reloadOnSearch: false,
                allow: true
            })

            .otherwise({
                redirectTo: '/'
            });


        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    }])
    .run(['$http', 'authService', '$rootScope', function ($http, authService, $rootScope) {
        $http.defaults.headers.common.Authorization = function () {
            return 'JWT ' + authService.token;
        };

        $rootScope.loggedIn = function () {
            return authService.isLoggedIn();
        };

    }])
    .run(['$rootScope', '$location', 'authService', function ($rootScope, $location, authService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {

            if (['/login', '/register'].indexOf(next.$$route.originalPath) === -1 && !authService.isLoggedIn()) {
                event.preventDefault();
                $location.path('/login');
            }
        });
    }]);
;