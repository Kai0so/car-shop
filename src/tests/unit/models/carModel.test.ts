import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
const { expect } = chai;
import CarModel from '../../../models/Car';
import { carMock, createdCarMock, readAllMock } from '../mocks/carMock';

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
});
