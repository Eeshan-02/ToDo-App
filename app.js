var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

//set template


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

todoController(app);


app.use(express.static('./public'));


app.listen(3000);
console.log("okay");