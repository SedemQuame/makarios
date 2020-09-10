// requiring node modules
// jshint esversion: 7
// ========================================== node packages  ========================================== //
const express = require(`express`);
const http = require(`http`);
const bodyParser = require(`body-parser`);
const path = require(`path`);
const dotenv = require(`dotenv`);
const mongoose = require(`mongoose`);
const reload = require(`reload`);

// ========================================== configure environment variables  ========================================== //
if(!process.env.MODE){
    const result = dotenv.config({path: `./config/.env`});
    if (result.error) {
        throw result.error;
    }
}

// ========================================== custom packages  ========================================== //
const db = require(`./config/db.config`);

// ========================================== create express middleware  ========================================== //
const app = express();
// set view engine to ejs
app.set("view engine", "ejs");
// set up static file middleware
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

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
    res.render(`index.views.ejs`);
});

//====================================== registering required routes ========================================//
require(`./routes/admin.routes`)(app);
require(`./routes/book.routes`)(app);
require(`./routes/bookStore.routes`)(app);
require(`./routes/user.routes`)(app);
require(`./routes/page_router.routes`)(app);

// handling requests
app.use((req, res)=>{
    res.end(`Welcome to makarios`);
});

// spinning up a server
const server = http.createServer(app);
const port = process.env.PORT || process.env.MAKARIOS_PORT;

// Reload code here
reload(app).then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README
   
    // Reload started, start web server
    server.listen(port, () => {
        console.log(`Application started on port ${port}`);
        console.log(`http://localhost:${port}/`);
    });
}).catch(function (err) {
console.error('Reload could not start, could not start server/sample app', err)
});