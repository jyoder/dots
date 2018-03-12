import FirebaseIdGenerator from 'network/FirebaseIdGenerator';

describe('nextId', () => {
    it('pushes a new entry into the games ref and returns the key', () => {
        const ref = jest.fn(() => ({
            push: () => ({
                key: 'penguins'
            })
        }));
        const database = { ref: ref };

        const idGenerator = new FirebaseIdGenerator(database);
        expect(idGenerator.nextId()).toBe('penguins');
        expect(ref).toHaveBeenLastCalledWith('games');
    });
});
