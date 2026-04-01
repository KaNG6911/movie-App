import Link from "next/link";

type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type Props = {
  movies: SimilarMovie[];
  genreIds?: number[];
};

export default function SimilarMovies({ movies, genreIds = [] }: Props) {
  if (!movies || movies.length === 0) return null;

  const seeMoreHref =
    genreIds.length > 0 ? `/genre?ids=${genreIds.join(",")}` : "/genre";

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">More like this</h2>
        <Link
          href={seeMoreHref}
          className="text-sm text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium flex items-center gap-1"
        >
          See more →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {movies.slice(0, 5).map((m) => (
          <Link
            key={m.id}
            href={`/movieDetail/${m.id}`}
            className="bg-gray-50 dark:bg-gray-800 overflow-hidden rounded-lg block hover:opacity-80 transition shrink-0"
            style={{ width: 160 }}
          >
            {m.poster_path ? (
              <img
                className="w-full aspect-2/3 object-cover"
                src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                alt={m.title}
                width={200}
              />
            ) : (
              <div className="w-full aspect-2/3 bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                No Image
              </div>
            )}
            <div className="p-3">
              <div>{m.title}</div>
              <div>⭐ {m.vote_average.toFixed(1)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
