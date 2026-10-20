import Link from "next/link";
import { FiArrowRight, FiCheck, FiChevronLeft } from "react-icons/fi";
import { BlogCard } from "./BlogCard";
import { display, Section, SectionHeading } from "./Section";
import {
  formatDate,
  posts,
  readingMinutes,
  tones,
  type Post,
} from "./blogData";
import { CTA_HREF, CTA_LABEL } from "./Savingsdata";
import { YouTubePlayer } from "./YouTubePlayer";

export const BlogArticle = ({ post }: { post: Post }) => {
  const tone = tones[post.tone];
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Section id="post">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#0F2B22]/70 transition-colors duration-200 hover:text-[#0F2B22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] motion-reduce:transition-none"
        >
          <FiChevronLeft aria-hidden="true" />
          All posts
        </Link>

        <article className="mt-6">
          <header className="max-w-3xl">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${tone.chip}`}
            >
              {post.category}
            </span>
            <h1
              className={`${display} mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl`}
            >
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#0F2B22]/70">
              {post.excerpt}
            </p>
            <p className="mt-5 flex gap-4 text-sm text-[#0F2B22]/65">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{readingMinutes(post)} min read</span>
            </p>
          </header>

          {post.videoId && (
            <div className="mt-10 sm:mt-12">
              <YouTubePlayer videoId={post.videoId} title={post.title} />
            </div>
          )}

          <div className="mt-10 max-w-2xl sm:mt-12">
            {post.body.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className={`${display} mt-10 text-2xl font-bold tracking-tight first:mt-0 sm:text-3xl`}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={i} className="mt-4 flex flex-col gap-3">
                    {block.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[17px] leading-relaxed text-[#0F2B22]/80"
                      >
                        <FiCheck
                          size={18}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-[#9A6200]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="mt-4 text-[17px] leading-relaxed text-[#0F2B22]/80 first:mt-0"
                >
                  {block.text}
                </p>
              );
            })}
          </div>
        </article>

        {/* Call to action */}
        <div
          className={`mt-14 flex flex-col gap-6 rounded-3xl p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between ${tone.card}`}
        >
          <div className="max-w-md">
            <h2
              className={`${display} text-2xl font-bold leading-8 tracking-tight`}
            >
              Ready to start saving?
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#0F2B22]/70">
              Pick an amount and a lock period, and see your payout before you
              commit.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href={CTA_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F2B22] px-6 py-3 text-[15px] font-medium text-[#F7F3E8] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] motion-reduce:transition-none"
            >
              {CTA_LABEL}
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/calculator"
              className="group inline-flex items-center gap-2 rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F2B22] sm:text-base"
            >
              <span className="underline-offset-4 group-hover:underline">
                Open the calculator
              </span>
              <FiArrowRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </Link>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section id="more-posts">
          <SectionHeading title="Keep reading." />
          <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
};
