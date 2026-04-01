import NowPlayingCarousel from "./NowPlayingCarousel";
import { Movie } from "../../../../index";

const fetchFromNowPlaying = async (): Promise<Movie[]> => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
    },
  );

  const data = await response.json();
  return data.results;
};

export default async function NowPlaying() {
  const nowPlayingMovies = await fetchFromNowPlaying();

  return (
    <div>
      <div className="pb-4">
        <NowPlayingCarousel movies={nowPlayingMovies} />
      </div>
    </div>
  );
}
