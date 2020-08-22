// jshint esversion:7

const admin = require(`./../models/admin.models`);

exports.registerAdmin = (req, res, next) => {
    bcrypt.hash(req.body.password, SALT_ROUNDS, (err, hash) => {
        admin.create({
            name: req.body.name,
            password: hash,
            contact: {
                phoneNumber: {type: String},
                email: {type: String},
            },
            authenticationToken: req.body.authenticationToken,
            accessLevel: req.body.accessLevel,
        }).then(() => {
            res.end(`Admin signed up`);
        }).catch((err) => {
            console.log(err);
            res.status(400).end(`Unable to create admin.`);
        });
    });
};

exports.adminLogin = (req, res, next) => {
    admin.findOne({contact: {email : req.body.email}}).then((admin) => {
        bcrypt.compare(req.body.password, admin.password, function(err, result) {
            if(err || !result){
                console.log(err);
                res.status(400).end();
                return;
            }else{
                // create view for admin login.
                // res.render(``);
                res.end(`Admin logged in`);
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(400).end();
    });
};
