const petsRouter = require('./pets')
const accountRouter = require('./account')

function route(app) {
    app.use('/api/account', accountRouter)
    app.use('/api/pet', petsRouter)
    app.use('/', function(req, res, next){res.status(404).json({error: "Not found!"})})
}

module.exports = route;