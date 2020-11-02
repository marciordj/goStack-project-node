import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.post('/users', (request, response) => {
  const { name, email } = request.body;

  const users = {
    name,
    email,
  };

  return response.json(users);
});

app.listen(3333, () => {
  console.log('***************');
  console.log('Server starded');
  console.log('***************');
});
