import AppError from '../errors/AppError';
import IDogsRepository from 'src/repositories/IDogsRepository';

class DeleteDogsService {
  private dogsRepository: IDogsRepository;

  constructor(dogsRepository: IDogsRepository) {
    this.dogsRepository = dogsRepository;
  }

  public async execute(id: string): Promise<void> {
    const dogs = await this.dogsRepository.findById(id);

    if (!dogs) {
      throw new AppError('Dogs not found!', 400);
    }

    await this.dogsRepository.delete(id);
  }
}

export default DeleteDogsService;
