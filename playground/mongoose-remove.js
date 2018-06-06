const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({})

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findByIdAndRemove('5b17341ec00d218cb8db3490').then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5b17341ec00d218cb8db3491').then((todo) => {
    console.log(todo);
});