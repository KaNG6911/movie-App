"use client";

import CarouselMovieContent from "./Carousel";
import TrailerModal from "@/app/about/components/TrailerModal.tsx";
import { getMovieTrailer } from "@/lib/getMovieTrailer";
import { Movie } from "../../../../index";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";

export default function NowPlayingCarousel({ movies }: { movies: Movie[] }) {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const handleWatchTrailer = async (movieId: number) => {
    setLoading(true);
    setVideoId(null);
    setOpen(true);
    try {
      const key = await getMovieTrailer(movieId);
      setVideoId(key);
    } finally {
      setLoading(false);
    }
  };

  const current = movies[currentIndex];

  return (
    <div>
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.id}>
                <CarouselMovieContent
                  movie={movie}
                  onWatchTrailer={() => handleWatchTrailer(movie.id)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 h-10 w-10 bg-black/40 text-white hover:bg-black/60" />
          <CarouselNext className="right-2 h-10 w-10 bg-black/40 text-white hover:bg-black/60" />
        </Carousel>

        {/* Dots — зурагны дотор доод хэсэгт (mobile only) */}
        <div className="md:hidden absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile only: Now Playing мэдээлэл */}
      <div
        className="md:hidden"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <div className="border-t" style={{ borderColor: "var(--border)" }}></div>

        {current && (
          <div className="px-6 pt-4 pb-3 flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest opacity-50">Now Playing</p>
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-2xl font-bold truncate">{current.title}</h1>
              <span className="text-xl font-semibold shrink-0">⭐ {current.vote_average.toFixed(1)}<span className="text-sm font-normal opacity-50">/10</span></span>
            </div>
            <p className="text-sm opacity-70">{current.overview}</p>
            <button
              onClick={() => handleWatchTrailer(current.id)}
              className="w-fit mt-1 px-5 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              ▶ Watch Trailer
            </button>
          </div>
        )}
      </div>

      <TrailerModal
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setVideoId(null);
        }}
        videoId={videoId}
      />

      {open && loading && (
        <div className="fixed inset-0 z-50 grid place-items-center">
          <div className="rounded-md bg-black/70 px-4 py-2 text-white text-sm">
            Loading trailer...
          </div>
        </div>
      )}
    </div>
  );
}
