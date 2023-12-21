const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn, Temperament } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

  describe('GET /dogs', () => {
    it('should get 200', async () => {
      const response = await agent.get('/dogs').expect(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1); // Assuming one dog is created in the beforeEach hook
    });
  });

  describe('GET /dogs/:id', () => {
    it('should get a specific dog by ID from API', async () => {
      const apiDog = await getDogByIdFromApi(1); // Assuming 1 is a valid ID from the API
      const response = await agent.get('/dogs/1').expect(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1);
      expect(response.body[0]).to.deep.equal(apiDog);
    });

    it('should get a specific dog by ID from DB', async () => {
      const response = await agent.get('/dogs/Pug').expect(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.equal(1);
      expect(response.body[0].name).to.equal('Pug');
    });

    it('should return a 404 status when the dog ID is not found', async () => {
      const response = await agent.get('/dogs/999').expect(404);
      expect(response.text).to.equal("We couldn't find breeds with the ID '999'");
    });
  });

  describe('POST /dogs', () => {
    it('should create a new dog', async () => {
      const newDog = {
        reference_image_id: 'some-id',
        name: 'Labrador',
        heightMin: 50,
        heightMax: 60,
        weightMin: 25,
        weightMax: 30,
        life_span: '10-12',
        temperaments: ['Friendly', 'Outgoing'],
      };

      const response = await agent.post('/dogs').send(newDog).expect(200);
      expect(response.body).to.be.an('object');
      expect(response.body.name).to.equal('Labrador');
    });

    it('should return a 400 status when invalid data is provided', async () => {
      const invalidDog = {
        // Missing required fields
      };

      const response = await agent.post('/dogs').send(invalidDog).expect(400);
      expect(response.text).to.equal("Error: Missing required fields");
    });
  });
});

//! entender este codigo <== <== <== <==