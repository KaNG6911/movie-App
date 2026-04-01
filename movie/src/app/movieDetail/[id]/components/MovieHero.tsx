"use client";

import { useState } from "react";
import TrailerModal from "@/app/about/components/TrailerModal.tsx";

const IMG_BASE = "https://image.tmdb.org/t/p";

type Genre = {
  id: number;
  name: string;
};

type Trailer = {
  key: string;
  name: string;
};

type Props = {
  posterPath: string | null;
  backdropPath: string | null;
  trailer: Trailer | undefined;
  genres: Genre[];
  overview: string;
};

export default function MovieHero({ posterPath, backdropPath, trailer, genres, overview }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [playingDesktop, setPlayingDesktop] = useState(false);

  return (
    <div>
      {/* Mobile-only: backdrop + Play trailer button → opens fullscreen modal */}
      <div className="md:hidden relative w-full rounded-xl overflow-hidden bg-black aspect-video">
        {backdropPath ? (
          <img
            src={`${IMG_BASE}/w1280${backdropPath}`}
            alt="backdrop"
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
        {trailer && (
          <button onClick={() => setModalOpen(true)} className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 bg-black/60 hover:bg-black/80 transition text-white border border-white px-5 py-3 rounded-full text-sm font-medium">
              <span className="text-lg">▶</span>
              Play trailer
            </div>
          </button>
        )}
      </div>

      <TrailerModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        videoId={modalOpen && trailer ? trailer.key : null}
      />

      {/* Shared row: poster + mobile genres/overview OR desktop trailer */}
      <div className="flex gap-4 mt-4 md:mt-0 md:h-96">
        {/* Poster */}
        <div className="shrink-0 w-32 md:w-1/3 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-lg md:shadow-none self-start md:self-auto">
          {posterPath ? (
            <img
              src={`${IMG_BASE}/w500${posterPath}`}
              alt="poster"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full aspect-2/3 flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Mobile-only: genres + overview */}
        <div className="md:hidden flex flex-col gap-3 pt-2 min-w-0 flex-1">
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <span key={g.id} className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs">
                  {g.name}
                </span>
              ))}
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{overview}</p>
        </div>

        {/* Desktop-only: trailer (right 2/3) */}
        <div className="hidden md:block relative flex-1 rounded-xl overflow-hidden bg-black">
          {playingDesktop && trailer ? (
            <>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                onClick={() => setPlayingDesktop(false)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </>
          ) : (
            <>
              {backdropPath && (
                <img
                  src={`${IMG_BASE}/w1280${backdropPath}`}
                  alt="backdrop"
                  className="w-full h-full object-cover opacity-80"
                />
              )}
              {trailer && (
                <button onClick={() => setPlayingDesktop(true)} className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 bg-black/60 hover:bg-black/80 transition text-white border border-white px-5 py-3 rounded-full text-sm font-medium">
                    <span className="text-lg">▶</span>
                    Play trailer
                  </div>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
