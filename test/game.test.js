'use strict';

var Game = require('../js/game'),
    assert = require('assert');

describe('Game', function(){
    describe('initialisation', function(){
        it('should return an object', function(){
            assert.equal(typeof Game, 'object');
        });

        describe('getGame', function(){
            it('should return an object', function(){
                assert.equal(typeof Game.getGame(), 'object');
            });
        });

        describe('resetGame', function(){
            it('should have a resetGame function', function(){
                assert.equal(Game.hasOwnProperty('resetGame'), true);
            });
        });
    });

    describe('game object', function(){
        var game;

        beforeEach(function(){
            game = Game.getGame();
        });

        afterEach(function(){
            Game.resetGame();
            game = undefined;
        });

        describe('getGameState', function(){
            it('should return an object', function(){
                assert.equal(typeof game.getGameState(), 'object');
            });

            it('should contain a players array', function(){
                assert.equal(game.getGameState().hasOwnProperty('players'), true);
                assert.equal(Array.isArray(game.getGameState().players), true);
            });

            it('should contain a scores array', function(){
                assert.equal(game.getGameState().hasOwnProperty('scores'), true);
                assert.equal(Array.isArray(game.getGameState().scores), true);
            });
        });

        describe('joinGame', function(){
            it('should update players array with player data', function(){
                var gameState;

                game.joinGame({name: 'chris', team: 'reds'});

                gameState = game.getGameState();

                assert.equal(gameState.players.length, 1);
                assert.equal(gameState.players[0].name, 'chris');
                assert.equal(gameState.players[0].team, 'reds');
            });

            it('should not add players if they are already joined', function(){
                var gameState;

                game.joinGame({name: 'chris', team: 'reds'});
                game.joinGame({name: 'chris', team: 'reds'});

                gameState = game.getGameState();

                assert.equal(gameState.players.length, 1);
            });

            it('should create scores entry for team if it does not exist', function(){
                var gameState;

                game.joinGame({name: 'chris', team: 'reds'});

                gameState = game.getGameState();

                assert.equal(gameState.scores.length, 1);
                assert.equal(gameState.scores[0].team, 'reds');
                assert.equal(gameState.scores[0].score, 0);
            });
        });

        describe('goal', function(){
            it('should create scores array entry for team with goal data', function(){
                var gameState;

                game.goal({team: 'blues', count: 1});

                gameState = game.getGameState();

                assert.equal(gameState.scores.length, 1);
                assert.equal(gameState.scores[0].score, 1);
                assert.equal(gameState.scores[0].team, 'blues');
            });

            it('should update scores array data with goal data', function(){
                var gameState;

                game.goal({team: 'blues', count: 1});
                game.goal({team: 'blues', count: 1});

                gameState = game.getGameState();

                assert.equal(gameState.scores.length, 1);
                assert.equal(gameState.scores[0].score, 2);
                assert.equal(gameState.scores[0].team, 'blues');
            });

            it('should accept negative count values', function(){
                var gameState;

                game.goal({team: 'blues', count: -1});

                gameState = game.getGameState();

                assert.equal(gameState.scores.length, 1);
                assert.equal(gameState.scores[0].score, -1);
                assert.equal(gameState.scores[0].team, 'blues');
            });
        });
    });
});