type CrewMember = {
  id: number;
  name: string;
  job: string;
};

type CastMember = {
  id: number;
  name: string;
  character: string;
};

type Props = {
  director: CrewMember | undefined;
  writers: CrewMember[];
  stars: CastMember[];
};

export default function MovieCredits({ director, writers, stars }: Props) {
  return (
    <div className="text-sm">
      {director && (
        <div className="flex gap-2 py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-base font-bold w-20">Director</span>
          <span className="text-gray-700 dark:text-gray-300">{director.name}</span>
        </div>
      )}
      {writers.length > 0 && (
        <div className="flex gap-2 py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-base font-bold w-20">Writers</span>
          <span className="text-gray-700 dark:text-gray-300">{writers.map((w) => w.name).join(", ")}</span>
        </div>
      )}
      {stars.length > 0 && (
        <div className="flex gap-2 py-3 border-b border-gray-200 dark:border-gray-700">
          <span className="text-base font-bold w-20">Stars</span>
          <span className="text-gray-700 dark:text-gray-300">{stars.map((s) => s.name).join(", ")}</span>
        </div>
      )}
    </div>
  );
}
