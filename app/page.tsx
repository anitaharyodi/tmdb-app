import HeroSlider from "@/components/layout/hero-slider";
import MovieList from "@/components/layout/movie-list";
import { fetchMovies } from "@/lib/services/listMovie";

const Home = async () => {
  const [nowPlaying, popular, upcoming, top5Movies] = await Promise.all([
    fetchMovies("now_playing"),
    fetchMovies("popular"),
    fetchMovies("upcoming"),
    fetchMovies("popular").then(movies => movies.slice(0, 5)),
  ]);
  const imageURL = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="flex-col justify-center items-center h-full w-full">
      <HeroSlider top5Movies={top5Movies} imageURL={imageURL} />
      <div className="container mx-auto">
        <MovieList
          title="Now Playing"
          movies={nowPlaying}
          imageURL={imageURL}
        />
        <MovieList title="Popular" movies={popular} imageURL={imageURL} />
        <MovieList title="Upcoming" movies={upcoming} imageURL={imageURL} />
      </div>
    </div>
  );
};

export default Home;
