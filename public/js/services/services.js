/*================================================
 Ref.
 https://docs.angularjs.org/api/ng/service/$q
 https://github.com/kriskowal/q
 http://www.benlesh.com/2013/02/angularjs-creating-service-with-http.html
 http://andyshora.com/promises-angularjs-explained-as-cartoon.html
 ================================================ */

'use strict';
/*================================================
 Module - for the Services
 ================================================ */
angular.module('postgreDbApp.services', [])

/**
 * getTodos - Factory Service
 */
    .factory('todosService', ['$http', function ($http) {

        var errorHandler = function (response) {
            if (typeof response.data && response.data.error) {
                throw response.data.error;
            } else {
                throw new Error(response.statusText);
            }
        };

        /*================================================================
         READ - $http get
         =================================================================*/
        var getTodos = function () {

            return $http.get('/api/todos/')
                .then(function (response) {
                    return response.data.todos;
                }, errorHandler);
        };

        /*================================================================
         CREATE - $http post
         =================================================================*/
        var createTodo = function (todo) {

            return $http.post('/api/todos/', todo)
                .then(function (response) {
                    return response.data.todo;
                }, errorHandler);
        };

        /*================================================================
         UPDATE - $http put
         =================================================================*/
        var updateTodo = function (id, updateData) {

            return $http.put('/api/todos/' + id, updateData)
                .then(function (response) {
                    return response.data.todos;
                }, errorHandler);
        };

        /*================================================================
         DELETE - $http delete
         =================================================================*/
        var deleteTodo = function (id) {
            return $http.delete('/api/todos/' + id)
                .then(function (response) {
                    return response.data.todos;
                }, errorHandler);
        };

        //Return Factory Object
        return {
            getTodos: getTodos,
            createTodo: createTodo,
            updateTodo: updateTodo,
            deleteTodo: deleteTodo
        };
    }])

    .factory('authService', ['$http', function ($http) {
        var errorHandler = function (response) {
            if (typeof response.data && response.data.error) {
                throw response.data.error;
            } else {
                throw new Error(response.statusText);
            }
        };

        var service = {
            user: null,
            token: null,
            isLoggedIn: function () {
                return service.token !== null;
            },
            register: function (user) {
                return $http.post('/api/auth/register', user)
                    .then(function (response) {
                        service.user = response.data.user;
                        service.token = service.user.token;
                        service.tokenExpiration = service.user.tokenExpiration;
                        return service.user;
                    }, errorHandler);
            },

            login: function (credentials) {
                return $http.post('/api/auth/login', credentials)
                    .then(function (response) {
                        service.token = response.data.token;
                        service.tokenExpiration = response.data.tokenExpiration;
                        return service.token;
                    }, errorHandler);
            }
        };

        return service;
    }]);