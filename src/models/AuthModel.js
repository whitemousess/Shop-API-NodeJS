const mongoose = require('mongoose')
const schema = mongoose.Schema;

const auth = new schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    roles: {type: Number},
    avatar: {type: String}
},
{
    timestamps: true,
})

module.exports = mongoose.model("accounts", auth);
