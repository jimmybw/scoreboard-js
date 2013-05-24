var sqlite = require('sqlite3'),
    db = new sqlite.Database('foos-db'),
    express= require('express'),
    Router = express.Router,
    Game = require('./Game'),
    _ = require('underscore');

module.exports = function(){
    var router = new Router(),
        game;

    router.post('/create', function create(req, res){
        if(game && !game.canCreateNewGame()){
            return res.send(400, 'game in progress. reset game if this is not the case.');
        }

        game = new Game();

        console.dir(game.getGame());
        res.send(200, game.getGame());
    });

    router.post('/goal', function goal(req, res){
        var goalData = req.body,
            scoreData;

        if(goalData.count > 0){
            game.incrementScore({
                team: goalData.team,
                count: goalData.count
            });
        }else{
            game.decrementScore({
                team: goalData.team,
                count: goalData.count
            });
        }

        return res.send(200, game.getGame());
    });

    router.post('/login', function login(req, res){
        var loginData = req.body;

        game.setPlayers(loginData);

        res.send(200, game.getGame());
    });

    router.get('/reset', function reset(req, res){
        game = new Game();

        res.send(200, game.getGame());
    });

    return router.middleware;
};

