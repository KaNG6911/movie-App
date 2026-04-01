type Props = {
  title: string;
  releaseDate: string;
  runtime: number;
  voteAverage: number;
  voteCount: number;
  certification?: string;
};

function formatRuntime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}


export default function MovieMeta({ title, releaseDate, runtime, voteAverage, voteCount, certification }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-3xl font-bold truncate">{title}</h1>
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-lg">★</span>
            <span className="font-bold text-gray-800 dark:text-gray-100 text-lg">{voteAverage.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">/10</span>
          </div>
          <span className="text-xs text-gray-400">{(voteCount / 1000).toFixed(1)}k</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
        <span>{releaseDate.replace(/-/g, ".")}</span>
        {certification && (
          <>
            <span>·</span>
            <span>{certification}</span>
          </>
        )}
        <span>·</span>
        <span>{formatRuntime(runtime)}</span>
      </div>
    </div>
  );
}
