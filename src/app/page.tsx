import fs from "fs";
import path from "path";
import matter from "gray-matter";
import DynamicPosts from "@/components/DynamicPosts";

export default function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const searchTerm = searchParams.search?.toLowerCase() || "";
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm),
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
        {searchTerm ? `Search Results for "${searchTerm}"` : "Latest Posts"}
      </h1>
      <DynamicPosts posts={filteredPosts} searchTerm={searchTerm} />
    </div>
  );
}
