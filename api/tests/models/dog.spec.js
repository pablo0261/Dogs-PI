<<<<<<< HEAD
const { Dog } = require("../../src/db.js");
const { expect } = require("chai");

describe("Validators", () => {
  describe("heightMin", () => {
    it("should throw an error if heightMin is not a number", async () => {
      try {
        await Dog.create({  name: "Labrador22",
        heightMin: "no es un numero",
        heightMax: 9,
        weightMin: 25,
        weightMax: 30,
        life_span: "10-12",
        temperaments: ["Friendly", "Strong"], });
        throw new Error("Test should have thrown an error");
      } catch (error) {
        expect(error.name).to.equal("SequelizeDatabaseError");
      }
    });

    it("should work when it has a valid heightMin", async () => {
      const dog = await Dog.create({  
        name: "Labrador12",
      heightMin: 5,
      heightMax: 20,
      weightMin: 25,
      weightMax: 30,
      life_span: "10-12",
      temperaments: ["Friendly", "Strong"],});
      expect(dog.heightMin).to.equal(5);
    });
  });

  describe("heightMax", () => {
    it("should throw an error if heightMax is not a number", async () => {
      try {
        await Dog.create({
          name: "Labrador22",
          heightMin: 5,
          heightMax: 999999999,
          weightMin: 25,
          weightMax: 30,
          life_span: "10-12",
          temperaments: ["Friendly", "Strong"],
        });
        throw new Error("Test should have thrown an error");
      } catch (error) {
        expect(error.name).to.equal("Error");
      }
    });

    it("should work when it has a valid heightMax", async () => {
      const dog = await Dog.create({
        name: "Labrador23",
        heightMin: 5,
        heightMax: 18,
        weightMin: 25,
        weightMax: 30,
        life_span: "10-12",
        temperaments: ["Friendly", "Strong"],
      });
      expect(dog.heightMax).to.equal(18);
    });
  });

  describe("weightMin", () => {
    it("should throw an error if weightMin is not a number", async () => {
      try {
        await Dog.create({
          name: "Labrador22",
          heightMin: 5,
          heightMax: 18,
          weightMin: "no es numero",
          weightMax: 30,
          life_span: "10-12",
          temperaments: ["Friendly", "Strong"],
        });
        throw new Error("Test should have thrown an error");
      } catch (error) {
        expect(error.name).to.equal("SequelizeDatabaseError");
      }
    });

    it("should work when it has a valid weightMin", async () => {
      const dog = await Dog.create({
        name: "Labrador25",
        heightMin: 5,
        heightMax: 18,
        weightMin: 25,
        weightMax: 30,
        life_span: "10-12",
        temperaments: ["Friendly", "Strong"],
      });
      expect(dog.weightMin).to.equal(25);
    });
  });

  describe("weightMax", () => {
    it("should throw an error if weightMax is not a number", async () => {
      try {
        await Dog.create({
          name: "Labrador26",
          heightMin: 5,
          heightMax: 18,
          weightMin: 25,
          weightMax: "deberia ser un numero",
          life_span: "10-12",
          temperaments: ["Friendly", "Strong"],
        });
        throw new Error("Test should have thrown an error");
      } catch (error) {
        expect(error.name).to.equal("SequelizeDatabaseError");
      }
    });

    it("should work when it has a valid weightMax", async () => {
      const dog = await Dog.create({
        name: "Labrador27",
        heightMin: 5,
        heightMax: 18,
        weightMin: 25,
        weightMax: 30,
        life_span: "10-12",
        temperaments: ["Friendly", "Strong"],
      });
      expect(dog.weightMax).to.equal(30);
    });
  });

  describe("life_span", () => {
    it("should throw an error if life_span is not a valid JSON object", async () => {
      try {
        await Dog.create({
          name: "Labrador27",
          heightMin: 5,
          heightMax: 18,
          weightMin: 25,
          weightMax: 30,
          life_span: 99999999,
          temperaments: ["Friendly", "Strong"],
        });
        throw new Error("Test should have thrown an error");
      } catch (error) {
        expect(error.name).to.equal( "Error");
      }
    });

    it("should work when it has a valid life_span", async () => {
      const dog = await Dog.create({
        name: "Labrador22",
        heightMin: 5,
        heightMax: 18,
        weightMin: 25,
        weightMax: 30,
        life_span: "10-12",
        temperaments: ["Friendly", "Strong"],
      });
      expect(dog.life_span).to.deep.equal( "10-12" );
    });
  });

  describe("default image", () => {
    it("should use default image when image is not provided", async () => {
      const dog = await Dog.create({
        name: "Labrador22",
        heightMin: 5,
        heightMax: 18,
        weightMin: 25,
        weightMax: 30,
        life_span: "10-12",
        temperaments: ["Friendly", "Strong"],
      });
      expect(dog.reference_image_id).to.equal("api/src/Utils/DogShadow.jpg");
=======
const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
>>>>>>> main
    });
  });
});
