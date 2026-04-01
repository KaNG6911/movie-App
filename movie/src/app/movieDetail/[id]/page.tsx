import MovieMeta from "./components/MovieMeta";
import MovieHero from "./components/MovieHero";
import MovieGenres from "./components/MovieGenres";
import MovieCredits from "./components/MovieCredits";
import SimilarMovies from "./components/SimilarMovies";

type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
};

type CreditsResponse = {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: { id: number; name: string; job: string; department: string }[];
};

type SimilarResponse = {
  results: {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
  }[];
};

type VideoResponse = {
  results: {
    id: string;
    key: string;
    name: string;
    type: string;
    site: string;
  }[];
};

type ReleaseDatesResponse = {
  results: {
    iso_3166_1: string;
    release_dates: { certification: string; type: number }[];
  }[];
};

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.NEXT_PUBLIC_MOVIE_KEY!;

async function tmdbFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${TMDB_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB ${res.status}: ${text}`);
  }
  return res.json();
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movieId = Number(id);

  if (!Number.isFinite(movieId)) throw new Error(`Invalid movie id: ${id}`);

  const [movie, credits, similar, videos, releaseDates] = await Promise.all([
    tmdbFetch<MovieDetail>(`/movie/${movieId}?language=en-US`),
    tmdbFetch<CreditsResponse>(`/movie/${movieId}/credits?language=en-US`),
    tmdbFetch<SimilarResponse>(
      `/movie/${movieId}/similar?language=en-US&page=1`,
    ),
    tmdbFetch<VideoResponse>(`/movie/${movieId}/videos?language=en-US`),
    tmdbFetch<ReleaseDatesResponse>(`/movie/${movieId}/release_dates`),
  ]);

  const usRelease = releaseDates.results.find((r) => r.iso_3166_1 === "US");
  const certification = usRelease?.release_dates.find((d) => d.certification)?.certification;

  const trailer = videos.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  const director = credits.crew.find((c) => c.job === "Director");
  const writers = credits.crew
    .filter((c) => c.department === "Writing")
    .slice(0, 3);
  const stars = credits.cast.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <MovieMeta
        title={movie.title}
        releaseDate={movie.release_date}
        runtime={movie.runtime}
        voteAverage={movie.vote_average}
        voteCount={movie.vote_count}
        certification={certification}
      />
      <MovieHero
        posterPath={movie.poster_path}
        backdropPath={movie.backdrop_path}
        trailer={trailer}
        genres={movie.genres}
        overview={movie.overview}
      />
      <div className="hidden md:block">
        <MovieGenres genres={movie.genres} />
      </div>
      <p className="hidden md:block text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
        {movie.overview}
      </p>
      <MovieCredits director={director} writers={writers} stars={stars} />
      <SimilarMovies
        movies={similar.results}
        genreIds={movie.genres.map((g) => g.id)}
      />
    </div>
  );
}
