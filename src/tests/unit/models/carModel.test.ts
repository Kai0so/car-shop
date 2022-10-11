import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
const { expect } = chai;
import CarModel from '../../../models/Car';
import { carMock, createdCarMock, invalidCarId, readAllMock, validCarId } from '../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(createdCarMock);
  });

  after(() => {
    sinon.restore();
  })

  describe('Criando um carro', () => {
    it('Sucesso na criação', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(createdCarMock);
    });
  })
  describe('Listando todos os carros', () => {
    it('Quando há carros cadastrados', async () => {
      sinon.stub(Model, 'find').resolves(readAllMock);
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal(readAllMock);
      sinon.restore();
    });

    it('Quando não há carros cadastrados', async () => {
      sinon.stub(Model, 'find').resolves([]);
      const allCars = await carModel.read();
      expect(allCars).to.be.deep.equal([]);
      sinon.restore();
    });
  })

  describe('Listando um carro pelo id', () => {
    it('Sucesso na listagem', async () => {
      sinon.stub(Model, 'findById').resolves(createdCarMock);
      const car = await carModel.readOne(validCarId);
      expect(car).to.be.deep.equal(createdCarMock);
      sinon.restore();
    });

    it('Caso o id informado seja inválido', async () => {
      sinon.stub(Model, 'findById').resolves(null);
      const car = await carModel.readOne(invalidCarId);
      expect(car).to.be.deep.equal(null);
      sinon.restore();
    });
  })
});
