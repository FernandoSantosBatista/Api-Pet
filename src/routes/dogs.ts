import { Router } from 'express';
import DogsController from 'src/controllers/DogsController';

const dogsRoutes = Router();
const dogsController = new DogsController();

dogsRoutes.get('/', dogsController.index);
dogsRoutes.get('/:id', dogsController.show);

dogsRoutes.get('/', dogsController.index);
dogsRoutes.get('/paginated', dogsController.paginated);
dogsRoutes.get('/search', dogsController.search);
dogsRoutes.post('/', dogsController.create);
dogsRoutes.put('/:id', dogsController.update);
dogsRoutes.delete('/:id', dogsController.destroy);

export default dogsRoutes;
