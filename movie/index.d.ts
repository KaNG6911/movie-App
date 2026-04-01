export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
  runtime?: number;
  vote_count?: number;
  backdrop_path?: string | null;
  overview?: string;
  orignal_title?: string;
  genres?: { id: number; name: string }[];
};
export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};
export type CrewMember = {
  id: number;
  name: string;
  job: string;
  department: string;
};
