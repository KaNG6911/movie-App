type Movies = {
  id: number;
  title: string;
  rating: number;
};

const Popular = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzc3OTUwODE0N2JiYzM1ZjE2YmIwZWJjYWIxM2I4ZSIsIm5iZiI6MTc2NjU2NTY4Ny4zMjYwMDAyLCJzdWIiOiI2OTRiYTczNzZiNGZmMGM1YjAwNzNmOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OKb9Eg4IJbemSQSfFD-_RJpllzTax-vHrEFubkjctWE",
      },
    }
  );

  const data = await response.json();
  return data.results;
};

const Upcoming = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzc3OTUwODE0N2JiYzM1ZjE2YmIwZWJjYWIxM2I4ZSIsIm5iZiI6MTc2NjU2NTY4Ny4zMjYwMDAyLCJzdWIiOiI2OTRiYTczNzZiNGZmMGM1YjAwNzNmOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OKb9Eg4IJbemSQSfFD-_RJpllzTax-vHrEFubkjctWE",
      },
    }
  );

  const data = await response.json();
  return data.results;
};

const TopRated = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzc3OTUwODE0N2JiYzM1ZjE2YmIwZWJjYWIxM2I4ZSIsIm5iZiI6MTc2NjU2NTY4Ny4zMjYwMDAyLCJzdWIiOiI2OTRiYTczNzZiNGZmMGM1YjAwNzNmOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OKb9Eg4IJbemSQSfFD-_RJpllzTax-vHrEFubkjctWE",
      },
    }
  );

  const data = await response.json();
  return data.results;
};

export const MoviesAll = async () => {
  const movie: Movies[] = await Popular();
  const upcoming: Movies[] = await Upcoming();
  const topRated: Movies[] = await TopRated();
  return (
    <div>
      <h1>Popular Movies</h1>
      <div>
        {movie.map((movie: Movies) => (
          <div key={movie.id} className="movie-card">
            <img
              src={` https://image.tmdb.org/t/p${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.rating}</p>
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
       <h1>Upcoming Movies</h1>
      <div>
        {upcoming.map((upcoming: Movies) => (
          <div key={upcoming.id} className="upcoming-card">
            <img
              src={` https://image.tmdb.org/t/p500${upcoming.poster_path}`}
              alt={upcoming.title}
            />
            <p>{upcoming.rating}</p>
            <h2>{upcoming.title}</h2>
          </div>
        ))}
      </div>
       <h1>Top Rated Movies</h1>
      <div>
        {topRated.map((movie: Movies) => (
          <div key={movie.id} className="movie-card">
            <img
              src={` https://image.tmdb.org/t/p500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.rating}</p>
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
