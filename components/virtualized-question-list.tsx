"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/question-card";
import type { Question } from "@/lib/types";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <div className="flex items-center space-x-1">
        {totalPages <= 7 ? (
          // If 7 or fewer pages, show all page numbers
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              className="w-9"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))
        ) : (
          // If more than 7 pages, show ellipsis
          <>
            {/* First page */}
            <Button
              variant={currentPage === 1 ? "default" : "outline"}
              size="sm"
              className="w-9"
              onClick={() => onPageChange(1)}
            >
              1
            </Button>

            {/* Ellipsis or page numbers */}
            {currentPage > 3 && (
              <span className="px-2 text-muted-foreground">...</span>
            )}

            {/* Pages around current page */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page !== 1 &&
                  page !== totalPages &&
                  (page === currentPage - 1 ||
                    page === currentPage ||
                    page === currentPage + 1),
              )
              .map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  className="w-9"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              ))}

            {/* Ellipsis */}
            {currentPage < totalPages - 2 && (
              <span className="px-2 text-muted-foreground">...</span>
            )}

            {/* Last page */}
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="sm"
              className="w-9"
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export interface VirtualizedQuestionListProps {
  questions: (Question & {
    userAnswer: string | null;
    timeSpent: number;
  })[];
  pageSize?: number;
}

export function VirtualizedQuestionList({
  questions,
  pageSize = 10,
}: VirtualizedQuestionListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current page from URL or default to 1
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Calculate total pages
  const totalPages = Math.ceil(questions.length / pageSize);

  // Get current page questions
  const startIndex = (currentPage - 1) * pageSize;
  const currentQuestions = questions.slice(startIndex, startIndex + pageSize);

  // Update URL when page changes
  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);

      // Update URL with new page param
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`?${params.toString()}`, { scroll: false });

      // Scroll to top of the question list
      window.scrollTo({
        top: document.getElementById("question-list-top")?.offsetTop || 0,
        behavior: "smooth",
      });
    },
    [searchParams, router],
  );

  // If page is out of bounds, reset to page 1
  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      handlePageChange(1);
    }
  }, [currentPage, totalPages, handlePageChange]);

  return (
    <div className="space-y-6">
      <div id="question-list-top"></div>
      {currentQuestions.map((question, i) => {
        const absoluteIndex = startIndex + i;
        return (
          <QuestionCard
            key={question.id}
            question={question}
            index={absoluteIndex}
          />
        );
      })}

      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Show total questions count */}
      <div className="text-center text-sm text-muted-foreground mt-4">
        Showing {startIndex + 1}-
        {Math.min(startIndex + pageSize, questions.length)} of{" "}
        {questions.length} questions
      </div>
    </div>
  );
}
