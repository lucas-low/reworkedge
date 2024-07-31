"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogPost from "./BlogPost";
import Pagination from "./Pagination";

const POST_OPTIONS = [5, 10, 20, 50];
const DEFAULT_POSTS_PER_PAGE = 10;

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface DynamicPostsProps {
  posts: Post[];
  searchTerm: string;
}

export default function DynamicPosts({ posts, searchTerm }: DynamicPostsProps) {
  const [postsPerPage, setPostsPerPage] = useState(DEFAULT_POSTS_PER_PAGE);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    const stored = localStorage.getItem("postsPerPage");
    if (stored && POST_OPTIONS.includes(Number(stored))) {
      setPostsPerPage(Number(stored));
    }
  }, []);

  useEffect(() => {
    const maxPage = Math.ceil(posts.length / postsPerPage);
    if (page > maxPage) {
      router.push(
        `/?page=${maxPage}${searchTerm ? `&search=${searchTerm}` : ""}`,
      );
    }
  }, [postsPerPage, posts.length, page, router, searchTerm]);

  const handlePostsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPostsPerPage = Number(e.target.value);
    setPostsPerPage(newPostsPerPage);
    localStorage.setItem("postsPerPage", newPostsPerPage.toString());
  };

  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (posts.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400">
        No posts found matching your search.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <label className="mr-2">Posts per page:</label>
        <select
          value={postsPerPage}
          onChange={handlePostsPerPageChange}
          className="border rounded p-1"
        >
          {POST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-6 sm:space-y-8">
        {paginatedPosts.map((post) => (
          <BlogPost key={post.slug} {...post} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
}
