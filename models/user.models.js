//jshint esversion:7
// ===================================== requiring node modules ===================================== //
const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

// ==================================== creating database schema=======================================//

// =========== sub schemas =========/
const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    authenticationToken: {type: String},
});

userSchema.plugin(passportLocalMongoose);
// ==================================== creating schema model =========================================//
module.exports = mongoose.model(`user`, userSchema);