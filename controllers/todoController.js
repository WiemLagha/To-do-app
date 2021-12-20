var bodyParser = require('body-parser');
var mongoose= require('mongoose');

var data=[{item:'IA project'} , {item:'DS project'} , {item:'bla bla bla'}];

var urlencodedParser= bodyParser.urlencoded({extended: false});

//Connect too the database
mongoose.connect('mongodb://localhost:27017/todoapp');

//Create a schema - this is like a blueprint
var todoSchema= new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


module.exports= function(app){

    app.get('/todo', function(req,res){

        //get data from the database and pass it to the view
        Todo.find({}, function(err,data){
            if(err) throw err;
            res.render('todo', {todos: data});
        })

    });

    app.post('/todo', function(req,res){

        //get data from the view and add it to the db
        var newTodo= Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
        

    });

    app.delete('/todo/:item', function(req,res){
        //delete the requested item from the db
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
    });

};