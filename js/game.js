'use strict';

/*
    #add our code to the module's output
    #implementing a singleton module pattern
    #exposes `getGame` function to return game instance
*/
module.exports = (function gameSingleton(){
    var instance;

    function createGameInstance(){
        var DEFAULT_GAME_STATE = {
                players: [],
                scores: []
            },
            gameState = DEFAULT_GAME_STATE;

        function getGameState(){
            return gameState;
        }

        function joinGame(playerData){
            var game = getGameState();

            addPlayerToGame(playerData);
        }

        function addPlayerToGame(playerData){
            var game = getGameState(),
                existingPlayersWithSameName = game.players.filter(function(player){
                    return player.name === playerData.name;
                });

            if (!existingPlayersWithSameName.length){
                game.players.push(playerData);
            }

            updateScoresData();
        }

        function getScoreByTeamName(teamName){
            var game = getGameState(),
                scores = game.scores;

            return scores.filter(function(score){
                return score.team === teamName;
            })[0];
        }

        function updateScoresData(){
            var game = getGameState(),
                players = game.players,
                scores = game.scores;

            players.forEach(function(player){
                var playersTeam = getScoreByTeamName(player.team);

                if(!playersTeam){
                    createScoreForTeam(player.team);
                }
            });
        }

        function goalScored(goalData){
            var game = getGameState(),
                scores = game.scores,
                teamThatScored = getScoreByTeamName(goalData.team) || createScoreForTeam(goalData.team);

            teamThatScored.score += goalData.count;
        }

        function createScoreForTeam(teamName){
            var game = getGameState(),
                scores = game.scores,
                score = {
                    team: teamName,
                    score: 0
                };

            scores.push(score);

            return score;
        }

        return {
            joinGame: joinGame,
            getGameState: getGameState,
            goal: goalScored
        };
    }

    return {
        getGame: function getGame(){
            if(!instance){
                instance = createGameInstance();
            }

            return instance;
        },
        resetGame: function resetGame(){
            instance = null;
        }
    };
})();