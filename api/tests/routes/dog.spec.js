const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn, Temperament } = require('../../src/db.js');

const agent = session(app);

//*--GET--//
    describe('GET /dogs', () => {
      it('should return 404 status and correct message for a noexiste name', async () => {
        const response = await agent.get('/dogs?name=noexiste%20name').expect(404);
        expect(response.text).to.equal("\"We couldn't find breeds with the name 'noexiste name'");
      });

  it('should get 200', async () => {
    const response = await agent.get('/dogs').expect(200);
    expect(response.body).to.be.an('array');
  });
});

describe('GET /dogs/:id', () => {
  
  it('should return a 400 status when the dog ID is not found', async () => {
    const response = await agent.get('/dogs/99999').expect(400);
    expect(response.text).to.equal("{\"error\":\"Error when trying to retrieve the dog from the API by ID\"}");
  });
  
  it('should get a specific dog by ID with status 200', async () => {
    const response = await agent.get('/dogs/1').expect(200);
    expect(response.body).to.be.an('array');
  });
});

//*--POST--//

describe('POST /dogs', () => {
  it('should create a new dog', async () => {
    const newDog = {
      name: 'Labrador22',
      heightMin: 5,
      heightMax: 18,
      weightMin: 25,
      weightMax: 30,
      life_span: '10-12',
      temperaments: ['Friendly', 'Outgoing'],
    };

  const response = await agent.post('/dogs').send(newDog).expect(200);
  expect(response.body).to.be.an('array');
  expect(response.body.name).to.equal(newDog.name);
});

  it('should return a 400 status when invalid data is provided', async () => {
    const invalidDog = {
      reference_image_id: 'some-id',
      name: '',
      heightMin: 5000,
      heightMax: 60000,
      weightMin: 25000,
      weightMax: 30000,
      life_span: '10-120000',
      temperaments: ['Friendly', 'Outgoing'],
    };

    const response = await agent.post('/dogs').send(invalidDog).expect(400);
  });
});

describe('DB Integration Tests', () => {
  it('should fetch dogs from the database', async () => {
    const dbDogs = await Dog.findAll();
    expect(dbDogs).to.be.an('array');
  });

  it('should fetch a dog by ID from the database', async () => {
    const dbDog = await Dog.findOne({ where: { name: 'Labrador22' } });
    expect(dbDog).to.be.an('array');
    expect(dbDog[0].name).to.equal('Labrador22');
  });

  it('should fetch temperaments for a dog from the database', async () => {
    const dbDog = await Dog.findOne({ where: { name: 'Labrador22' } });
    const temperaments = await dbDog.getTemperaments();
    expect(temperaments).to.be.an('array');
  });
});
