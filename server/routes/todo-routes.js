/*================================================================
 Server side Routing
 Route Definitions

 Depending on the REST route/endpoint the PostgreSQL database
 is Queried using sequelize.

 PostgreSQL DB table name is: 'todos'
 =================================================================*/

var Todo = require('../models/todo');


module.exports = {

    /*================================================================
     CREATE - $http post
     =================================================================*/
    //create todo and send back all todos after creation
    createTodo: function (req, res, next) {
        //Data to be saved to the DB - taken from $http request packet
        Todo.create({text: req.body.text, done: false})
            .then(function (todo) {
                return res.json({todo: todo})
            })
            .catch(function (err) {
                next(err);
            });
    },


    /*================================================================
     READ - $http get
     =================================================================*/
    //Get all todos in the database
    getTodos: function (req, res, next) {

        return Todo.findAll({order: 'id ASC'})
            .then(function (todos) {
                return res.json({todos: todos})
            })
            .catch(function (err) {
                next(err);
            });
    },


    /*================================================================
     UPDATE - $http put
     =================================================================*/
    updateTodo: function (req, res, next) {

        var id = req.params.todo_id;


        console.log("ID= " + id); //TEST

        Todo.update({
            text: req.body.text,
            done: req.body.done
        }, {
            where: {id: id}
        })
            .then(function () {
                return Todo.findAll({order: 'id ASC'})
            })
            .then(function (todos) {
                return res.json({todos: todos})
            })
            .catch(function (err) {
                next(err);
            });
    },

    /*================================================================
     DELETE - $http delete
     =================================================================*/
    deleteTodo: function (req, res, next) {

        var id = req.params.todo_id;

        console.log("id= " + id); //TEST

        Todo.destroy({
            where: {id: id}
        })
            .then(function () {
                return Todo.findAll({order: 'id ASC'})
            })
            .then(function (todos) {
                return res.json({todos: todos})
            })
            .catch(function (err) {
                next(err);
            });
    }
};