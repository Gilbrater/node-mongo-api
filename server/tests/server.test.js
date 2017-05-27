const {
    ObjectID
} = require('mongodb');
const expect = require('expect');
const request = require('supertest');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todos');


const todos = [{
    _id: new ObjectID(),
    text: "first todo"
}, {
    _id: new ObjectID(),
    text: "second todo"
}];

beforeEach((done) => {
    Todo.remove({}).then((doc) => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    }).catch(err => {
        done(err);
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({
                    text
                }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it("should return a 404 for a valid id that doesn't exist", (done) => {
        request(app)
            .get('/todos/6928029512de570b32f8b308')
            .expect(404)
            .end(done);
    });

    it("should return a 404 for an invalid id", (done) => {
        request(app)
            .get('/todos/1234')
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    })

    it("should return a todo doc", (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe('DELETE /todos/:id', () => {
    it("should remove a todo", (done) => {
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((rez) => {
                expect(rez.body.todo.text).toBe(todos[0].text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(todos[0]._id.toHexString()).then((res)=>{
                    expect(res).toNotExist();
                    done();
                });
                
            });
    });

    it("should return 404 if todo is not found", (done) => {
        request(app)
            .delete(`/todos/6928029512de570b32f8b308`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });

    it("should  return 404 if object id is invalid", (done) => {
        request(app)
            .delete(`/todos/e570b32f8b308`)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
});

describe("PATCH /todos/:id", ()=>{
    it("should update the todo", (done)=>{
        var id = todos[0]._id.toHexString();
        var text = "Home Sweet Home";
        request(app)
        .patch(`/todos/${id}`)
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            
            Todo.findById(id).then((todo)=>{
                expect(todo.text).toBe("Home Sweet Home");
                expect(todo.completed).toBe(false);
                expect(todo).toExist();
                done();
            }).catch((err)=>done(err));
        });
    });
    
    it("should clear completedAt when todo in not completed", (done)=>{
        var id = todos[0]._id.toHexString();
        var text = "Home Sweet Home";
        request(app)
        .patch(`/todos/${id}`)
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            
            Todo.findById(id).then((todo)=>{
                expect(todo.text).toBe("Home Sweet Home");
                expect(todo.completed).toBe(false);
                expect(todo).toExist();
                done();
            }).catch((err)=>done(err));
        });
    });
});
