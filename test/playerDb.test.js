var assert = require('assert'),
    sinon = require('sinon'),
    sql = require('sqlite3'),
    _ = require('underscore'),
    execSpy = sinon.spy(),
    getSpy = sinon.spy(),
    databaseStub = sinon.stub(sql, 'Database', function(){
        return {
            exec: execSpy,
            get: getSpy
        };
    }),
    playerDb = require('../playerDb');

describe('playerDb', function(){
    afterEach(function(){
        execSpy.reset();
        getSpy.reset();
    });

    it('should return a createPlayer function', function(){
        assert.equal(_(playerDb.createPlayer).isUndefined(), false);
        assert.equal(_(playerDb.createPlayer).isFunction(), true);
    });

    it('should return a getPlayer function', function(){
        assert.equal(_(playerDb.getPlayer).isUndefined(), false);
        assert.equal(_(playerDb.getPlayer).isFunction(), true);
    });

    describe('creating players', function(){
        it('should error if no fobId is passed to createPlayer', function(done){
            playerDb.createPlayer({name: 'bob'}, function(error){
                assert.equal(_(error).isUndefined(), false);
                assert.equal(error.message, "fobId must be supplied");
                assert.equal(execSpy.calledOnce, false);

                done();
            });
        });

        it('should error if no name is passed to createPlayer', function(done){
            playerDb.createPlayer({fobId: '123'}, function(error){
                assert.equal(_(error).isUndefined(), false);
                assert.equal(error.message, "name must be supplied");
                assert.equal(execSpy.calledOnce, false);

                done();
            });
        });

        it('should make a database exec call when createPlayer called', function(){
            playerDb.createPlayer({fobId: '9999', name: 'bob'}, function(){});
            assert.equal(execSpy.calledOnce, true);
        });
    });

    describe('getting players', function(){
        it('should error if no fobId or name supplied to getPlayer', function(done){
            playerDb.getPlayer({}, function(error){
                assert.equal(_(error).isUndefined(), false);
                assert.equal(error.message, "must supply fobId or name");
                assert.equal(getSpy.calledOnce, false);

                done();
            });
        });

        it('should make a database exec call when getPlayer called with fobId', function(){
            playerDb.getPlayer({fobId: '9999'});

            assert.equal(getSpy.calledOnce, true);
            assert.equal(getSpy.args[0][0], 'SELECT fobId, name FROM players WHERE fobId="9999"');
        });

        it('should make a database exec call when getPlayer called with name', function(){
            playerDb.getPlayer({name: 'bobbo'});

            assert.equal(getSpy.calledOnce, true);
            assert.equal(getSpy.args[0][0], 'SELECT fobId, name FROM players WHERE name="bobbo"');
        });
    });
});