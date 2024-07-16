export const fetchMovies = async (category) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    );
    const data = await res.json();
    return data.results;
  };
  