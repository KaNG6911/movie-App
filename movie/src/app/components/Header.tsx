"use client";

import { useState, useEffect, Suspense } from "react";
import GenrePicker from "@/app/components/GenrePicker";
import SearchInput from "@/app/components/SearchInput";
import SearchResultList from "@/app/about/components/SearchResultList";
import { TbMovie } from "react-icons/tb";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string | null;
  vote_average?: number;
};

export const Header = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const TOKEN = process.env.NEXT_PUBLIC_MOVIE_KEY;

  useEffect(() => {
    const q = search.trim();
    if (!q) {
      setResults([]);
      setOpen(false);
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            accept: "application/json",
          },
        },
      );
      if (!res.ok) {
        setResults([]);
        setOpen(false);
        return;
      }
      const data = await res.json();
      setResults(data?.results ?? []);
      setOpen(true);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleEnter = () => {
    const q = search.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?query=${encodeURIComponent(q)}`);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearch("");
    setOpen(false);
  };

  return (
    <header className="border-b">
      {/* Desktop: always visible search + genre */}
      <div className="hidden md:flex items-center justify-between px-20 py-4 gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 italic text-indigo-700 font-bold shrink-0"
        >
          <TbMovie />
          <p>Movie Z</p>
        </Link>

        <div className="flex items-center gap-2 w-72">
          <Suspense>
            <GenrePicker value={genres} onChange={setGenres} />
          </Suspense>
          <div className="flex-1 relative">
            <SearchInput
              value={search}
              onChange={(v) => setSearch(v)}
              onEnter={handleEnter}
            />
            {open && (
              <SearchResultList
                word={search}
                results={results}
                onClose={() => setOpen(false)}
                onNavigate={() => {
                  setOpen(false);
                  setSearch("");
                }}
              />
            )}
          </div>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-9 w-9 border-2 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition shrink-0"
        >
          {mounted && (theme === "dark" ? (
            <MdOutlineLightMode className="text-xl" />
          ) : (
            <MdOutlineDarkMode className="text-xl" />
          ))}
        </button>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {searchOpen ? (
          <div className="flex items-center gap-2 px-4 py-4 relative">
            <Suspense>
              <GenrePicker value={genres} onChange={setGenres} />
            </Suspense>
            <div className="flex-1 relative">
              <SearchInput
                value={search}
                onChange={(v) => setSearch(v)}
                onEnter={handleEnter}
              />
              <button
                onClick={closeSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition text-base"
              >
                ✕
              </button>
              {open && (
                <SearchResultList
                  word={search}
                  results={results}
                  onClose={() => setOpen(false)}
                  onNavigate={() => {
                    setOpen(false);
                    setSearch("");
                    setSearchOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-4 py-4 gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 italic text-indigo-700 font-bold"
            >
              <TbMovie />
              <p>Movie Z</p>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="h-9 w-9 border-2 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <CiSearch className="text-xl" />
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 border-2 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {mounted && (theme === "dark" ? (
                  <MdOutlineLightMode className="text-xl" />
                ) : (
                  <MdOutlineDarkMode className="text-xl" />
                ))}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
