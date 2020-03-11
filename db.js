const Sequelize = require('sequelize')
const { STRING, UUID, UUIDV4 } = Sequelize
const pg = require('pg')
const connection = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_user_dept_db', {logging: false})

const nameDefinition = {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
        notEmpty: true
    }
}
const uuidDefinition = {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
}

const User = connection.define('user', {
    name: nameDefinition,
    id: uuidDefinition
})
const Department = connection.define('department', {
    name: nameDefinition,
    id: uuidDefinition
})

User.belongsTo(Department)

const syncAndSeed = async() => {
    await connection.sync({force: true})

    const [accounting, hr, engineering] = await Promise.all([
        Department.create({name: 'Accounting'}),
        Department.create({name: 'HR'}),
        Department.create({name: 'Engineering'}),
    ])
    const [dennis, diana, peet] = await Promise.all([
        User.create({name: 'Dennis', departmentId: accounting.id}),
        User.create({name: 'Diana', departmentId: hr.id}),
        User.create({name: 'Peet', departmentId: engineering.id}),
    ])
    
    const users = await User.findAll()

    return {
        users
    }
}
module.exports = {
    syncAndSeed,
    models: {
        User,
        Department
    }
}