"use client";

import { useState } from "react";
import useSWR from "swr";
import SearchInput from "@/app/components/SearchInput";
import SearchResultList from "@/app/about/components/SearchResultList";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const API_KEY = process.env.NEXT_PUBLIC_MOVIE_KEY;

export default function MoviePage() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const url =
    text.trim().length > 0
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          text,
        )}&language=en-US&page=1`
      : null;

  const { data } = useSWR(url, fetcher);

  return (
    <div className="p-6">
      <div className="relative">
        <SearchInput
          value={text}
          onChange={(v) => {
            setText(v);
            setOpen(true);
          }}
          onEnter={() => {
            setOpen(true);
          }}
        />

        {open && (
          <SearchResultList
            word={text}
            results={data?.results ?? []}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
