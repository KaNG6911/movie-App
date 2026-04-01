"use client";
import { Movie } from "../../../..";

type Props = {
  movie: Movie;
  onWatchTrailer: () => void;
};

export default function CarouselMovieContent({ movie, onWatchTrailer }: Props) {
  return (
    <div className="w-full">
      {/* Mobile: зөвхөн зураг — мэдээлэл доор тусдаа */}
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-62.5 object-cover object-center md:hidden"
      />

      {/* Desktop: original overlay layout */}
      <div className="relative w-full h-140 hidden md:block text-white">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex flex-col justify-center px-10 max-w-xl">
          <p className="text-sm uppercase tracking-wide opacity-80">Now Playing</p>
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-sm mb-3">⭐ {movie.vote_average.toFixed(1)} / 10</p>
          <p className="text-sm line-clamp-4 mb-4 opacity-90">{movie.overview}</p>
          <button
            onClick={onWatchTrailer}
            className="w-fit px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
          >
            ▶ Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
}
