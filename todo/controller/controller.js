let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});
// Connect  to database
let mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:user@todo-proto-cafvd.mongodb.net/test?retryWrites=true');

let todoSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true}
  ,content: {type: String, required: false, unique: false}
  ,priority: {type: Number, required: true, unique: false}
  ,duedate: {type: Date, required: false, unique: false}
  ,iscomplete: {type: Boolean, required: true, unique: false}
});
let todo = mongoose.model('todo', todoSchema);
// todo 를 통해서 mongodb 의 데이터에 접근한다.
// 관련자료 : https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250
// Connect  to database end
// let data = [{item: 'get milk'}, {item: "walk"}, {item: 'kick some coding ass'}];

let id_modying = undefined;
module.exports = function(app)
{
  app.get('/todo', function(req, res){
    // get data from mongodb and pass it to view
    todo.find({}, function(err, data){
      if(err) res.status(404).json({error: 'data create error'});
      res.render("todo", {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    // get data from the view and add it to mongodb
    // console.log(req.body);
    console.log(id_modying);
    console.log(req.body.duedate);
    if(id_modying !== undefined){

      todo.findOne({_id: id_modying}, function(err, data){
          if(err) throw err;
          if(!data) return res.status(404).json({error: 'data not found'});

          // console.log(data);
          data.name = req.body.name;
          data.content = req.body.content;
          data.priority = req.body.priority;
          data.duedate = req.body.duedate;
          data.iscomplete = data.iscomplete;
          id_modying = undefined;
          // console.log(data);
          data.save(function(err, data){
            if(err) res.status(404).json({error: 'data save error'});
            res.json(data);
          });
      });
    }
    else{
      console.log("create");
      console.log(req.body.duedate);
      if(req.body.duedate < new Date().toISOString()){
        console.log("expired");
      }
      else{
        console.log("enough");
      }
      console.log(req.body.duedate);
      let newTodo = todo(req.body).save(function(err, data){
        if(err) throw err;

        // console.log("create");
        res.json(data);
      });
    };
  });
  app.delete('/todo/:name', function(req, res){
    // delete the requested item from mongodb
    let name = req.params.name;
    todo.findOne({name: name}, function(err, data){
        if(err) throw err;
        if(!data) return res.status(404).json({error: 'data not found'});

        id_modying = undefined;

        data.remove(function(err){
          if(err) throw error;
          res.json(data);
        });
    });
    // todo.find({name: req.params.name.replace(/\-/g, "")}).remove(function(err, data){
    //   if(err) throw err;
    //
    //   // console.log(req.params.name);
    //   res.json(data);
    // });
  });


  app.put('/todo/modify/:_id', function(req, res){
    // get data from mongodb and pass it to view
    id_modying = req.params._id;
    // console.log(id_modying);
    //
    // todo.findOne({_id: _id}, function(err, data){
    //     if(err) throw err;
    //     if(!data) return res.status(404).json({error: 'data not found'});
    //
    //     // console.log(data);
    //     data[key] = value;
    //     // console.log(data);
    //     data.save(function(err){
    //       if(err) res.status(404).json({error: 'data save error'});
    //       res.json(data);
    //     });
    // });
  });
  app.put('/todo/:_id/:key/:value', function(req, res){
    // get data from mongodb and pass it to view
    let _id = req.params._id;

    let key = req.params.key;
    let value = req.params.value;

    todo.findOne({_id: _id}, function(err, data){
        if(err) throw err;
        if(!data) return res.status(404).json({error: 'data not found'});

        // console.log(data);
        data[key] = value;
        // console.log(data);
        data.save(function(err){
          if(err) res.status(404).json({error: 'data save error'});
          res.json(data);
        });
    });
  });

  app.get('/todo/:name', function(req, res){
    let name = req.params.name;
    todo.findOne({name: name}, function(err, data){
        if(err) throw err;

        if(!data) return res.status(500).send({error: 'database failure'});

        // console.log(id_modying);
        // console.log(data);
        id_modying = data._id;
        console.log(id_modying);
        res.json(data);
    });
  });
}
