const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test to do text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err)
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    });
});
describe('GET /todos', () => {

    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect( res.body.todos.length).toBe(2);
            }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should get todo by id', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if non object ids', (done) => {
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .expect((res) => {
            console.log(res.body);
        })
        .end(done);
    });
});

describe('Delete /todos/:id', () => {

    it('should should remove todo', ( done ) => {
        var hex = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hex}`)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(hex);
            // console.log(res.body);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.findById(hex).then((todo) => {
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));

        })
    });

    it('should return 404 if todo not found', ( done ) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if id is invalid', ( done ) => {
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });

});

describe('PATH /todos:id', () => {

    it('it should update the todo', ( done ) => {
        // grab id of first item
        var hex = todos[0]._id.toHexString();
        var text = 'THis should be the new text'
        request(app)
        .patch(`/todos/${hex}`)
        .send({
            text,
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeTruthy();
        })
        .end(done);
    });

    it('it should update clear completedAT when the todo is not completed', ( done ) => {
        var hex = todos[1]._id.toHexString();
        var text = 'THis should be the new text'
        request(app)
        .patch(`/todos/${hex}`)
        .send({
            text,
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeNull();
        })
        .end(done);
    });
});