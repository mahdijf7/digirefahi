import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { PaginationItem } from '@mui/material';
import { ColorWhite, ColorPrimary, ColorGreyLight } from 'assets/theme/color';
import { useTranslation } from 'react-i18next';

function DPagination({ totalPages = 1, current = 1, onPageChange, sx }) {
    const { t } = useTranslation();
    const [page, setPage] = useState(current);
    console.log(current, 123, page);

    const handlePageChange = (event, value) => {
        if (page === value) return;
        setPage(value);
        onPageChange(value);
    };

    const handlePrevClick = (event) => {
        if (page === 1) return;
        const newPage = page - 1;
        setPage(newPage);
        onPageChange(newPage);
    };

    const handleNextClick = (event) => {
        if (page === totalPages) return;
        const newPage = page + 1;
        setPage(newPage);
        onPageChange(newPage);
    };

    const prevButton = (
        <Box sx={prevButtonStyle} onClick={handlePrevClick} disabled={page === 1}>
            {t('dashboard.previous')}
        </Box>
    );

    const nextButton = (
        <Box sx={nextButtonStyle} onClick={handleNextClick} disabled={page === totalPages}>
            {t('dashboard.next')}
        </Box>
    );
    useEffect(() => {
        setPage(() => current);
    }, [current]);

    return (
        <Box sx={{ display: totalPages > 1 ? 'flex' : 'none', justifyContent: 'center', ...sx }}>
            <Pagination
                variant="outlined"
                shape="rounded"
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                boundaryCount={1}
                siblingCount={1}
                renderItem={(item) => {
                    if (item.type === 'previous') return prevButton;

                    if (item.type === 'next') return nextButton;

                    return (
                        <PaginationItem
                            {...item}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: ColorPrimary,
                                    color: `${ColorWhite} !important`,
                                    fontWeight: 'bold',
                                    borderTop: 'none !important',
                                    borderBottom: 'none !important',
                                },
                            }}
                        />
                    );
                }}
                sx={paginationItemStyles}
            />
        </Box>
    );
}

const styleButton = {
    border: `.2rem solid ${ColorGreyLight}`,
    bgcolor: ColorWhite,
    color: ColorPrimary,
    height: '32px',
    padding: '0px 12px',
    fontSize: '12px',
};
const prevButtonStyle = {
    ...styleButton,
    borderLeft: 'none',
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
};
const nextButtonStyle = {
    ...styleButton,
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
};
const paginationItemStyles = {
    '& .MuiPaginationItem-root': {
        border: 'none',
        borderTop: `2px solid ${ColorGreyLight}`,
        borderBottom: `2px solid ${ColorGreyLight}`,
        borderRight: `2px solid ${ColorGreyLight}`,
        color: ColorPrimary,
        margin: 0,
        borderRadius: 0,
        height: '32px',
    },
};

export default DPagination;
