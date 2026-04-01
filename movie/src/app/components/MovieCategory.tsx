import MovieCard from "@/app/about/components/MovieCard";
import { fetchMoviesFromTMDB } from "../about/components/Allmovie";
import type { Movie } from "../../..";

export default async function MovieCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const { results: movies }: { results: Movie[]; totalPages: number } = await fetchMoviesFromTMDB(category);

  return (
    <div className="grid grid-cols-5 gap-4 px-4">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}
