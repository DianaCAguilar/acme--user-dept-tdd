const { expect } = require('chai')
const db = require('./db')
const { User, Department } = db.models


describe('User Dept TDD', () => {
    let seed
    beforeEach(async() => seed = await db.syncAndSeed())
    describe('Seeded Data', () => {
        it('there are 3 users', () => {
            expect(seed.users.length).to.equal(3)
        })
        it('Dennis is in the Accounting dept', async() => {
            const dennis = await User.findOne({where: {name: 'Dennis'}, include: [Department]})
        })
    })
})
