import { Request, Response } from 'express';
import DogsRepository from 'src/repositories/DogsRepository';
import CreateDogsService from 'src/services/CreateDogsService';
import DeleteDogsService from 'src/services/DeleteDogsService';
import ListallDogsService from 'src/services/ListAllDogsService';
import PaginatedDogsService from 'src/services/PaginatedDogsService';
import ShowDogsService from 'src/services/ShowDogsService';
import UpdateDogsService from 'src/services/UpdateDogsService';

class DogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const dogsRepository = new DogsRepository();
    const dogsService = new ListallDogsService(dogsRepository);

    const dogs = await dogsService.execute();

    return response.json(dogs);
  }

  public async paginated(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { page } = request.query;
    const dogsRepository = new DogsRepository();
    const dogsPaginated = new PaginatedDogsService(dogsRepository);
    const dogs = await dogsPaginated.execute({
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });
    return response.json(dogs);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const dogsRepository = new DogsRepository();

    const dogs = await dogsRepository.finAllByName(name?.toString() || '');

    return response.json(dogs);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const dogsRepository = new DogsRepository();
    const dogsService = new ShowDogsService(dogsRepository);

    const dogs = await dogsService.execute(id);

    return response.json(dogs);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, species, sex, age, size, logo } = request.body;
    const dogsRepository = new DogsRepository();
    const createDogs = new CreateDogsService(dogsRepository);

    const dogs = await createDogs.execute({
      name,
      species,
      sex,
      age,
      size,
      logo,
    });

    return response.status(201).json(dogs);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, species, sex, age, size, logo } = request.body;
    const dogsRepository = new DogsRepository();

    const updateDogs = new UpdateDogsService(dogsRepository);

    const dogs = await updateDogs.execute({
      id,
      name,
      species,
      sex,
      age,
      size,
      logo,
    });

    return response.json(dogs);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const dogsRepository = new DogsRepository();
    const destroyDogs = new DeleteDogsService(dogsRepository);

    await destroyDogs.execute(id);

    return response.status(204).send();
  }
}

export default DogsController;
