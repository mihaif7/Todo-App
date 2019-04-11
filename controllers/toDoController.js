var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the db
mongoose.connect("mongodb+srv://test:test@todo-cpca8.mongodb.net/test?retryWrites=true");

//Create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = new mongoose.model('Todo', todoSchema);

var data = [{
    item: 'get milk'
}, {
    item: 'walk dog'
}, {
    item: 'kick some coding ass'
}];

var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

module.exports = function (app) {

    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {
                todos: data
            });
        });
    });


    app.post('/todo', urlencodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
};