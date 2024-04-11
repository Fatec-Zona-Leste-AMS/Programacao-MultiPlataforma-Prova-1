const db = require("../config/database")

const Schedules = db.sequelize.define('schedules', {
    name: {
        type: db.Sequelize.STRING
    },
    address: {
        type: db.Sequelize.STRING
    },
    neighborhood: {
        type: db.Sequelize.STRING
    },
    zipcode: {
        type: db.Sequelize.STRING
    },
    city: {
        type: db.Sequelize.STRING
    },
    state: {
        type: db.Sequelize.STRING
    }
})

try {
    Schedules.sync({
        force: true
    })   
} catch (err) {
    Schedules.sync({
        force: false
    })
}

module.exports = Schedules