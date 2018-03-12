import Game from 'state/Game';

const GAME_SIZE = 8;
const ADD_PLAYER_EVENT = 'addPlayer';
const START_GAME_EVENT = 'startGame';
const MARK_LEFT_LINE_EVENT = 'markLeftLine';
const MARK_TOP_LINE_EVENT = 'markTopLine';

export default class DistributedGame {
    static create(connection, gameId, onNextGame) {
        const initialGame = Game.create(GAME_SIZE, GAME_SIZE);
        const distributedGame = new DistributedGame(connection, gameId, initialGame, onNextGame);
        connection.listen(gameId, distributedGame.onGameEvents.bind(distributedGame));

        return distributedGame;
    }

    constructor(connection, gameId, game, onNextGame) {
        this._connection = connection;
        this._gameId = gameId;
        this._game = game;
        this._onNextGame = onNextGame;
        this._eventIndex = 0;
    }

    gameId() {
        return this._gameId;
    }

    userId() {
        return this._connection.userId();
    }

    addPlayer(playerName) {
        if(this._game.addPlayer(this._connection.userId(), playerName) !== null) {
            this._connection.addEvent(
                this._gameId,
                {
                    eventType: ADD_PLAYER_EVENT,
                    playerName: playerName,
                    playerId: this._connection.userId()
                }
            );
        }
    }

    startGame() {
        if(this._game.start() !== null) {
            this._connection.addEvent(
                this._gameId,
                {
                    eventType: START_GAME_EVENT
                }
            );
        }
    }

    markLeftLine(x, y) {
        if(this._game.markLeftLine(x, y) !== null) {
            this._connection.addEvent(
                this._gameId,
                {
                    eventType: MARK_LEFT_LINE_EVENT,
                    x: x,
                    y: y
                }
            );
        }
    }

    markTopLine(x, y) {
        if(this._game.markTopLine(x, y) !== null) {
            this._connection.addEvent(
                this._gameId,
                {
                    eventType: MARK_TOP_LINE_EVENT,
                    x: x,
                    y: y
                }
            );
        }
    }

    onGameEvents(events) {
        while(this._eventIndex < events.length) {
            const event = events[this._eventIndex];
            const nextGame = this._nextGame(event);
            if(nextGame) {
                this._game = nextGame;
                this._onNextGame(this._game);
            } else {
                console.log('Skipping invalid game event: ' + event);
            }
            this._eventIndex++;
        }
    }

    _nextGame(event) {
        if(event.eventType === ADD_PLAYER_EVENT) {
            return this._processAddPlayerEvent(event);
        }
        if(event.eventType === START_GAME_EVENT) {
            return this._processStartGameEvent(event);
        }
        if(event.eventType === MARK_LEFT_LINE_EVENT) {
            return this._processMarkLeftLineEvent(event);
        }
        if(event.eventType === MARK_TOP_LINE_EVENT) {
            return this._processMarkTopLineEvent(event);
        }
        return null;
    }

    _processAddPlayerEvent(event) {
        return this._game.addPlayer(event.playerId, event.playerName);
    }

    _processStartGameEvent(event) {
        return this._game.start();
    }

    _processMarkLeftLineEvent(event) {
        return this._game.markLeftLine(event.x, event.y);
    }

    _processMarkTopLineEvent(event) {
        return this._game.markTopLine(event.x, event.y);
    }
}
