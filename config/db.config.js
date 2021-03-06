// jshint esversion: 7
// const dotenv = require('dotenv');
module.exports = {
    url: `mongodb+srv://MakariosAdmin:${process.env.MAKARIOS_DB_PASSWORD}@makarioscluster.jzd1f.mongodb.net/makarios?retryWrites=true&w=majority`,
    url_development: `mongodb://localhost/makarios`,
    options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
};
