const express = require('express')
const consolidate = require("consolidate");
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', require('./route/admin')())

app.set("engine view", "html");
app.set("views", "./template");
app.engine("html", consolidate.ejs);

app.listen(5000)