"use client";

import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { display, Section, SectionHeading } from "./Section";

// Featured video: https://youtu.be/MZK7Oi3V2J4
// To feature a different video, change VIDEO_ID (the part after youtu.be/).
const VIDEO_ID = "MZK7Oi3V2J4";

// Placeholder copy: replace with the real video title and summary.
const VIDEO_TITLE = "Watch the latest from SecureVest";
const VIDEO_SUMMARY =
  "See how SecureVest helps you save with confidence, and read more on our blog.";

export const Latest = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <Section id="latest">
      <SectionHeading
        title="The latest from SecureVest."
        description="Watch our newest video, then head to the blog for more on saving smarter."
      />

      <div className="mt-12 sm:mt-16">
        {/* Player: 16:9, loads YouTube only after the visitor presses play */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#0F2B22]/10 bg-[#0F2B22]">
          {playing ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title={VIDEO_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${VIDEO_TITLE}`}
              className="group absolute inset-0 size-full cursor-pointer focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#5BC493]"
            >
              {/* Plain <img> so no next.config image domain setup is needed */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                onError={(e) => {
                  // Some videos have no max-resolution thumbnail; use the smaller one.
                  const img = e.currentTarget;
                  if (!img.src.includes("hqdefault")) {
                    img.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
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

        {/* Caption + link to the blog */}
        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h3 className={`${display} text-lg font-semibold tracking-tight`}>
              {VIDEO_TITLE}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[#0F2B22]/70">
              {VIDEO_SUMMARY}
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#0F2B22]/15 bg-white/80 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors duration-200 hover:border-[#0F2B22]/50 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B6B47] motion-reduce:transition-none"
          >
            Read the blog
            <FiArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:transform-none"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
};
