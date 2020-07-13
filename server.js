import express from 'express';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.locals.title="Rancid Tomatillos API";
app.locals.comments = [
  {
    id: 1, 
    author: 'Aang', 
    comment: 'Great movie!',
    movie_id: 508439
  },
  {
    id: 2, 
    author: 'Katara', 
    comment: 'Not good. They need to quit making these movies',
    movie_id: 522938
  },
  {
    id: 3, 
    author: 'Zuko', 
    comment: 'Always a classic.',
    movie_id: 603
  },
]

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/movies/comments', (request, response) => {
  const comments = app.locals.comments;
  response.status(200).json({ comments });
})

app.post('/api/v1/movies/comments', (request, response) => {
  const id = Date.now();
  const comments = request.body;

  for (let requiredParameter of ['author', 'comment', 'movie_id']) {
    if(!comments[requiredParameter]) {
      return response
        .status(422)
        .json({error: `You are missing a required paramter of ${requiredParameter}. Expected format: { author: <String>, comment: <String>, movie_id: <Integer> }`});
    } 
  }
  const {author, comment, movie_id} = comments
  app.locals.comments.push({id, author, comment, movie_id})
  return response.status(201).json({id, author, comment, movie_id});
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
});
