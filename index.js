const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
 
// set up express app
const app = express();
app.use(cors());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//connect to mongodb
//mongoose.connect('mongodb://localhost/ninjago')
mongoose.connect("mongodb://localhost:27017/ninjago", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//initialize routes
app.use(routes);

app.get('/',function(req,res){
    console.log('GET request');
    res.send({"name":"ashi"});

})
//listen for requests
app.listen(4000,function(){
console.log('listening on port 4000');
});