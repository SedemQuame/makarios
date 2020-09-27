// jshint esversion:6 
// ================================ creating application routes ===================================//
module.exports = app => {
    const book = require(`../controllers/book.controllers`);
    // create book meta data
    app.route(`/uploadBook`)
        .post(book.upload);

    app.route(`/upload/:status`)
        .get(book.uploadStatus);

    //  view book meta data
    app.route(`/viewAllBookMetaData`)
        .get(book.viewAllBookMetaData);

    app.route(`/viewBookData/:bookId`)
        .get(book.viewBookData);

    // delete all books
    app.route(`/deleteAllBook`)
        .post(book.deleteAllBooks);

    // delete book by id
    app.route(`/deleteBook/:bookId`)
        .post(book.deleteBook);

    // // upload book data (todo)
    // app.route(`/changeBookMetaData/:bookId`)
    //     .post(book.changeBookMetaData);        
};