"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MovieCard from "@/app/about/components/MovieCard";
import { Movie } from "../../../index";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
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
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

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

function GenreFilterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const idsParam = searchParams.get("ids") ?? "";
  const pageParam = Number(searchParams.get("page")) || 1;

  const initialIds = idsParam
    ? idsParam.split(",").map(Number).filter(Boolean)
    : [];

  const [selectedGenres, setSelectedGenres] = useState<number[]>(initialIds);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [loading, setLoading] = useState(false);

  // URL өөрчлөгдөхөд state шинэчлэх
  useEffect(() => {
    const ids = idsParam ? idsParam.split(",").map(Number).filter(Boolean) : [];
    setSelectedGenres(ids);
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [idsParam, searchParams]);

  // Кино fetch хийх
  useEffect(() => {
    if (selectedGenres.length === 0) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(1);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      const genreParam = selectedGenres.join("|");
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreParam}&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
            accept: "application/json",
          },
        },
      );
      const data = await res.json();
      setMovies(data.results ?? []);
      setTotalResults(data.total_results ?? 0);
      setTotalPages(data.total_pages ?? 1);
      setLoading(false);
    };

    fetchMovies();
  }, [selectedGenres, currentPage]);

  const toggleGenre = (id: number) => {
    const newSelected = selectedGenres.includes(id)
      ? selectedGenres.filter((g) => g !== id)
      : [...selectedGenres, id];

    setSelectedGenres(newSelected);
    setCurrentPage(1);

    if (newSelected.length > 0) {
      router.push(`/genre?ids=${newSelected.join(",")}&page=1`, {
        scroll: false,
      });
    } else {
      router.push("/genre", { scroll: false });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    router.push(`/genre?ids=${idsParam}&page=${page}`, { scroll: true });
  };

  const selectedNames = GENRES.filter((g) => selectedGenres.includes(g.id))
    .map((g) => g.name)
    .join(", ");

  const paginationNumbers = getPaginationNumbers(currentPage, totalPages);

  return (
    <div className="px-6 md:px-16 py-8">
      <h1 className="text-2xl font-bold mb-6">Search filter</h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* LEFT: Genre filter */}
        <div className="w-full md:w-64 md:shrink-0">
          <h2 className="text-lg font-semibold mb-1">Genres</h2>
          <p className="text-sm text-gray-500 mb-4">
            See lists of movies by genre
          </p>

          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id);
              return (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition ${
                    isSelected
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {genre.name}
                  {isSelected ? (
                    <span className="text-xs">✕</span>
                  ) : (
                    <span className="text-gray-400 text-xs">{">"}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div className="flex-1">
          {selectedGenres.length === 0 ? (
            <p className="text-gray-400 mt-4">Select a genre...</p>
          ) : loading ? (
            <p className="text-gray-400 mt-4">Loading...</p>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">
                {totalResults} titles in &quot;{selectedNames}&quot;
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-1 mt-10">
                {/* Previous */}
                {currentPage > 1 ? (
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    className="px-3 py-2 rounded text-sm hover:bg-gray-100"
                  >
                    ← Previous
                  </button>
                ) : (
                  <span className="px-3 py-2 text-sm text-gray-300 cursor-not-allowed">
                    ← Previous
                  </span>
                )}

                {/* Page numbers */}
                {paginationNumbers.map((num, idx) =>
                  num === "..." ? (
                    <span
                      key={`dots-${idx}`}
                      className="px-2 py-2 text-sm text-gray-400"
                    >
                      ···
                    </span>
                  ) : (
                    <button
                      key={num}
                      onClick={() => goToPage(num as number)}
                      className={`px-3 py-2 rounded text-sm font-medium ${
                        currentPage === num
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </button>
                  ),
                )}

                {/* Next */}
                {currentPage < Math.min(totalPages, 10) ? (
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    className="px-3 py-2 rounded text-sm hover:bg-gray-100"
                  >
                    Next →
                  </button>
                ) : (
                  <span className="px-3 py-2 text-sm text-gray-300 cursor-not-allowed">
                    Next →
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GenreFilterPage() {
  return (
    <Suspense>
      <GenreFilterContent />
    </Suspense>
  );
}
