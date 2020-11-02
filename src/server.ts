import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({message: 'Hello worldddd'})
});


app.listen(3333, () => {
  console.log('***************')
  console.log('Server starded')
  console.log('***************')
});