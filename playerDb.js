var sqlite = require('sqlite3'),
    db = new sqlite.Database('player-db');

function createPlayer(options, callback){
    db.exec(
        'INSERT INTO players VALUES ("'+ options.fobId +'", "'+ options.name +'")',
        function(error){
            if(error){
                console.log('aint put sheeiiittt');
                throw error;
            }

            console.log('added', options);
        });
}

function getPlayer(options, callback){
    var sql = 'SELECT fob_id, name FROM players WHERE ';

    if(!options.name || !options.fobId){
        return null;
    }

    if(options.fobId){
        sql += 'fob_id="'+options.fobId+'"';
    } else if(options.name){
        sql += 'name="'+options.name+'"';
    }

    db.get(
        sql,
        function(error, player){
            if(error){
                throw error;
            }

            console.log(player);
            return callback(undefined, player);
        });
}

module.exports = {
    createPlayer: createPlayer,
    getPlayer: getPlayer
};
