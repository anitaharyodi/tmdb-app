"use client"
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const getPopularMovies = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();
  return data;
};

const HeroSlider = async () => {
  const data = await getPopularMovies();
  const top5Movies = data.results.slice(0, 5);
  const imageURL = "https://image.tmdb.org/t/p/original/";

  return (
    <section className="max-w-full w-full h-screen overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="flex w-full h-full">
          {top5Movies.map((data, index) => (
            <CarouselItem
              key={data.id + "bannerHome" + index}
              className="w-full h-full p-0"
            >
              <div className="relative w-full h-full group transition-all">
                <div className="w-full h-full">
                  <Image
                    alt="test"
                    width={1000}
                    height={600}
                    src={imageURL + data.backdrop_path}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-0 w-full h-full bg-black opacity-30"></div>
                </div>
                <div className="absolute bottom-8 left-14 w-full max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data?.title || data?.name}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2 text-white">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4 text-white">
                    <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <Link href={"/" + data?.media_type + "/" + data.id}>
                    <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105">
                      Play Now
                    </button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
        <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 fill-black" />
      </Carousel>
    </section>
  );
};

export default HeroSlider;
