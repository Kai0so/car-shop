import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import { carMock, createdCarMock, readAllMock } from '../mocks/carMock';
import CarService from '../../../services/Car';
import { ZodError } from 'zod';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(createdCarMock);
  });

  after(() => {
    sinon.restore();
  })

  describe('Criando um carro', () => {
    it('Sucesso na criação', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(createdCarMock);
    });

    it('Falha na criação', async () => {
      let err: any;
      try {
        await carService.create({});
      } catch (error) {
        err = error;
      }
      expect(err).to.be.instanceOf(ZodError);
    });
  })


  describe('Listando todos os carros', () => {
    it('Quando há carros cadastrados', async () => {
      sinon.stub(carModel, 'read').resolves(readAllMock);
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal(readAllMock);
      sinon.restore()
    });

    it('Quando não há carros cadastrados', async () => {
      sinon.stub(carModel, 'read').resolves([]);
      const allCars = await carService.read();
      expect(allCars).to.be.deep.equal([]);
      sinon.restore()
    });
  })
});
