/*global $*/
$(document).ready(function(){
  $.getJSON("/api/todos")   //as soon as DOM ready Get all todos GET Route
  .then(addTodos)
  
$("#todoInput").keypress(function(event){
    if(event.which==13)
        createTodo();
})
$(".list").on('click','li',function(){
    updateTodo($(this));  
});
$(".list").on('click','span',function(e){
    e.stopPropagation();    //span's click doesn't trigger parent(li in this case)
    removeTodo($(this).parent());
    
});


function addTodos(data){
    for(var i=0;i<data.length;i++)
    {
        addTodo(data[i]);
    }
};
function addTodo(todo){
    var newtodo=$("<li class='task'>"+todo.name+"<span><i class='fa fa-trash'></i></span></li>");
    newtodo.data("id",todo._id);
    newtodo.data("completed",todo.completed);
        if(todo.completed)
            newtodo.addClass("done");
        $(".list").append(newtodo);
}
function createTodo(){
    var inp=$("#todoInput").val();
    if(inp.length)
    {
        $.post("/api/todos",{name:inp})
        .then(function(newtodo){
            addTodo(newtodo);
            $("#todoInput").val("");
        })
        .catch(function(err){
            console.log(err);
        });
    }
};
function removeTodo(todo){
    var id=todo.data('id');
    $.ajax({
        method:'DELETE',
        url:"/api/todos/"+id
    })
    .then(function(){
        todo.fadeOut(500,function(){	//REMOVES THE PARENT OF SPAN WHICH IS LI,HENCE LI CONATINING THIS SPAN DELETED
		    todo.remove();						//NOW THIS IS THE ELEMENT INVOKING FADEOUT,HENCE PARENT() NOT NEEDED 
	    });
    })
    .catch(function(err){
        console.log(err);    
    });
}
function updateTodo(todo){
    var isdone=!todo.data('completed');
    var updatedData={completed:isdone};
    $.ajax({
        method:'PUT',
        url:'/api/todos/'+todo.data('id'),
        data:updatedData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed',isdone);
    })
    .catch(function(err){
        console.log(err);
    });
}

});