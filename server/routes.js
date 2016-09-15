/*================================================================
 Server side Routing
 Route Declarations

 =================================================================*/

/* ========================================================== 
 Internal App Modules/Packages Required
 ============================================================ */
var errorHandlers = require('./routes/error-handlers');
var todoRoutes = require('./routes/todo-routes.js');
var authRoutes = require("./routes/auth-routes.js");	//Exchange routes
var passport = require('passport');

require('./passport-strategies/local');
require('./passport-strategies/jwt');


module.exports = function (app) {

    /*================================================================
     ROUTES
     =================================================================*/

    /*================================================================
     API Routes
     ================================================================*/
    app.post('/api/todos', passport.authenticate('jwt', {session: false}), todoRoutes.createTodo);
    app.get('/api/todos', passport.authenticate('jwt', {session: false}), todoRoutes.getTodos);
    app.put('/api/todos/:todo_id', passport.authenticate('jwt', {session: false}), todoRoutes.updateTodo);
    app.delete('/api/todos/:todo_id', passport.authenticate('jwt', {session: false}), todoRoutes.deleteTodo);

    app.post('/api/auth/register', authRoutes.register);
    app.post('/api/auth/login', passport.authenticate('local', {session: false}), authRoutes.login);

    app.use('/api', errorHandlers.notFound);
    app.use('/api', errorHandlers.internalError);
};