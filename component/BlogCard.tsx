import Link from "next/link";
import { FiBookOpen, FiChevronRight, FiPlay } from "react-icons/fi";
import { display } from "./Section";
import { formatDate, readingMinutes, tones, type Post } from "./blogData";

export const BlogCard = ({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) => {
  const tone = tones[post.tone];

  return (
    <Link
      href={`/blog/${post.slug}`}
      data-cursor="View"
      className={`group flex h-full overflow-hidden rounded-3xl transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(15,43,34,0.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${tone.card} ${
        featured ? "flex-col lg:flex-row" : "flex-col"
      }`}
    >
      {/* Cover: the video thumbnail, or the plan's tint with an icon */}
      <div
        aria-hidden="true"
        className={`relative aspect-video shrink-0 overflow-hidden ${
          featured ? "lg:aspect-auto lg:w-[58%]" : ""
        }`}
      >
        {post.videoId ? (
          <>
            {/* Plain <img> so no next.config image domain setup is needed */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${post.videoId}/hqdefault.jpg`}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute inset-0 bg-[#0F2B22]/25" />
            <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#5BC493] text-[#0F2B22] shadow-lg transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none">
              <FiPlay size={26} className="ml-0.5 fill-current" />
            </span>
          </>
        ) : (
          <span
            className={`absolute left-6 top-6 flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:transform-none sm:left-8 sm:top-8 ${tone.chip}`}
          >
            <FiBookOpen size={26} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <span className={`w-fit  px-3 py-1 text-xs font-medium ${tone.chip}`}>
          {post.category}
        </span>

        <h3
          className={`${display} mt-4 font-bold tracking-tight ${
            featured
              ? "text-2xl leading-8 sm:text-[28px] sm:leading-9"
              : "text-xl leading-7"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[#0F2B22]/70">
          {post.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-6 text-sm text-[#0F2B22]/65">
          <p className="flex gap-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{readingMinutes(post)} min read</span>
          </p>
          <span className="inline-flex items-center gap-1 text-[15px] font-medium text-[#0F2B22]">
            <span className="underline-offset-4 group-hover:underline">
              Read
            </span>
            <FiChevronRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};
