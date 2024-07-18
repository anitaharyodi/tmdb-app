
import Divider from "@/components/ui/divider";
import VideoPlay from "@/components/video-play";
import { fetchMovieById } from "@/lib/services/listMovie";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

type Props = {
  params: {
    movieId: string;
  };
  searchParams: {
    play: string;
  };
};

// export async function generateMetamovie({
//   params,
// }: {
//   params: {
//     movieId: string;
//   };
// }) {
//   const movie = await fetchMovieById(params.movieId);

//   return {
//     title: movie.title,
//     description: movie.overview,
//     keywords: movie.genres.map((genre) => genre.name).join(", "),
//   } as Metadata;
// }

const DetailMovie = async ({ params, searchParams }: Props) => {
  const { movieId } = params;
  const isPlay = searchParams.play === "true";

  const movie = await fetchMovieById(movieId);

  const duration = (movie?.runtime / 60)?.toFixed(1)?.split(".");

  const imageURL = "https://image.tmdb.org/t/p/original";
  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <Image
            src={imageURL + movie?.backdrop_path}
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            alt={movie?.title}
          />
         <Link
            href="/"
            className="absolute top-16 left-20 z-10 flex items-center text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <HomeIcon className="h-6 w-6 mr-2" />
            <p className="text-sm">Back to Home</p>
          </Link>
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <Image
            src={imageURL + movie?.poster_path}
            className="h-80 w-60 object-cover rounded"
            width={300}
            height={450}
            alt={movie?.title}
          />
          <Link
            href={`/movie/${movieId}?play=true`}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all block"
          >
            Play Now
          </Link>
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl lg:-mt-16 absolute font-bold text-white ">
            {movie?.title}
          </h2>
          <p className="text-neutral-400 -mt-6 absolute">{movie?.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>Rating : {Number(movie?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>View : {Number(movie?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{movie?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Staus : {movie?.status}</p>
              <span>|</span>
              <p>
                Release Date :{" "}
                {new Date(movie?.release_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span>|</span>
              <p>Revenue : {Number(movie?.revenue)}</p>
            </div>
            <Divider />
          </div>
        </div>
      </div>
      {isPlay && <VideoPlay movideId={movieId} />}
    </div>
  );
};

export default DetailMovie;
