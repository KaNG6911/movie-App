type Genre = {
  id: number;
  name: string;
};

type Props = {
  genres: Genre[];
};

export default function MovieGenres({ genres }: Props) {
  if (!genres || genres.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => (
        <span
          key={g.id}
          className="rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 text-xs"
        >
          {g.name}
        </span>
      ))}
    </div>
  );
}