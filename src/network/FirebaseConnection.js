export default class FirebaseConnection {
    static create(firebase) {
        return firebase.auth().signInAnonymously().then((user) => {
            return new FirebaseConnection(firebase.database(), user.uid);
        }).catch((error) => {
            console.log(error);
        });
    }

    constructor(firebaseDatabase, userId) {
        this._firebaseDatabase = firebaseDatabase;
        this._userId = userId;
    }

    userId() {
        return this._userId;
    }

    listen(gameId, onGameEvents) {
        this._eventsRef(gameId).off();
        this._eventsRef(gameId).on('value', (snapshot) => {
            onGameEvents(Object.values(snapshot.val()));
        });
    }

    addEvent(gameId, event) {
        return this._eventsRef(gameId).push().set(event);
    }

    _eventsRef(gameId) {
        return this._firebaseDatabase.ref(`games/${gameId}/events`);
    }
}
