//jshint esversion:7
// ===================================== requiring node modules ===================================== //
const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

// ==================================== creating database schema=======================================//

// =========== sub schemas =========/

const adminSchema = new mongoose.Schema({
    name: {type: String},
    password: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    authenticationToken: {type: String},
    accessLevel: {type: String},
    booksUploaded: [{type: String}],
});

adminSchema.plugin(passportLocalMongoose);
// ==================================== creating schema model =========================================//
module.exports = mongoose.model(`admin`, adminSchema);