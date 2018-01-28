import Player from './Player';

test('constructor initializes playerId, playerName, and color', () => {
    const player = new Player(1, 'Gordon', 'red');
    
    expect(player.playerId()).toBe(1);
    expect(player.playerName()).toBe('Gordon');
    expect(player.color()).toBe('red');
});
