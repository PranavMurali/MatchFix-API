const request = require('supertest');
const app = require('./app');

describe('Feature testing', () =>{

    it('GET /sport --> Welcome to MatchFix API',()=>{
        return request(app)
        .get('/sport')
        .expect(200)
    });

    it('GET /sport/all --> array of all sports entries',()=>{
        return request(app)
        .get('/sport/all')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    it('GET /sport/:id --> specific sport by ID',()=>{
        return request(app)
        .get('/sport/616213da85f4e08cb691d49d')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toBeInstanceOf(Object);
        });
    });

    it('GET /sport/user/:author --> array of all sport entries by author',()=>{
        return request(app)
        .get('/sport/user/Pranav')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    it('POST /sport --> sport entry based on given schema',()=>{
                return request(app)
        .post('/sport')
        .send({
            "name":"Hockey",
            "description":"Hockey is a sport in which two teams play against each other by trying to manoeuvre a ball or a puck into the opponent's goal using a hockey stick. There are many types of hockey such as bandy, field hockey, ice hockey and rink hockey.In most of the world, the term hockey by itself refers to field hockey, while in Canada, the United States, Russia and most of Eastern and Northern Europe, the term usually refers to ice hockey.[1]",
            "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kareby_IS-AIK%2C_13_mars_2015_32.jpg/250px-Kareby_IS-AIK%2C_13_mars_2015_32.jpg",
            "author":"Pranav"
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toBeInstanceOf(Object);
        });
    });

})

describe('Error Testing', () => {
    
    it('GET /sport/:id --> 500 if not found ',()=>{
        return request(app)
        .get('/sport/61620c')
        .expect(500)
        .expect('Content-Type', /json/)
    });

    it ('GET /sport/user/:author --> return empty array if author invalid',()=>{
        return request(app)
        .get('/sport/user/random')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).toBeInstanceOf(Array);
        });
    });

})
