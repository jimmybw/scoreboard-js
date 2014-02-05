'use strict';

var application,
    express = require('express'),
    gameRouting = require('./routing/game'),
    socketio = require('socket.io'),
    os = require('os');

application = (function(){
    var app = express(),
        server = require('http').createServer(app),
        io = socketio.listen(server);

    app.set('view engine', 'hbs');
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

    app.use('/game', gameRouting(io));

    app.use('/', function(req, res, next){
        res.render('home', {
            hostName: os.hostname() + ':3000'
        });
    });

    app.use(function(error, req, res, next){
        if(error){
            console.log(error.message);
            res.send(500, error.message);
        }
    });

    server.listen(3000);
})();