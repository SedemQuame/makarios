//jshint esversion:7
// ===================================== requiring node modules ===================================== //
const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

// ==================================== creating database schema=======================================//

// =========== sub schemas =========/
const contactSchema = new mongoose.Schema({
    email: {type: String},
    phoneNumber: {type: String},
});

const adminSchema = new mongoose.Schema({
    name: {type: String},
    password: {type: String},
    contact: {type: contactSchema},
    authenticationToken: {type: String},
    accessLevel: {type: String},
});

adminSchema.plugin(passportLocalMongoose);
// ==================================== creating schema model =========================================//
module.exports = mongoose.model(`admin`, adminSchema);