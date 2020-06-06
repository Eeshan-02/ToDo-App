var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb+srv://eeshan:12345@mytest-fqecb.mongodb.net/ToDo?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true, }, () => console.log("connected"));


var todoSchema = new mongoose.Schema({
    item: String
});

//create Model
var Todo = mongoose.model('Todo', todoSchema);



var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
    app.get('/todo',function(req, res){    
            Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo' , {todos: data});    
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
            newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req, res){
            Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });
};