'use strict';

var express= require('express'),
    Router = express.Router,
    Game = require('../js/game'),
    socketio = require('socket.io');

var AUTH_TOKEN = 'Basic thefooser';

function returnGameStateAndBroadcastState(io, res, game){
    var gameState = game.getGameState();

    res.send(gameState);
    emitUpdatedGameState(io, gameState);
}

function emitUpdatedGameState(io, gameState){
    io.sockets.emit('update', gameState);
}


function authenticate(req, res, next){
    var auth = req.headers.authorization;

    if(auth !== AUTH_TOKEN){
        return res.send('incorrect authentication');
    }

    next();
}

module.exports = function(socket){
    var router = new Router(),
        io = socket;

    io.sockets.on('connection', function(){
        emitUpdatedGameState(io, Game.getGame().getGameState());
    });

    router.get('*', authenticate);
    router.post('*', authenticate);

    /*
        LOGS A GOAL TO THE GAME
        @string - team: the name of the team that scored
        @number - count: the number of goals scored
    */
    router.post('/goal', function(req, res){
        var goalData = req.body,
            game = Game.getGame();

        game.goal(goalData);

        returnGameStateAndBroadcastState(io, res, game);
    });

    /*
        JOINS A PLAYER TO THE GAME
        @string - name: the name of the player that joined
        @string - team: the name of the team joined
    */
    router.post('/join', function(req, res){
        var playerData = req.body,
            game = Game.getGame();

        game.joinGame(playerData);

        returnGameStateAndBroadcastState(io, res, game);
    });

    /*
        RESETS GAME
    */
    router.get('/reset', function(req, res){
        Game.resetGame();

        returnGameStateAndBroadcastState(io, res, Game.getGame());
    });

    /*
        RETURNS CURRENT GAME
    */
    router.get('/', function(req, res){
        returnGameStateAndBroadcastState(io, res, Game.getGame());
    });

    return router.middleware;
};

