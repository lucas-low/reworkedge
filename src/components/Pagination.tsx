import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchTerm?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  searchTerm,
}: PaginationProps) {
  const getPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    params.set("page", pageNumber.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="flex justify-center space-x-2">
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        >
          Previous
        </Link>
      )}
      <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
        {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        >
          Next
        </Link>
      )}
    </div>
  );
}
