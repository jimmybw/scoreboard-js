var express = require('express'),
    hbs = require('hbs'),
    application,
    players = require('./playerDb');

application = (function(){
    var app = express();

    app.set('view engine', 'hbs');
    app.set('views', '');
    app.set('view options', {
      layout: false
    });
    app.use(express.static(__dirname + '/public'));

    app.get('/show_scores', function(req, res){
        res.render('foos.hbs', {});
    });

    app.get('/players', function(req, res){
        players.getPlayer(req.query, function(error, player){
            if(error){
                res.send(500, error.message);
            }

            return res.send(player);
        });
    });

    app.post('/players', function(req, res){
        var playerDetails = req.query;

        players.createPlayer({
            fobId: playerDetails.fobId,
            name: playerDetails.name
        }, function(error){
            if(error){
                return res.send(500, error.message);
            }

            return res.send(playerDetails);
        });
    });

    app.use(function(error, req, res, next){
        if(error){
            console.log(error.message);
            res.send(500, error.message);
        }
    });

    app.listen(3000);
})();
