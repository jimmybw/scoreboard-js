var sqlite = require('sqlite3'),
    db = new sqlite.Database('player-db');

function createPlayer(options, callback){
    if(!options.fobId){
        throw new Error('fobId must be supplied');
    }

    if(!options.name){
        throw new Error('name must be supplied');
    }

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
    var sql = 'SELECT fobId, name FROM players WHERE ';

    if(!options.name && !options.fobId){
        return callback(new Error('must supply fobId or name'));
    }

    if(options.fobId){
        sql += 'fobId="'+options.fobId+'"';
    }else if(options.name){
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
