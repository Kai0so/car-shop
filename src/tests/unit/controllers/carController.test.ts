import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car';
import { carMock, createdCarMock, readAllMock } from '../mocks/carMock';
import CarService from '../../../services/Car';
import CarController from '../../../controllers/Car';
import { Request, Response } from 'express';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, 'create').resolves(createdCarMock);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  })

  describe('Criando um carro', () => {
    it('Sucesso na criação', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(createdCarMock)).to.be.true;
    });
  })

  describe('Listando todos os carros', () => {
    it('Quando há carros cadastrados', async () => {
      sinon.stub(carService, 'read').resolves(readAllMock);
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(readAllMock)).to.be.true;
      sinon.restore();
    });

    it('Quando não há carros cadastrados', async () => {
      sinon.stub(carService, 'read').resolves([]);
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([])).to.be.true;
      sinon.restore();
    });
  })
});
