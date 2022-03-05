import AppError from '../errors/AppError';
import IClientsRepository from 'src/repositories/IClientsRepository';
import Client from 'src/models/Client';

class ShowDogsService {
  private clientsRepository: IClientsRepository;

  constructor(clientsRepository: IClientsRepository) {
    this.clientsRepository = clientsRepository;
  }

  public async execute(id: string): Promise<Client> {
    const clients = await this.clientsRepository.findById(id);

    if (!clients) {
      throw new AppError('Clientes not found', 400);
    }

    return clients;
  }
}

export default ShowDogsService;
