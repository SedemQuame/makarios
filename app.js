// requiring node modules
// jshint esversion: 7
const express = require(`express`);
const http = require(`http`);
const bodyParser = require(`body-parser`);
const path = require(`path`)

// creating express middleware object and storing in app variable 
const app = express();

// handling requests
app.use((req, res)=>{
    res.end('Welcome to makarios');
});

// spinning up a server
const server = http.createServer(app);

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Application started on port ${port}`);
    console.log(`localhost:${port}`);
});


