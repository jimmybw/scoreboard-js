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
        players.getPlayer(req.query, function(err, player){
            if(err){
                res.send('bugger');
            }

            return res.send(player);
        });
    });

    app.post('/players', function(req, res){
        var playerDetails = req.query;

        players.createPlayer({
            fobId: playerDetails.fobId,
            name: playerDetails.name
        });

        res.send(playerDetails);
    });

    app.listen(3000);
})();
