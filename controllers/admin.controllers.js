// jshint esversion:7
// ===================== node modules ======================
const bcrypt = require('bcrypt');
const spawn = require("spawn-password");
const SALT_ROUNDS = 9;
// =================== custom modules ======================
const route = require(`../models/admin.models`);
const { DocumentProvider } = require('mongoose');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const admin = require(`./../models/admin.models`);

exports.registerAdmin = (req, res, next) => {
    let spawned_password = spawn.spawn();
    console.log(spawned_password);
    bcrypt.hash(spawned_password, SALT_ROUNDS, (err, hash) => {
        if(err){
            res.render(__dirname + '/../views/adminList.views.ejs', {
                message: `Unable to create admin account.`,
            });
            return;
        }
        admin.create({
            name: req.body.adminName,
            password: hash,
            email: req.body.adminEmail,
            phoneNumber: req.body.adminPhone,
            authenticationToken: req.body.authenticationToken,
            accessLevel: req.body.accessLevel,
            username: spawn.spawn(),
        }).then((doc) => {
            res.redirect(`/adminList/success`);
        }).catch((err) => {
            res.redirect(`/adminList/failed`);
        });
    });
};

exports.adminLogin = (req, res, next) => {
    admin.findOne({email : req.body.adminEmail}).then((admin) => {
        console.log(admin);
        bcrypt.compare(req.body.adminPassword, admin.password, (err, result) => {
            console.log(err);
            console.log(result);
            if(err){
                res.render(`${__dirname}/../views/index.views.ejs`, {
                    message: `Server side error. Please try again later`,
                    admin: null,
                    accessLevel: null,
                    adminInfo: null,
                });
                // return;
            }
            if(result){
                // store info in sessions
                req.session.admin = admin;
                res.render(__dirname + '/../views/dashboard.views.ejs', {
                    message: null,
                    admin,
                    accessLevel: (req.session.admin).accessLevel,
                    adminInfo: req.session.admin,
                });
            }else{
                res.render(`${__dirname}/../views/index.views.ejs`, {
                    message: `Incorrect admin credentials.`,
                    admin: null,
                    accessLevel: null,
                    adminInfo: null,
                });
            }
        });
    }).catch((err) => {
        // Change action to handle error gracefully.
        res.render(__dirname + '/../views/index.views.ejs', {
            message: `Unable to authenticate user.`,
            adminDocs: null,
            accessLevel: null,
            adminInfo: null,
        });
    });
};

exports.adminList = (req, res, next) => {
    let status = req.params.status;
    if(status == "success"){
        admin.find().then(list => {
            res.render(__dirname + `/../views/adminList.views.ejs`, {
                message: `Created admin account successfully.`,
                adminDocs: list,
                accessLevel: null,
                adminInfo: null
            });
        }).catch(err => {
            res.render(__dirname + `./../views/bookList.views.ejs`, {
                message: `Unable to create admin account.`,
                adminDocs: [],
                accessLevel: null,
                adminInfo: null
            });
        });
    }else{
        res.render(__dirname + '/../views/adminList.views.ejs', {
            message: `Unable to create admin account.`,
            adminDocs: null,
            accessLevel: null,
            adminInfo: null,
        });
    }
};

exports.getAdminList = (req, res) => {
    admin.find().then(list => {
        console.log(list);
        admin.find().then(list => {
            res.render(__dirname + `/../views/adminList.views.ejs`, {
                message: null,
                adminDocs: list,
                accessLevel: null,
                adminInfo: null
            });
        }).catch(err => {
            res.render(__dirname + `./../views/bookList.views.ejs`, {
                message: null,
                adminDocs: [],
                accessLevel: null,
                adminInfo: null
            });
        });
    }).catch(err => {
        res.render(__dirname + `/../views/adminList.views.ejs`, {
            message: `Could not return user data.`,
            adminDocs: [],
            accessLevel: null,
            adminInfo: null
        });
    });
};