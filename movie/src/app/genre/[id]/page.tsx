import MovieCard from "@/app/about/components/MovieCard";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
};

const GENRE_NAMES: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const getPaginationNumbers = (
  current: number,
  total: number,
): (number | "...")[] => {
  const max = Math.min(total, 10);
  if (max <= 5) return Array.from({ length: max }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "...", max];
  if (current >= max - 2) return [1, "...", max - 2, max - 1, max];
  return [1, "...", current - 1, current, current + 1, "...", max];
};

async function fetchMoviesByGenre(genreId: number, page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${page}&sort_by=popularity.desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );
  const data = await res.json();
  return {
    results: (data.results ?? []) as Movie[],
    totalPages: data.total_pages ?? 1,
    totalResults: data.total_results ?? 0,
  };
}

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;

  const genreId = Number(id);
  const currentPage = Number(page) || 1;
  const genreName = GENRE_NAMES[genreId] ?? "Movies";

  const { results, totalPages } = await fetchMoviesByGenre(
    genreId,
    currentPage,
  );
  const paginationNumbers = getPaginationNumbers(currentPage, totalPages);

  return (
    <div className="px-6 md:px-16 py-8">
      <h1 className="text-2xl font-bold mb-6">{genreName}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 mt-10">
        {currentPage > 1 ? (
          <Link
            href={`/genre/${genreId}?page=${currentPage - 1}`}
            className="px-3 py-2 rounded text-sm hover:bg-gray-100"
          >
            ← Previous
          </Link>
        ) : (
          <span className="px-3 py-2 text-sm text-gray-300 cursor-not-allowed">
            ← Previous
          </span>
        )}

        {paginationNumbers.map((num, idx) =>
          num === "..." ? (
            <span
              key={`dots-${idx}`}
              className="px-2 py-2 text-sm text-gray-400"
            >
              ···
            </span>
          ) : (
            <Link
              key={num}
              href={`/genre/${genreId}?page=${num}`}
              className={`px-3 py-2 rounded text-sm font-medium ${
                currentPage === num
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {num}
            </Link>
          ),
        )}

        {currentPage < Math.min(totalPages, 10) ? (
          <Link
            href={`/genre/${genreId}?page=${currentPage + 1}`}
            className="px-3 py-2 rounded text-sm hover:bg-gray-100"
          >
            Next →
          </Link>
        ) : (
          <span className="px-3 py-2 text-sm text-gray-300 cursor-not-allowed">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}
