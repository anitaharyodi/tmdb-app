import HeroSlider from "@/components/layout/hero-slider";
import MovieList from "@/components/layout/movie-list";
import { fetchMovies } from "@/lib/services/listMovie";

export default async function Home() {
  const [nowPlaying, popular, upcoming] = await Promise.all([
    fetchMovies("now_playing"),
    fetchMovies("popular"),
    fetchMovies("upcoming"),
  ]);

  const imageURL = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="flex-col justify-center items-center h-full w-full">
      <HeroSlider />
      <div className="container mx-auto">
        <MovieList title="Now Playing" movies={nowPlaying} imageURL={imageURL} />
        <MovieList title="Popular" movies={popular} imageURL={imageURL} />
        <MovieList title="Upcoming" movies={upcoming} imageURL={imageURL} />

      </div>
    </div>
  );
}
