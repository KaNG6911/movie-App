import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
// import { MovieCard } from "./components/MovieCard";
import { Movies } from "./components/MovieCard";
import { TopRated } from "./components/TopRated";

export default async function Home() {
  
  return (
    <div>
      <Header />
      <div>
        <TopRated />
      </div>
      <Footer />
    </div>
  );
}
