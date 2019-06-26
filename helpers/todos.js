var todos=require("../models");
exports.getTodos=function(req,res){
    todos.find()
    .then(function(todo){
        res.send(todo);
    })
    .catch(function(err){
        res.send(err);
    })
};
exports.createTodo=function(req,res){
    todos.create(req.body)
    .then(function(newtodo){
        res.status(201).send(newtodo); //sends along with status 201
    })
    .catch(function(err){
        res.send(err);
    })
};
exports.getTodo = function(req,res){
    todos.findById(req.params.todoId)
    .then(function(foundtodo){
        res.send(foundtodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTodo =function(req,res){
   todos.findOneAndUpdate({_id:req.params.todoId},req.body,{new:true}) //new:true responds with updated todo not previous one
   .then(function(todo){
       res.send(todo);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteTodo = function(req,res){
    todos.remove({_id:req.params.todoId})
    .then(function(){
       res.send({message:"deleted"});
   })
   .catch(function(err){
       res.send(err);
   })
}


module.exports=exports;