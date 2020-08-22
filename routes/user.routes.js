// jshint esversion:6 
// ================================ creating application routes ===================================//

module.exports = app => {
    const user = require(`../controllers/user.controllers`);

    // create routes
    app.route(`/createUserInfo`)
        .get(user.createUser);

    app.route(`/getAllUserSubscriptions`)
        .get(user.getAllUserSubscriptions);

    app.route(`/getAllBookSubscription/:userId`)
        .get(user.getAllBookSubscription);
        
    app.route(`/subscripeToReadBook/:userId/:bookId/:payment_method/:reference`)
        .get(user.subscripeToReadBook);
};