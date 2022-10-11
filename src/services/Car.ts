import { IService } from '../interfaces/IService';
import ICar, { CarZodSchema } from '../interfaces/CarZodSchema';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    const result = this._car.read();
    return result;
  }
}

export default CarService;