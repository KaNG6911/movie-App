"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function GenrePicker({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<number[]>([]);

  React.useEffect(() => {
    const ids = searchParams.get("ids");
    setSelected(ids ? ids.split(",").map(Number).filter(Boolean) : []);
  }, [searchParams]);

  const toggleGenre = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const handleApply = () => {
    if (selected.length === 0) return;
    setOpen(false);
    router.push(`/genre?ids=${selected.join(",")}`);
  };

  const handleClear = () => {
    setSelected([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 px-3 gap-1.5 relative">
          <IoIosArrowDown className="text-base" />
          <span className="text-sm font-medium hidden md:inline">Genre</span>
          {selected.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-gray-900 text-white text-[10px] flex items-center justify-center">
              {selected.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-90 p-4" align="start">
        <div className="mb-3 text-sm text-muted-foreground">
          See lists of movies by genre
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {GENRES.map((g) => {
            const isSelected = selected.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => toggleGenre(g.id)}
                className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm transition ${
                  isSelected
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {g.name}
                {isSelected ? (
                  <span className="text-xs">✕</span>
                ) : (
                  <span className="text-gray-400 text-xs">{">"}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Apply / Clear */}
        <div className="flex justify-between items-center border-t pt-3">
          <button
            onClick={handleClear}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            disabled={selected.length === 0}
            className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded-full disabled:opacity-40 hover:bg-gray-700 transition"
          >
            See movies →
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
