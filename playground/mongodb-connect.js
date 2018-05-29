// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var user = {name: 'andrew', age: 25};

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if ( err) {
        return console.log(`Unable to connect MonogDb Severv ${err}`);
    }
    console.log(`Connected to MongoDb Server`);
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result ) => {
    //     if(err) {
    //         return console.log('Unable to insert todo.', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Syed Fakhar Abbas',
        age: 31,
        location: 'Auckland'
    }, (err, result ) => {
        if(err) {
            return console.log('Unable to insert todo.', err);
        }
        console.log(result.ops[0]);
    });
    client.close();
});
