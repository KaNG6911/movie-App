import Allmovie from "@/app/about/components/Allmovie";
import NowPlaying from "@/app/about/components/Nowplaying";

export default function Home() {
  return (
    <div>
      <NowPlaying />
      <Allmovie />
    </div>
  );
}
