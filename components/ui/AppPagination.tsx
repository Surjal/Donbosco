"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function AppPagination({ currentPage, lastPage, onPageChange }: Props) {
  return (
    <Pagination>
      <PaginationContent className="gap-2">
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`cursor-pointer transition-colors duration-300 ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "text-text-muted hover:text-primary hover:bg-light-primary"
            }`}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
              className={`cursor-pointer transition-colors duration-300 ${
                page === currentPage
                  ? "bg-primary text-white shadow-md border-primary hover:bg-primary/90 hover:text-white"
                  : "text-text-muted hover:text-primary hover:bg-light-primary border-transparent"
              }`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < lastPage && onPageChange(currentPage + 1)
            }
            className={`cursor-pointer transition-colors duration-300 ${
              currentPage === lastPage
                ? "pointer-events-none opacity-50"
                : "text-text-muted hover:text-primary hover:bg-light-primary"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
