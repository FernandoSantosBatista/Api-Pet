import ICreateDogsDTO from 'src/dtos/ICreateDogsDTO';
import Dogs from 'src/models/Dogs';

export default interface IDogsRepository {
  findAll(): Promise<Dogs[]>;
  findById(id: string): Promise<Dogs | undefined>;
  create(createDogs: ICreateDogsDTO): Promise<Dogs>;
  save(dogs: Dogs): Promise<Dogs>;
  delete(id: string): Promise<void>;
  findAllPaginated(page: number): Promise<[Dogs[], number]>;
  finAllByName(name: string): Promise<Dogs[]>;
}
