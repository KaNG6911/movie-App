export async function getMovieTrailer(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  const trailer =
    data?.results?.find(
      (v: any) => v.site === "YouTube" && v.type === "Trailer"
    ) ||
    data?.results?.find(
      (v: any) =>
        v.site === "YouTube" &&
        (v.type === "Teaser" || v.type === "Clip")
    );

  return trailer?.key ?? null;
}
