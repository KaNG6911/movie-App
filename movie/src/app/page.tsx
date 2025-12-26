import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
// import { MovieCard } from "./components/MovieCard";
import { MoviesAll } from "./components/MoviesAll";

export default async function Home() {
  return (
    <div>
      <Header />
      <div>
        <MoviesAll />
      </div>
      <Footer />
    </div>
  );
}
