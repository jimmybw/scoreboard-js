'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var os = require('os');

var app = express();
var server = require('http').createServer(app);
var io = socketio.listen(server);

var appConfig = require('./appConfig');
var Game = require('./js/game');
var gameRouting = require('./routing/game');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/game', gameRouting(io));

app.use('/', function(req, res, next){
    res.render('home', {
        hostName: appConfig.host || os.hostname() + ':' + (process.env.PORT || 5000)
    });
});

app.use(function(error, req, res, next){
    if(error){
        console.log(error.message);
        res.send(500, error.message);
    }
});

server.listen((process.env.PORT || 5000));
