const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b0f4531bb1a3e1aa8084bd8';
if( !ObjectID.isValid(id) ) {
    return console.log('ID not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(`Todos `, todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(`Todo ${todo}`);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found!');
//     }
//     console.log(`Todo By Id ${todo}`);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if(!user) {
        console.log(`User not found! ${user}`);
    }
    console.log(`User Found By ID ${user}`);
}).catch((e) => console.log(e));