const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb+srv://chuotbach:Tnt%402002@chuotbach.36qa5fh.mongodb.net/pets');
        console.log("connection successfully");
    } catch (error) {
        console.log("connection error", error);
    }

}


module.exports = {connect};