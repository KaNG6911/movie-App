"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Movie = {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string | null;
  vote_average?: number;
};

type Props = {
  word: string;
  results: Movie[];
  onClose: () => void;
  onNavigate?: () => void; // ← нэм
};

export default function SearchResultList({
  word,
  results,
  onClose,
  onNavigate,
}: Props) {
  const router = useRouter();

  if (!word || results.length === 0) return null;

  return (
    <div className="absolute left-0 top-11 z-50 w-[440px] rounded-md border bg-white shadow-lg">
      <ul className="max-h-[420px] overflow-y-auto">
        {results.slice(0, 8).map((movie) => (
          <li
            key={movie.id}
            onClick={() => {
              router.push(`/movieDetail/${movie.id}`);
              onClose();
            }}
            className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-100"
          >
            {/* Poster */}
            <div className="h-16 w-11 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  width={44}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300" />
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <p className="text-sm font-medium">{movie.title}</p>
              <p className="text-xs text-gray-500">
                {movie.release_date?.slice(0, 4) ?? "—"}
                {movie.vote_average
                  ? ` • ⭐ ${movie.vote_average.toFixed(1)}`
                  : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* See all */}
      <div
        onClick={() => {
          router.push(`/search?query=${encodeURIComponent(word)}`);
          onNavigate ? onNavigate() : onClose();
        }}
        className="cursor-pointer border-t px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
      >
        See all results for &quot;{word}&quot;
      </div>
    </div>
  );
}
