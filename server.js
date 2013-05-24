var express = require('express'),
    hbs = require('hbs'),
    application,
    players = require('./playerDb'),
    gameRouting = require('./gameDb');

application = (function(){
    var app = express();

    app.set('view engine', 'hbs');
    app.set('views', '');
    app.set('view options', {
      layout: false
    });
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

    app.use('/game', gameRouting());

    app.get('/show_scores', function(req, res){
        res.render('foos.hbs', {});
    });

    app.get('/players', function(req, res){
        players.getPlayer(req.query, function(error, player){
            if(error){
                res.send(500, error.message);
            }

            return res.send(200, player);
        });
    });

    app.get('/players_cleardb', function(req, res){
        players.clearPlayerDatabase(function(error){
            if(error){
                res.send(500, error.message);
            }

            return res.send(200, 'player db cleared');
        });
    });

    app.post('/players', function(req, res){
        var playerDetails = req.body;

        players.createPlayer({
            fobId: playerDetails.fobId,
            name: playerDetails.name
        }, function(error){
            if(error){
                return res.send(500, error.message);
            }

            return res.send(200);
        });
    });

    app.post('/login', function(req, res){
        var positionData = req.body;

        console.log('positionData');
        console.dir(positionData);
        res.send(200);
    });

    app.use(function(error, req, res, next){
        if(error){
            console.log(error.message);
            res.send(500, error.message);
        }
    });

    app.listen(3000);
})();
