import React from 'react';

/**
 * Shared pagination control. Renders nothing when there's a single page.
 *
 *   <Pagination page={page} totalPages={totalPages} onChange={setPage} />
 */
const Pagination = ({ page, totalPages, onChange }) => {
    if (!totalPages || totalPages <= 1) return null;

    const btn =
        "px-4 py-1.5 rounded-full text-sm font-semibold text-background bg-accent-100 " +
        "hover:opacity-90 active:scale-95 duration-200 disabled:opacity-30 " +
        "disabled:cursor-not-allowed disabled:active:scale-100";

    return (
        <div className="w-full flex justify-center items-center pt-8 gap-3">
            <button disabled={page <= 1} onClick={() => onChange(page - 1)} className={btn}>
                <span className="sm:hidden">Prev</span>
                <span className="hidden sm:inline">Previous</span>
            </button>
            <p className="text-text/70 font-medium text-xs sm:text-sm text-center min-w-[80px]">
                Page {page} of {totalPages}
            </p>
            <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className={btn}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
