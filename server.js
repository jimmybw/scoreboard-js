'use strict';

var application,
    express = require('express'),
    gameRouting = require('./routing/game');

application = (function(){
    var app = express();

    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());

    app.use('/game', gameRouting());

    app.use(function(error, req, res, next){
        if(error){
            console.log(error.message);
            res.send(500, error.message);
        }
    });

    app.listen(3000);
})();