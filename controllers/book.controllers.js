// jshint esversion:7

const book = require(`./../models/book.models`);

exports.viewAllBookMetaData = (req, res, next) => {
    const fieldsOfInterest = `isbnNumber title book`;
    book.find({}, fieldsOfInterest).then(books => {
         res.status(200).send({
            status: `success`,
            books: books
         });
    }).catch(err => {
        res.status(400).send({
            status: `error`,
            books: []
         });
    });
};

exports.viewBookData = (req, res, next) => {
    book.find({_id: req.params.bookId}).then(book => {
         res.status(200).send({
            status: `success`,
            book: book
         });
    }).catch(err => {
        res.status(400).send({
            status: `error`,
            book: []
         });
    });
};

exports.deleteAllBooks = (req, res, next) => {
    book.deleteMany({}).then(() => {
        res.status(200).send({
            status: `success`,
            msg: `Deleted all books`
         });
    }).catch(err => {
        res.status(400).send({
            status: `error`,
            msg: `Unable to delete all books`
         });
    });
};

exports.deleteBook = (req, res, next) => {
    book.findByIdAndDelete(req.params.bookId).then(() => {
        res.status(200).send({
            status: `success`,
            msg: `Book deleted successfully`
         });
    }).catch(err => {
        res.status(400).send({
            status: `Error`,
            msg: `Unable to delete book`
         });
    });
};

// exports.uploadBookMetaData = (req, res, next) => {

// };