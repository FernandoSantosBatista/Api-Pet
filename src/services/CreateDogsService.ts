import IDogsRepository from 'src/repositories/IDogsRepository';
import Dogs from 'src/models/Dogs';

interface IRequest {
  name: string;
  species: string;
  sex: string;
  age: string;
  size: string;
  logo: string;
}

class CreateDogsService {
  private dogsRepository: IDogsRepository;

  constructor(dogsRepository: IDogsRepository) {
    this.dogsRepository = dogsRepository;
  }

  public async execute({
    name,
    species,
    sex,
    age,
    size,
    logo,
  }: IRequest): Promise<Dogs> {
    const dogs = await this.dogsRepository.create({
      name,
      species,
      sex,
      age,
      size,
      logo,
    });

    return dogs;
  }
}

export default CreateDogsService;
