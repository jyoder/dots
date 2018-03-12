import FirebaseConnection from 'network/FirebaseConnection';

describe('create', () => {
    it('begins signing into the firebase database anonymously', () => {
        const firebase = _firebase();
        const createConnection = FirebaseConnection.create(firebase);
        
        expect(createConnection).toBe('promise');
        expect(firebase.auth().signInAnonymously).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInAnonymously().then).toHaveBeenCalledTimes(1);
        expect(firebase.auth().signInAnonymously().then().catch).toHaveBeenCalledTimes(1);
    });
});

describe('userId', () => {
    it('returns the id of the user associated with the connection', () => {
        const connection = new FirebaseConnection(_database(), 'someId');
        expect(connection.userId()).toBe('someId');
    });
});

describe('listen', () => {
    it('clears previous listeners from the database ref', () => {
        const database = _database();
        const connection = new FirebaseConnection(database, 'userId');
    
        connection.listen('gameId', jest.fn());
        expect(database.ref().off).toHaveBeenCalledTimes(1);
    });

    it('installs a new listener which receives game events', () => {
        const database = _database();
        const connection = new FirebaseConnection(database, 'userId');
    
        const onGameEvents = jest.fn();
        connection.listen('gameId', onGameEvents);
        expect(database.ref).toHaveBeenLastCalledWith('games/gameId/events');   
        expect(database.ref().on).toHaveBeenCalledTimes(1);
        expect(database.ref().on.mock.calls[0][0]).toBe('value');
    
        const snapshot = { val: () => ['event1', 'event2'] };
        database.ref().on.mock.calls[0][1](snapshot);
        expect(onGameEvents).toHaveBeenCalledTimes(1);
        expect(onGameEvents).toHaveBeenCalledWith(['event1', 'event2']);
    });
});

describe('addEvent', () => {
    it('adds the specified event to the database for given game id', () => {
        const database = _database();
        const connection = new FirebaseConnection(database, 'userId');
        
        connection.addEvent('gameId', { eventType: 'playerBarfed' });
        expect(database.ref).toHaveBeenLastCalledWith('games/gameId/events');
        expect(database.ref().push).toHaveBeenCalledTimes(1);
        expect(database.ref().push().set).toHaveBeenCalledWith({ eventType: 'playerBarfed' });
    });
});

function _firebase() {
    const auth = _auth();
    const database = _database();

    return {
        auth: auth,
        database: database
    };
}

function _auth() {
    const catchFn = jest.fn(() => 'promise');
    const then = jest.fn(() => ({ catch: catchFn }));
    const signInAnonymously = jest.fn(() => ({ then: then }));
    return jest.fn(() => ({ signInAnonymously: signInAnonymously }));
}

function _database() {
    const set = jest.fn();
    const push = jest.fn(() => ({ set: set }));
    const on = jest.fn();
    const off = jest.fn();

    return {
        ref: jest.fn(() => ({
            push: push,
            on: on,
            off: off
        }))
    };
}
