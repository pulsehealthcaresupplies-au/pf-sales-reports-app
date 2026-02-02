/**
 * Table-style pagination footer: "Showing X to Y of Z entries", Rows per page, << < Page X of Y > >>
 * Same structure as admin-dashboard Users page for consistent UX.
 */

import React from 'react';

export interface TablePaginationFooterProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  itemLabel?: string;
  alwaysShow?: boolean;
  className?: string;
}

export function TablePaginationFooter({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  itemLabel = 'entries',
  alwaysShow = false,
  className = '',
}: TablePaginationFooterProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (!alwaysShow && totalPages <= 1) return null;

  const start = totalCount === 0 ? 0 : Math.min((currentPage - 1) * pageSize + 1, totalCount);
  const end = Math.min(currentPage * pageSize, totalCount);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-4 px-2 py-4 border-t border-default-200 ${className}`}
      role="navigation"
      aria-label="Table pagination"
    >
      <div className="flex items-center gap-2 text-sm text-default-500">
        <span>
          Showing {start} to {end} of {totalCount} {itemLabel}
        </span>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-default-500">Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 w-[70px] rounded-md border border-default-200 bg-default-100 text-default-900 text-sm px-2"
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-default-200 bg-default-100 text-default-700 hover:bg-default-200 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="First page"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-default-200 bg-default-100 text-default-700 hover:bg-default-200 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Previous page"
          >
            ‹
          </button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium text-default-700">
            Page {currentPage} of {totalPages}
          </div>
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-default-200 bg-default-100 text-default-700 hover:bg-default-200 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Next page"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-default-200 bg-default-100 text-default-700 hover:bg-default-200 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Last page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
