import IDogsRepository from 'src/repositories/IDogsRepository';
import Dogs from 'src/models/Dogs';

class ListallDogsService {
  private dogsRepository: IDogsRepository;

  constructor(dogsRepository: IDogsRepository) {
    this.dogsRepository = dogsRepository;
  }

  public async execute(): Promise<Dogs[]> {
    const dogs = await this.dogsRepository.findAll();

    return dogs;
  }
}

export default ListallDogsService;
