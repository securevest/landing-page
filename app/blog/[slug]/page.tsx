import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/component/BlogArticle";
import { getPost, posts } from "@/component/blogData";

type Props = { params: Promise<{ slug: string }> };

// Every post is prebuilt. Unknown slugs are caught by notFound() below.
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | SecureVest`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return <BlogArticle post={post} />;
}
