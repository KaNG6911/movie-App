import Link from "next/link";
import MovieCard from "../about/components/MovieCard";
import { Movie } from "../../..";

type Genre = {
  id: number;
  name: string;
};

const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 99, name: "Biography" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "Sport" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

async function searchMovies(query: string, page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
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
    totalResults: data.total_results ?? 0,
    totalPages: data.total_pages ?? 1,
  };
}

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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = "", page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { results, totalResults, totalPages } = query
    ? await searchMovies(query, currentPage)
    : { results: [], totalResults: 0, totalPages: 1 };

  const paginationNumbers = getPaginationNumbers(currentPage, totalPages);

  return (
    <div className="px-6 md:px-16 py-8">
      <h1 className="text-2xl font-bold mb-2">Search results</h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        {/* LEFT: Results */}
        <div className="flex-1">
          {query && (
            <p className="text-sm font-bold mb-4">
              {totalResults} results for &quot;{query}&quot;
            </p>
          )}

          {results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-1 mt-8">
                {currentPage > 1 ? (
                  <Link
                    href={`/search?query=${encodeURIComponent(query)}&page=${currentPage - 1}`}
                    className="px-3 py-2 rounded text-sm hover:bg-gray-100 flex items-center gap-1"
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
                      href={`/search?query=${encodeURIComponent(query)}&page=${num}`}
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

                {currentPage < totalPages ? (
                  <Link
                    href={`/search?query=${encodeURIComponent(query)}&page=${currentPage + 1}`}
                    className="px-3 py-2 rounded text-sm hover:bg-gray-100 flex items-center gap-1"
                  >
                    Next →
                  </Link>
                ) : (
                  <span className="px-3 py-2 text-sm text-gray-300 cursor-not-allowed">
                    Next →
                  </span>
                )}
              </div>
            </>
          ) : query ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4">🔍</span>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                No results found
              </p>
              <p className="text-sm text-gray-500 mt-1">
                No movies found matching &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <p className="text-gray-400">Search for a movie above.</p>
          )}
        </div>

        {/* RIGHT: Genre filter */}
        <div className="w-full md:w-64 md:shrink-0">
          <h2 className="text-lg font-semibold mb-1">Search by genre</h2>
          <p className="text-sm text-gray-800 mb-4">
            See lists of movies by genre
          </p>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <Link
                key={genre.id + genre.name}
                href={`/genre/${genre.id}`}
                className="flex items-center gap-2 rounded-full  border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 transition"
              >
                {genre.name}
                <span className="text-gray-400 text-xs ">{" >"}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
