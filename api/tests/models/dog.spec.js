const { Dog } = require('../../src/db.js');
const { expect } = require('chai');


describe('Validators', () => {
  describe('heightMin', () => {
    it('should throw an error if heightMin is not a number', async () => {
      try {
        await Dog.create({ name: 'Labrador', heightMin: 'invalid' });
        throw new Error('Test should have thrown an error');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal(
          'Validation isNumeric on heightMin failed'
        );
      }
    });
    
    it('should work when it has a valid heightMin', async () => {
      const dog = await Dog.create({ name: 'Golden Retriever', heightMin: 20 });
      expect(dog.heightMin).to.equal(20);
    });
  });

  describe('heightMax', () => {
    it('should throw an error if heightMax is not a number', async () => {
      try {
        await Dog.create({ name: 'Labrador', heightMax: 'invalid' });
        throw new Error('Test should have thrown an error');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal(
          'Validation isNumeric on heightMax failed'
        );
      }
    });

    it('should work when it has a valid heightMax', async () => {
      const dog = await Dog.create({ name: 'Golden Retriever', heightMax: 25 });
      expect(dog.heightMax).to.equal(25);
    });
  });

  describe('weightMin', () => {
    it('should throw an error if weightMin is not a number', async () => {
      try {
        await Dog.create({ name: 'Labrador', weightMin: 'invalid' });
        throw new Error('Test should have thrown an error');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal(
          'Validation isNumeric on weightMin failed'
        );
      }
    });

    it('should work when it has a valid weightMin', async () => {
      const dog = await Dog.create({ name: 'Golden Retriever', weightMin: 10 });
      expect(dog.weightMin).to.equal(10);
    });
  });

  describe('weightMax', () => {
    it('should throw an error if weightMax is not a number', async () => {
      try {
        await Dog.create({ name: 'Labrador', weightMax: 'invalid' });
        throw new Error('Test should have thrown an error');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal(
          'Validation isNumeric on weightMax failed'
        );
      }
    });

    it('should work when it has a valid weightMax', async () => {
      const dog = await Dog.create({ name: 'Golden Retriever', weightMax: 20 });
      expect(dog.weightMax).to.equal(20);
    });
  });

  describe('life_span', () => {
    it('should throw an error if life_span is not a valid JSON object', async () => {
      try {
        await Dog.create({ name: 'Labrador', life_span: 'invalid' });
        throw new Error('Test should have thrown an error');
      } catch (error) {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.errors[0].message).to.equal(
          'Validation isJson on life_span failed'
        );
      }
    });

    it('should work when it has a valid life_span', async () => {
      const dog = await Dog.create({
        name: 'Golden Retriever',
        life_span: { years: 12, months: 6 },
      });
      expect(dog.life_span).to.deep.equal({ years: 12, months: 6 });
    });
  });
});

//! VERIFICAR TODO ESTE TEST