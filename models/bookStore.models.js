//jshint esversion:7
// ===================================== requiring node modules ===================================== //
const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

// ==================================== creating database schema=======================================//

// =========== sub schemas =========/
const storeSchema = new mongoose.Schema({
    name: {type: String},
    acceptedCurrencies: [{type: String}],
    paymentDetails: {type: String},
    storeOwner: {type: Schema.Types.ObjectId},
    storeAdmins: {type: Schema.Types.ObjectId},
});

storeSchema.plugin(passportLocalMongoose);
// ==================================== creating schema model =========================================//
module.exports = mongoose.model(`store`, storeSchema);