import { Router } from 'express';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  return response.json({ message: 'Hello World' });
});

export default appointmentsRouter;
