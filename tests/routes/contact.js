import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Contacts", () => {
  describe("GET /", () => {
    // Test to get all contacts
    it("should get all contacts", done => {
      chai
        .request(app)
        .get("/contacts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    // Test to get single contact
    it("should get a single contact", done => {
      const id = 1;
      chai
        .request(app)
        .get(`/contacts/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    // Test to get single contact
    it("should not get a single contact", done => {
      const id = -100;
      chai
        .request(app)
        .get(`/contacts/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // Test to search single contact by name
    it("should search a single contact by name", done => {
      const name = "awab";
      chai
        .request(app)
        .get(`/contacts/search/${name}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    // Test to search single contact by number
    it("should search a single contact by number", done => {
      const number = "0920680519";
      chai
        .request(app)
        .get(`/contacts/search/${number}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
