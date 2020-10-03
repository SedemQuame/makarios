// jshint esversion:7
// ===================== node modules ======================
const spawn = require("spawn-password");

const book = require(`./../models/book.models`);

exports.upload = (req, res, next) => {
    let spawned_password = spawn.spawn();

    book.create({
        isbnNumber: req.body.isbn,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        edition: req.body.edition,
        format: "",
        category: req.body.categories,
        keywords: req.body.keywords,
        numberOfPages: "",
        supportedLanguages: [],
        bookDetails: {
            url: "",
            coverPhoto: "",
        },
        feedback: [],
        username: spawned_password,
    }).then(doc => {
        res.redirect(`/upload/success`);
    }).catch(err => {
        res.redirect(`/upload/failed`);
    });
};

exports.uploadStatus = (req, res, next) => {
    let status = req.params.status;
    if(status == "success"){
        res.render(__dirname + '/../views/bookList.views.ejs', {
            message: `Uploaded book successfully.`,
        });
    }else{
        res.render(__dirname + '/../views/bookList.views.ejs', {
            message: `Unable to upload book.`,
        });
    }
};

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

exports.getBookList = (req, res, next) => {
    book.find().then(list => {
        console.log(list);
        res.render(__dirname + `./../views/bookList.views.ejs`, {bookDocs: list});
    }).catch(err => {
        res.render(__dirname + `./../views/bookList.views.ejs`, {bookDocs: null});
    });
};