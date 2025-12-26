import { Popular, Upcoming, TopRated } from "@/app/components/ApiCom";

type Movies = {
  id: number;
  title: string;
  rating: number;
  poster_path: string;
  vote_average: number;
};

export const MoviesAll = async () => {
  const movie: Movies[] = await Popular();
  const upcoming: Movies[] = await Upcoming();
  const topRated: Movies[] = await TopRated();
  return (
    <div className="flex flex-col gap-8 pt-10 pb-10 w-400 m-auto">
      <h1>Popular Movies</h1>
      <div className="grid grid-cols-5 gap-20 ">
        {movie.slice(0, 10).map((movie: Movies) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-t-2xl"
            />
            <p>
              <img src="Star.png" alt="" className="w-5 h-5" />
              <span>{movie.vote_average}</span> / 10
            </p>
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
      <h1>Upcoming Movies</h1>
      <div className="grid grid-cols-5 gap-20 ">
        {upcoming.slice(0, 10).map((upcoming: Movies) => (
          <div key={upcoming.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${upcoming.poster_path}`}
              alt={upcoming.title}
              className="rounded-t-2xl"
            />
            <p>
              <img src="Star.png" alt="" className="w-5 h-5" />
              <span>{upcoming.vote_average}</span> / 10
            </p>
            <h2>{upcoming.title}</h2>
          </div>
        ))}
      </div>
      <h1>Top Rated Movies</h1>
      <div className="grid grid-cols-5 gap-20 ">
        {topRated.slice(0, 10).map((movie: Movies) => (
          <div key={movie.id} className="movie-card">
            <img
              className="rounded-t-2xl"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>
              <img src="Star.png" alt="" className=" w-5 h-5 brightness-100" />
              <span>{movie.vote_average}</span> / 10
            </p>
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
