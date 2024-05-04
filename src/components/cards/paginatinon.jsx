import React, { useState } from 'react';
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function HalamanPagination ({totalPosts, postsPerPage, setCurrentPage, currentPage}) {
    const [active, setActive] = useState(currentPage);

    const changePage = (page) => {
        setActive(page);
        setCurrentPage(page);
    };

    const next = () => {
        if (active === Math.ceil(totalPosts/postsPerPage)) return;
        changePage(active + 1);
    };

    const prev = () => {
        if (active === 1) return;
        changePage(active - 1);
    };

    const renderPaginationItems = () => {
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        const pageNumbers = [];

        let startPage = Math.max(1, active - 2);
        let endPage = Math.min(totalPages, startPage + 4);

        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map((page) => (
            <IconButton
                key={page}
                variant={active === page ? "filled" : "text"}
                color="gray"
                onClick={() => changePage(page)}
            >
                {page}
            </IconButton>
        ));
    };

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {renderPaginationItems()}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === Math.ceil(totalPosts/postsPerPage)}
            >
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
};
