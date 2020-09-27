// jshint esversion:7
// ================================ creating application routes ===================================//
module.exports = app => {
    const admin = require(`../controllers/admin.controllers`);

    // register admin account
    app.route(`/registerAdmin`)
        .post(admin.registerAdmin);

    // login to admin account
    app.route(`/adminLogin`)
        .post(admin.adminLogin);
        
    app.route(`/adminList/:status`)
        .get(admin.adminList);
};