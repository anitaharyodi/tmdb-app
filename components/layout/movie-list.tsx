"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { Card, CardContent, CardTitle } from "../ui/card";
import { MovieListProps } from "@/types/movies";
import { Heart } from "lucide-react";

const MovieList: React.FC<MovieListProps> = ({ title, movies, imageURL }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<boolean[]>(movies.map(() => false));

  const toggleFavorite = (index: number) => {
    const newFavoriteMovies = [...favoriteMovies];
    newFavoriteMovies[index] = !newFavoriteMovies[index];
    setFavoriteMovies(newFavoriteMovies);
    localStorage.setItem("favoriteMovies", JSON.stringify(newFavoriteMovies));
  };

  const [visibleMovies, setVisibleMovies] = useState(12);

  const showMoreMovies = () => {
    setVisibleMovies((prevVisibleMovies) =>
      prevVisibleMovies === 12 ? movies.length : 12
    );
  };

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-1">{title}</h2>
      <div className="border-2 border-red-700 w-56 mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.slice(0, visibleMovies).map((movie, index) => (
          <Card key={movie.id} className="h-80 relative">
            <Link href={`/movie/${movie.id}`} className="flex flex-col h-full">
              <Image
                src={imageURL + movie.poster_path}
                alt={movie.title}
                width={250}
                height={375}
                className="object-cover w-full h-48"
              />
              <CardContent className="p-2">
                <CardTitle className="text-md font-bold mb-2">{movie.title}</CardTitle>
                <p className="text-xs text-gray-300 mb-1">
                  {moment(movie.release_date).format("DD MMMM YYYY")}
                </p>
                <p className="text-xs text-gray-300">Rating: {movie.vote_average}</p>
              </CardContent>
            </Link>
            <button
              onClick={() => toggleFavorite(index)}
              className="absolute bottom-2 right-2 focus:outline-none"
            >
              {favoriteMovies[index] ? (
                <Heart size={20} color="#FF0000" fill="#FF0000"/>
              ) : (
                <Heart size={20} color="#FF0000" />
              )}
            </button>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={showMoreMovies}
          className="bg-orange-600 px-4 py-2 text-sm text-white rounded-xl hover:bg-orange-700 transition-colors"
        >
          {visibleMovies === 12 ? "See More" : "See Less"}
        </button>
      </div>
    </section>
  );
};

export default MovieList;
