import Link from "next/link";

interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}

export default function BlogPost({
  title,
  date,
  excerpt,
  slug,
}: BlogPostProps) {
  return (
    <article className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          <Link
            href={`/posts/${slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{date}</p>
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/posts/${slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors duration-200"
        >
          Read more
          <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
