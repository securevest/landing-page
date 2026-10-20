"use client";

import { useState } from "react";
import { FiPlay } from "react-icons/fi";

/** Big 16:9 player. YouTube only loads after the visitor presses play. */
export const YouTubePlayer = ({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#0F2B22]/10 bg-[#0F2B22]">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#5BC493]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.includes("hqdefault")) {
                img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
          <span className="absolute inset-0 bg-[#0F2B22]/30 transition-colors duration-200 group-hover:bg-[#0F2B22]/15 motion-reduce:transition-none" />
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#5BC493] text-[#0F2B22] shadow-lg transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none sm:size-24">
            <FiPlay
              size={36}
              aria-hidden="true"
              className="ml-1 fill-current"
            />
          </span>
        </button>
      )}
    </div>
  );
};
