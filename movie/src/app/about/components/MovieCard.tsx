import Link from "next/link";
import { Movie } from "../../../../index";

type Props = { movie: Movie };

export default function MovieCard({ movie }: Props) {
  return (
    <Link
      href={`/movieDetail/${movie.id}`}
      className="bg-gray-50 dark:bg-gray-800 w-full overflow-hidden rounded-lg block hover:opacity-80 transition"
    >
      <img
        className="w-full aspect-[2/3] object-cover"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
      />
      <div className="p-3 text-gray-900 dark:text-gray-100">
        <div>{movie.title}</div>
        <div>⭐ {movie.vote_average?.toFixed(1)}</div>
      </div>
    </Link>
  );
}
