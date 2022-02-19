import IPaginated from '../interfaces/paginated';
import IDogsRepository from 'src/repositories/IDogsRepository';
import Dogs from 'src/models/Dogs';

interface IRequest {
  page: number;
}

class PaginatedDogsService {
  private dogsRepository: IDogsRepository;

  constructor(dogsRepository: IDogsRepository) {
    this.dogsRepository = dogsRepository;
  }

  public async execute({ page }: IRequest): Promise<IPaginated<Dogs>> {
    const [dogs, total] = await this.dogsRepository.findAllPaginated(page * 10);

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<Dogs> = {
      data: dogs,
      totalElements: total,
      page,
      elements: dogs.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}

export default PaginatedDogsService;
