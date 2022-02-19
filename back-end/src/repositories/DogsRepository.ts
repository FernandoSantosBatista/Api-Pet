import ICreateDogsDTO from 'src/dtos/ICreateDogsDTO';
import { Repository, getRepository, Like } from 'typeorm';
import Dogs from 'src/models/Dogs';
import IDogsRepository from './IDogsRepository';

class DogsRepository implements IDogsRepository {
  private ormRepository: Repository<Dogs>;

  constructor() {
    this.ormRepository = getRepository(Dogs);
  }
  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }

  public async findAllPaginated(page: number): Promise<[Dogs[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10,
    });
  }
  public async finAllByName(name: string): Promise<Dogs[]> {
    return this.ormRepository.find({
      name: Like(`%${name}%`),
    });
  }

  public async findAll(): Promise<Dogs[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Dogs | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }
  public async create({
    name,
    species,
    sex,
    age,
    size,
    logo,
  }: ICreateDogsDTO): Promise<Dogs> {
    const dogs = this.ormRepository.create({
      name,
      species,
      sex,
      age,
      size,
      logo,
    });
    await this.ormRepository.save(dogs);

    return dogs;
  }

  public async save(dogs: Dogs): Promise<Dogs> {
    return this.ormRepository.save(dogs);
  }
}

export default DogsRepository;
