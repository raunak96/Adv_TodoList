var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/todo-api', { useNewUrlParser: true });

mongoose.Promise = Promise; //to use async func like .then .catch

module.exports = require("./todo");