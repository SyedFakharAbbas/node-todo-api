// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var user = {name: 'andrew', age: 25};

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if ( err) {
        return console.log(`Unable to connect MonogDb Severv ${err}`);
    }
    console.log(`Connected to MongoDb Server`);
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b0dde8294a09bc6cfdc3e1c')
    //     }).toArray().then((docs) => {
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fethc todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //         console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fethc todos', err);
    // });

    db.collection('Users').find({
        name: 'Syed Fakhar Abbas'
        }).toArray().then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fethc todos', err);
    });

    client.close();
});
