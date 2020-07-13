import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3001);
app.locals.title="Rancid Tomatillos api"

app.get('/api/v1/rancid-tomatillos', (request, response) => {
  response.send("Greetings from the depth of your machines!")
});

// app.get('/api/v1/rancid-tomatillos/favorites', () => {
//   response.send
// });

app.post('api/vi/rancid-tomatillos/favorites', (request, response) => {
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
});
