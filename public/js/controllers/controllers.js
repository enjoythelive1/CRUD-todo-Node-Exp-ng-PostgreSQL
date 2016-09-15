'use strict';

/*================================================
 Module - for the Controllers
 ================================================ */
angular.module('postgreDbApp.controllers', [])

/**
 * Controller - MainCtrl
 */
    .controller('MainCtrl', ['$scope', '$q', 'todosService', function ($scope, $q, todosService) {

        $scope.todos = {};

        /*
         * Get Todos
         */
        todosService.getTodos()
            .then(function (answer) {
                    $scope.todos = answer;
                    $scope.todos.push({});
                },
                function (error) {
                    console.log("OOPS!!!! " + JSON.stringify(error));
                }
            );


        /*
         * Create a New Todo
         */
        $scope.createTodo = function (todo) {

            todo.uploading = true;
            todo.creating = true;
            todosService.createTodo(todo)
                .then(function (answer) {
                        todo.uploading = false;
                        todo.creating = false;
                        todo.id = answer.id;
                        $scope.todos.push({});
                    },
                    function (error) {
                        console.log("OOPS Error Creating Todo!!!! " + JSON.stringify(error));
                    }
                );
        };

        /*
         * Update a Todo
         */
        $scope.editTodo = function (todo) {
            todo.uploading = true;

            todosService.updateTodo(todo.id, todo)
                .then(function (answer) {
                        todo.uploading = false;
                    },
                    function (error) {
                        console.log("OOPS Error Updating!!!! " + JSON.stringify(error));
                    }
                );
        };

        $scope.updateTodo = function (todo) {
            if (!todo.id && !todo.text) {
                todo.done = false;
                return;
            }

            if (!todo.id && !todo.creating) {
                return $scope.createTodo(todo);
            }

            if (!todo.creating) {
                return $scope.editTodo(todo);
            }
        };


        /*
         * Delete a Todo
         */
        $scope.deleteTodo = function (todo) {
            todosService.deleteTodo(todo.id)
                .then(function (answer) {
                        var index = $scope.todos.indexOf(todo);
                        if (index !== -1) {
                            $scope.todos.splice(index, 1);
                        }
                    },
                    function (error) {
                        console.log("OOPS Error Deleting!!!! " + JSON.stringify(error));
                    }
                );

        };
    }])

    .controller('RegisterCtrl', ['$scope', 'authService', '$location', function ($scope, authService, $location) {
        $scope.user = {};

        $scope.register = function () {
            $scope.registering = true;
            authService.register($scope.user)
                .then(function (user) {
                    $scope.registering = false;
                    $location.path('/');
                });
        }
    }])

    .controller('LoginCtrl', ['$scope', 'authService', '$location', function ($scope, authService, $location) {
        $scope.credentials = {};

        $scope.login = function () {
            $scope.loggingin = true;
            authService.login($scope.credentials)
                .then(function (credentials) {
                    $scope.loggingin = false;
                    $location.path('/');
                });
        }
    }]);
