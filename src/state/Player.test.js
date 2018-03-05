import Player from 'state/Player';

describe('constructor', () => {
    it('initializes playerId, playerIndex, and playerName', () => {
        const player = new Player('someId', 0, 'Gordon');
    
        expect(player.playerId()).toBe('someId');
        expect(player.playerIndex()).toBe(0);
        expect(player.playerName()).toBe('Gordon');
    });
});
