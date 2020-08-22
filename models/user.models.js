//jshint esversion:7
// ===================================== requiring node modules ===================================== //
const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

// ==================================== creating database schema=======================================//

// =========== sub schemas =========/
const subscriptions = new mongoose.Schema({
    item_id : {type: String},
    subscription_date: {type: Date, default: Date.now},
    payment_method: {type: String},
    payment_reference: {type: String},
});

const contactSchema = new mongoose.Schema({
    email: {type: String},
    phone: {type: String},
});

const userSchema = new mongoose.Schema({
    name: {type: String},
    contact: contactSchema,
    authenticationToken: {type: String},
    subscriptions: [subscriptions],
});

userSchema.plugin(passportLocalMongoose);
// ==================================== creating schema model =========================================//
module.exports = mongoose.model(`user`, userSchema);