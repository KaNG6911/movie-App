import { fetchMoviesFromTMDB } from "@/app/about/components/Allmovie";
import MovieCard from "@/app/about/components/MovieCard";
import { Movie } from "../../../../index";
import Link from "next/link";

const getCategoryTitle = (category: string): string => {
  const titles: Record<string, string> = {
    upcoming: "Upcoming",
    popular: "Popular",
    top_rated: "Top Rated",
  };
  return (
    titles[category] ??
    category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
};

// Pagination дугааруудыг үүсгэх helper
const getPaginationNumbers = (
  current: number,
  total: number,
): (number | "...")[] => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, "...", total];
  if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default async function MovieCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ movieCategory: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { movieCategory } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { results: movies, totalPages } = await fetchMoviesFromTMDB(
    movieCategory,
    currentPage,
  );
  const title = getCategoryTitle(movieCategory);
  const maxPages = Math.min(totalPages, 10);
  const paginationNumbers = getPaginationNumbers(currentPage, maxPages);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 mt-10 mb-6">
        {/* Previous */}
        {currentPage > 1 ? (
          <Link
            href={`/category/${movieCategory}?page=${currentPage - 1}`}
            className="px-3 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1"
          >
            ← Previous
          </Link>
        ) : (
          <span className="px-3 py-2 rounded text-sm text-gray-400 flex items-center gap-1 cursor-not-allowed">
            ← Previous
          </span>
        )}

        {/* Page Numbers */}
        {paginationNumbers.map((num, idx) =>
          num === "..." ? (
            <span
              key={`dots-${idx}`}
              className="px-3 py-2 text-sm text-gray-400"
            >
              ···
            </span>
          ) : (
            <Link
              key={num}
              href={`/category/${movieCategory}?page=${num}`}
              className={`px-3 py-2 rounded text-sm font-medium ${
                currentPage === num
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {num}
            </Link>
          ),
        )}

        {/* Next */}
        {currentPage < maxPages ? (
          <Link
            href={`/category/${movieCategory}?page=${currentPage + 1}`}
            className="px-3 py-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1"
          >
            Next →
          </Link>
        ) : (
          <span className="px-3 py-2 rounded text-sm text-gray-400 flex items-center gap-1 cursor-not-allowed">
            Next →
          </span>
        )}
      </div>
    </div>
  );
}
