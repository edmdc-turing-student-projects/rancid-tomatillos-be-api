import express from 'express';
import cors from 'cors'
import shortid from 'shortid'

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

app.locals.favorites = [
  {
    id:37,
    movieId: 522938,
    userId: 58
  }, {
    id: 88,
    movieId: 603,
    userId: 58
  }, {
    id: 79,
    movieId: 689,
    userId: 58
  }
];

app.set('port', process.env.PORT || 3001);

app.get('/api/v1/rancid-tomatillos', (request, response) => {
  response.send("Greetings from the depth of your machines, or perhaps one day the web!")
});

app.get('/api/v1/movies/comments', (request, response) => {
  const comments = app.locals.comments;
  response.status(200).json({ comments });
})

app.get('/api/v1/movies/favorites', (request, response) => {
  const favorites = app.locals.favorites;
  response.status(200).json({ favorites });
})

app.post('/api/v1/movies/comments', (request, response) => {
  const id = shortid.generate();
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

app.post('/api/v1/movies/favorites', (request, response) => {
  const id = shortid.generate();
  const favorite = request.body;

  for(let requiredParameter of ['movieId', 'userId']) {
    if(!favorite[requiredParameter]) {
      return response
        .status(422)
        .json({error: `Hello there! The server was unable to process your request! Missing a ${requiredParameter} Expected format: { movieId: <Integer>, userId: <Integer>}`});
    }

    if(typeof favorite[requiredParameter] !== "number") {
      return response
        .status(422)
        .json({error: `Greetings fellow Intelligent Being! The server did not find the appropriate data type for ${requiredParameter}. Expected format: { movieId: <Integer>, userId: <Integer>}`});
    }
  }

  const {movieId, userId} = favorite;
  app.locals.favorites.push({id, movieId, userId})
  return response.status(201).json("Movie added to favorites")
})

app.patch('/api/v1/movies/favorites', (request, response) => {
  const {movieId, userId} = request.body;
  const foundMovieIndex = app.locals.favorites.findIndex(favorite => {
    return (favorite.movieId ===  movieId && favorite.userId === userId)
  })

  // app.locals.favorites = [...fileteredMovies]
  app.locals.favorites.splice(foundMovieIndex, 1)


  return response
    .send("Favorite successfully removed")
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
});
