// requiring node modules
// jshint esversion: 7
// ========================================== node packages  ========================================== //
const express = require(`express`);
const http = require(`http`);
const bodyParser = require(`body-parser`);
const path = require(`path`);
const dotenv = require(`dotenv`);
const mongoose = require(`mongoose`);

// ========================================== configure environment variables  ========================================== //
if(process.env.PRODUCTION_MODE){
    const result = dotenv.config({path: `./config/.env`});
    if (result.error) {
        throw result.error;
    }
}

// ========================================== custom packages  ========================================== //
const db = require(`./config/db.config`);

// ========================================== create express middleware  ========================================== //
const app = express();

// ====================================== db configurations ========================================= //
mongoose.Promise = global.Promise;
const connectDB = async () => {
    await mongoose.connect(db.url, db.options).then(() => {
        console.log(`DB Connected....`);
    }).catch((err)=>{
        console.log(`Connection timed out.`);
        console.log(`Err: ${err}`);
    });
};
connectDB();

// ========================================== app routes ============================================ //
app.all(`/`, (req, res)=>{
    res.end(`Makarios homepage`);
});

// handling requests
app.use((req, res)=>{
    res.end(`Welcome to makarios`);
});

// spinning up a server
const server = http.createServer(app);
const port = process.env.PORT || process.env.MAKARIOS_PORT;
server.listen(port, () => {
    console.log(`Application started on port ${port}`);
    console.log(`localhost:${port}`);
});


