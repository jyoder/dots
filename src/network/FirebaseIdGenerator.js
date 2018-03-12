export default class FirebaseIdGenerator {
    constructor(firebaseDatabase) {
        this._firebaseDatabase = firebaseDatabase;
    }

    nextId() {
        return this._firebaseDatabase.ref('games').push().key;
    }
}
