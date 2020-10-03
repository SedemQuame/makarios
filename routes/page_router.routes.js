// jshint esversion:6 
// ================================ node modules ===================================//
const path = require(`path`);
// ================================ creating application routes ===================================//
module.exports = app => {
    const user = require(`../controllers/user.controllers`);

    // create GET routes
    app.get(`/forgotPassword`, (req, res) => {
        res.render(path.resolve(__dirname, `./../views/reset_password.views.ejs`))
    });

    app.get(`/dashboard`, (req, res) => {
        res.render(path.resolve(__dirname, `./../views/dashboard.views.ejs`))
    });

    app.get(`/adminData`, (req, res) => {
        res.render(path.resolve(__dirname, `./../views/adminData.views.ejs`), {
            message: null,
            adminDocs: null,
            accessLevel: null,
            adminInfo: null
        })
    });

    app.get(`/bookAnalytics`, (req, res) => {
        res.render(path.resolve(__dirname, `./../views/bookAnalytics.views.ejs`))
    });

};