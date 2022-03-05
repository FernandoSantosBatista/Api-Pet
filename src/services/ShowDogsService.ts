import AppError from '../errors/AppError';
import Dogs from 'src/models/Dogs';
import IDogsRepository from 'src/repositories/IDogsRepository';

class ShowDogsService {
  private dogsRepository: IDogsRepository;

  constructor(dogsRepository: IDogsRepository) {
    this.dogsRepository = dogsRepository;
  }

  public async execute(id: string): Promise<Dogs> {
    const dogs = await this.dogsRepository.findById(id);

    if (!dogs) {
      throw new AppError('Dogs not found', 400);
    }

    return dogs;
  }
}

export default ShowDogsService;
