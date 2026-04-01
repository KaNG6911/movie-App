import React from "react";

import MovieCard from "./MovieCard";
import Link from "next/link";
import { Movie } from "../../../../index";

export const fetchMoviesFromTMDB = async (
  category: string,
  page: number = 1,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
    },
  );

  const data = await response.json();
  return { results: data.results ?? [], totalPages: data.total_pages ?? 1 };
};

export default async function Allmovie() {
  const upcomingMovies: Movie[] = (await fetchMoviesFromTMDB("upcoming"))
    .results;
  const popularMovies: Movie[] = (await fetchMoviesFromTMDB("popular")).results;
  const topRatedMovies: Movie[] = (await fetchMoviesFromTMDB("top_rated"))
    .results;

  const Section = ({
    title,
    category,
    movies,
  }: {
    title: string;
    category: string;
    movies: Movie[];
  }) => (
    <section className="mb-10 px-4 md:px-10 lg:px-20">
      <div className="flex justify-between items-center mb-4 pt-5">
        <div className=" flex font-semibold leading-8 g-13">{title}</div>
        <Link href={`/category/${category}`} className="text-sm">
          See more →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
  return (
    <div>
      <Section title="Upcoming" category="upcoming" movies={upcomingMovies} />
      <Section title="Popular" category="popular" movies={popularMovies} />
      <Section title="Top Rated" category="top_rated" movies={topRatedMovies} />
    </div>
  );
}
