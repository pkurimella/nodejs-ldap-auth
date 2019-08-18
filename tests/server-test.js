let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

/*
* Test the /POST route
*/
describe('/POST loginandreturnuser', () => {
    it('it should login without error', (done) => {
        let x = {
            username: "prashanth",
            password: "1234"
        }
        chai.request(server)
            .post('/loginandreturnuser')
            .send(x)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('cn');
                //res.body.errors.should.have.property('pages');
                res.body.should.have.property('description').eql('LDAP administrator');
                done();
            });
    });

});
describe('/POST loginandreturnuser', () => {
    it('it should not login with error', (done) => {
        let x = {
            username: "prashanth",
            password: "1234a"
        }
        chai.request(server)
            .post('/loginandreturnuser')
            .send(x)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                //res.body.errors.should.have.property('pages');
                res.body.should.have.property('message').eql('Invalid username/password');
                done();
            });
    });

});
