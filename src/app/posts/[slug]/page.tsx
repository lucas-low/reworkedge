import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import Link from "next/link";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ""),
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "src/posts", `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to home
      </Link>
      <article className="prose dark:prose-invert lg:prose-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{data.date}</p>
        <div className="mt-8">
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
