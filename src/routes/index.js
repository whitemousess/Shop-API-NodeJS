const petsRouter = require('./pets')

function route(app) {
    app.use('/pet', petsRouter)
}

module.exports = route;