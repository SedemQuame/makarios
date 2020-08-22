// jshint esversion:7

const user = require(`./../models/user.models`);

exports.createUser = (req, res, next) => {
    let token = ;
    user.create({
        name: req.body.name,
        contact: {
            email: req.body.email || '',
            phone: req.body.phone || '',
        },
        authenticationToken: token
    }).then(() => {
        res.status(200).send({
            status: `success`,
            authenticationToken: token,
        });
    }).catch(() => {
        res.status(400).send({
            status: `error`,
            authenticationToken: null,
        });      
    });
};

exports.getAllUserSubscriptions = (req, res, next) => {
    const fieldString = `_id name email subscriptions`;
    user.find({}, fieldString).then(users => {
        res.status(200).send(users);
    }).catch(err => {
        console.log(err);
        res.status(400).end();
    });
};

exports.getAllBookSubscription = (req, res, next) => {
    user.find({_id: req.params.userId}).then(user => {
        res.status(200).send(user.subscriptions);
    }).catch(err => {
        console.log(err);
        res.status(400).end();
    });
};

exports.subscripeToReadBook = (req, res, next) => {
    user.findByIdAndUpdate(req.params.userId,
    {
        $push: {
            subscriptions: {
                item_id : req.params.bookId,
                payment_method: req.params.payment_method,
                payment_reference: req.params.reference
            }
        }
    }).then(() => {
        res.statu(200).send({
            status: `success`,
            err: null,
        });
    }).catch((err) => {
        res.statu(400).send({
            status: `error`,
            err
        });
    });
};