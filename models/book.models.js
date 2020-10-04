//jshint esversion:7
// ===================================== requiring node modules ===================================== //
const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

// ==================================== creating database schema=======================================//

// =========== sub schemas =========/
const bookDetails = new mongoose.Schema({
    url: {type: String},
    coverPhoto: {type: String},
    numberOfPages: {type: Number},
    format: {type: String}
});

const date = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    modified: {type: String},
    published: {type: String}
});

const feedback = new mongoose.Schema({
    rating: {type: String},
    reviews: {type: String},
    comments:{}
});

const bookSchema = new mongoose.Schema({
    isbnNumber: {type: String},
    title: {type: String},
    author: {type: String},
    description: {type: String},
    edition: {type: String},
    category: {type: String},
    keywords: {type: String},
    supportedLanguages: [{type: String}],
    bookDetails,
    date,
    feedback: [feedback]
});

bookSchema.plugin(passportLocalMongoose);
// ==================================== creating schema model =========================================//
module.exports = mongoose.model(`book`, bookSchema);