var sqlite = require('sqlite3'),
    db = new sqlite.Database('foos-db');

/*//will leave here commented out for dev whilst structure may change
db.exec('CREATE TABLE players (fobId TEXT NOT NULL PRIMARY KEY, name TEXT NOT NULL)');
*/
function createPlayer(options, callback){
    if(!options.fobId){
        return callback(new Error('fobId must be supplied'));
    }

    if(!options.name){
        return callback(new Error('name must be supplied'));
    }

    db.exec(
        'INSERT INTO players VALUES ("'+ options.fobId +'", "'+ options.name +'")',
        function(error){
            if(error){
                console.log(error.message);
                return callback(error);
            }

            console.log('added', options);
            return callback();
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
                return callback(error);
            }

            console.log(player);
            return callback(undefined, player);
        });
}

function clearPlayerDatabase(callback){
    db.exec('DELETE FROM players', function(error){
        if(error){
            return callback(error);
        }

        return callback();
    });
}

module.exports = {
    createPlayer: createPlayer,
    getPlayer: getPlayer,
    clearPlayerDatabase: clearPlayerDatabase
};
