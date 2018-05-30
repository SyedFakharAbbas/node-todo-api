// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var user = {name: 'andrew', age: 25};

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if ( err) {
        return console.log(`Unable to connect MonogDb Severv ${err}`);
    }
    console.log(`Connected to MongoDb Server`);
    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });
    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });
    // FindOneAndDelete
        db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
            console.log(result);
        });

    client.close();
});
