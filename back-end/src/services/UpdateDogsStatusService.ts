import AppError from '../errors/AppError';
import IDogsRepository from 'src/repositories/IDogsRepository';
import DogsStatus from 'src/enums/DogsStatus';
import Dogs from 'src/models/Dogs';

interface IRequest {
  id: string;
  status: DogsStatus;
}

class UpdateDogsStatusService {
  private dogsRepository: IDogsRepository;

  constructor(dogsRepository: IDogsRepository) {
    this.dogsRepository = dogsRepository;
  }

  public async execute({ id, status }: IRequest): Promise<Dogs> {
    const dogs = await this.dogsRepository.findById(id);

    if (!dogs) {
      throw new AppError('Dogs not found', 400);
    }

    dogs.status = status;

    await this.dogsRepository.save(dogs);

    return dogs;
  }
}

export default UpdateDogsStatusService;
