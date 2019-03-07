import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/index";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Numbers", () => {
  describe("GET /", () => {
    // Test to get all numbers
    it("should get all numbers ", done => {
      chai
        .request(app)
        .get("/numbers")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });

    // Test to get single number
    it("should get a single number ", done => {
      const id = 1;
      chai
        .request(app)
        .get(`/numbers/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    // Test to get single number
    it("should not get a single number ", done => {
      const id = -100;
      chai
        .request(app)
        .get(`/numbers/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
