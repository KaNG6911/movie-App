"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
};

export default function SearchInput({ value, onChange, onEnter }: Props) {
  return (
    <div className="flex  items-center relative">
      <CiSearch className=" flex gap-1.5 absolute  left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        className="flex gap-2 pl-8"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter();
          }
        }}
      />
    </div>
  );
}
