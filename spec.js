const { expect } = require('chai')
const db = require('./db')


describe('User Dept TDD', () => {
    let seed
    beforeEach(async() => seed = await db.syncAndSeed())
    describe('Seeded Data', () => {
        it('there are 3 users', () => {
            expect(seed.users.length).to.equal(3)
        })
    })
})
