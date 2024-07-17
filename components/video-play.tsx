import { fetchMovieVideos } from "@/lib/services/listMovie";
import { XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  movideId: string;
};

const VideoPlay = async ({ movideId }: Props) => {
  const video = await fetchMovieVideos(movideId);

  console.log(video);

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full  max-h-[80vh] max-w-screen-lg aspect-video rounded  relative">
        <Link
          href={`/movie/${movideId}`}
          className=" absolute -right-1 -top-6 text-3xl z-50"
        >
          <XIcon />
        </Link>

        <iframe
          src={`https://www.youtube.com/embed/${video?.results[0]?.key}`}
          className="w-full h-full"
          title="YouTube video player"
        />
      </div>
    </section>
  );
};

export default VideoPlay;
