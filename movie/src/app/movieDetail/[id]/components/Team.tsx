import { writer } from "repl";
import { CastMember } from "../../../../..";
import { CrewMember } from "../../../../..";

type Props = {
  movieId: String;
};

const fetchCredits = async (id: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOVIE_KEY}`,
      },
    },
  );
  const data = await response.json();
  return data;
};

export const Team = async ({ movieId }: { movieId: string }) => {
  const result = await fetchCredits(movieId);

  const cast: CastMember[] = result.cast || [];
  const crew: CrewMember[] = result.crew || [];

  const director = crew.find((member) => member.job === "Director");

  const writers = new Set(
    crew
      .filter((member) => member.department === "Writing")
      .slice(0, 4)
      .map(({ name }) => name),
  );
  const stars = cast.slice(0, 3);

  return (
    <div className=" flex flex-col gap-5">
      <div className="flex gap-20 border-b-2 pb-5">
        <div className="font-semibold">Director</div>
        <div>{director?.name}</div>
      </div>
      <div className=" flex gap-21.5 border-b-2 pb-5">
        <span className="font-semibold">Writers</span>
        <div className="flex gap-5">
          {Array.from(writers).map((writer, index) => (
            <span key={index}>
              {index == 0 ? "" : " · "}
              {writer}
            </span>
          ))}
        </div>
      </div>
      <div
        className="flex gap-25.5
       border-b-2 pb-5 "
      >
        <div className="font-semibold">Stars</div>
        <div className="flex gap-5">
          {stars.map((star, index) => (
            <span key={index}>
              {index == 0 ? "" : " · "}
              {star.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
