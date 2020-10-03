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

    //display admin page
    app.get(`/adminList`, admin.getAdminList);
        
    app.route(`/adminList/:status`)
        .get(admin.adminList);
};