// jshint esversion:6 
// ================================ creating application routes ===================================//
module.exports = app => {
    const book = require(`../controllers/book.controllers`);
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

    // upload book routes (todo)
    // app.route(`/uploadBookMetaData/:bookId`)
    //     .post(book.uploadBookMetaData);        
};