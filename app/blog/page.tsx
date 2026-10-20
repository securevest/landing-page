import type { Metadata } from "next";
import { BlogCard } from "@/component/BlogCard";
import { Section, SectionHeading } from "@/component/Section";
import { posts } from "@/component/blogData";

export const metadata: Metadata = {
  title: "Blog | SecureVest",
  description:
    "Videos and guides on saving with fixed, flexible and target savings.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <Section id="blog">
      <SectionHeading
        title="Saving, explained."
        description="Videos and guides on how each plan works and how to get started."
      />

      <div className="mt-12 sm:mt-16">
        {featured && <BlogCard post={featured} featured />}

        {rest.length > 0 && (
          <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
