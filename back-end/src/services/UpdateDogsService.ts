import AppError from '../errors/AppError';
import IDogsRepository from 'src/repositories/IDogsRepository';
import Dogs from 'src/models/Dogs';

interface IRequest {
  id: string;
  name: string;
  species: string;
  sex: string;
  age: string;
  size: string;
  logo: string;
}

class UpdateDogsService {
  private dogsRepository: IDogsRepository;

  constructor(dogsRepository: IDogsRepository) {
    this.dogsRepository = dogsRepository;
  }

  public async execute({
    id,
    name,
    species,
    sex,
    age,
    size,
    logo,
  }: IRequest): Promise<Dogs> {
    const dogs = await this.dogsRepository.findById(id);

    if (!dogs) {
      throw new AppError('Dogs not found', 400);
    }

    dogs.name = name;
    dogs.species = species;
    dogs.sex = sex;
    dogs.age = age;
    dogs.size = size;
    dogs.logo = logo;

    await this.dogsRepository.save(dogs);

    return dogs;
  }
}

export default UpdateDogsService;
