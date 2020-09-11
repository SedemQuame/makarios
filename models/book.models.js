//jshint esversion:7
// ===================================== requiring node modules ===================================== //
const mongoose = require(`mongoose`);
const passportLocalMongoose = require(`passport-local-mongoose`);

// ==================================== creating database schema=======================================//

// =========== sub schemas =========/
const book = new mongoose.Schema({
    url: {type: String},
    coverPhoto: {type: String},
});

const date = new mongoose.Schema({
    created: {type: String},
    modified: {type: String},
    published: {type: String},
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
    format: {type: String},
    category: {type: String},
    keywords: {type: String},
    numberOfPages: {type: Number},
    // about: {type: String},
    supportedLanguages: [{type: String}],
    book,
    date,
    feedback: [feedback],
});

bookSchema.plugin(passportLocalMongoose);
// ==================================== creating schema model =========================================//
module.exports = mongoose.model(`book`, bookSchema);