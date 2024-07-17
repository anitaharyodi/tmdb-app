import { Movie, MovieDetails } from "../../types/movies";
export const fetchMovies = async (category: string): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
};

export const fetchMovieById = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data as MovieDetails;
};

export const fetchSimilarMovies = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data.results;
};

export const fetchMovieVideos = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );
  const data = await res.json();
  return data;
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    );
    const data = await res.json();
    return data.results.slice(0, 5);
  };
