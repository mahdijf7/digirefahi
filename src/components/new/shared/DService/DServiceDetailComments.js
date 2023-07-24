import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Grid, Button, Rating, Avatar } from '@mui/material';

// Utils
import dashboardService from 'service/api/dashboardService';

// Components
import DLoadingWrapper from '../DLoadingWrapper';
import DSnackbar from 'components/new/shared/DSnackbar';
import DPagination from 'components/new/shared/DPagination/Index';
import { DServiceDetailCommentDialog } from './DServiceDetailCommentDialog';

const DServiceDetailComments = ({}) => {
    const { serviceId } = useParams();
    const [comments, setComments] = useState(false);
    const [loading, setLoading] = useState({ initial: true, refresh: false });
    const [newCommentDialogIsOpen, setNewCommentDialogIsOpen] = useState(false);
    const [filters, setFilters] = useState({ page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const handlePageChange = (newPage) => {
        if (loading.refresh) return;
        setLoading({
            ...loading,
            refresh: true,
        });
        setFilters({ page: newPage });
    };
    const toggleNewCommentDialog = () => {
        setNewCommentDialogIsOpen(!newCommentDialogIsOpen);
    };
    const commnetAddedHandler = (message) => {
        if (loading.refresh) return;
        setLoading({ ...loading, refresh: true });

        setSnackBarData({
            show: true,
            data: {
                text: message,
                type: 'success',
            },
        });
        toggleNewCommentDialog();
        setFilters({ ...filters });
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const queryStrings = new URLSearchParams();
        queryStrings.append('page', filters.page);

        (async () => {
            await dashboardService
                .get(`comments/${serviceId}?${queryStrings.toString()}`, { signal })
                .then((res) => {
                    setComments(res.data.data);
                    setTotalPage(res.data.meta.last_page);
                })
                .catch((err) => {
                    console.log(5555555);
                });

            setLoading({
                initial: false,
                refresh: false,
            });
        })();

        return () => controller.abort();
    }, [filters]);

    return (
        <DLoadingWrapper loading={loading.initial} sx={{ mt: '24px' }}>
            {comments && (
                <Grid container sx={{ pt: '18px' }} className={loading.refresh && 'box--isLoading'}>
                    <Grid item xs={12}>
                        <Grid container spacing="20px">
                            {comments.length === 0 && (
                                <Grid item xs={12}>
                                    <Typography>برای این سرویس نظری ثبت نشده است.</Typography>
                                </Grid>
                            )}
                            {comments.map((comment) => (
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'grid', p: '10px 15px', borderRadius: '5px', border: '1px solid #EEE' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: '12px' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                {comment.avatar && (
                                                    <Avatar src={`${process.env.REACT_APP_STORAGE_URL}/${comment.avatar}`} />
                                                )}
                                                <Typography color="common.black" fontSize="12px">
                                                    {comment.name}
                                                </Typography>
                                            </Box>
                                            <Rating readOnly value={comment.score} size="large" sx={{ mr: 'auto' }} />
                                        </Box>
                                        <Typography sx={{ fontSize: '12px', color: '#8C8C8C' }}>{comment.comment}</Typography>
                                    </Box>
                                </Grid>
                            ))}

                            <Grid item xs={12} mt="20px" sx={{ display: 'flex', justifyContent: 'center' }}>
                                {totalPage > 1 && (
                                    <DPagination current={filters.page} totalPages={totalPage} onPageChange={handlePageChange} />
                                )}
                                <Button
                                    variant="contained"
                                    sx={{ fontSize: '14px', minWidth: '110px', mr: 'auto' }}
                                    onClick={toggleNewCommentDialog}>
                                    ثبت نظر
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {newCommentDialogIsOpen && (
                        <DServiceDetailCommentDialog onSave={commnetAddedHandler} onClose={toggleNewCommentDialog} />
                    )}
                    <DSnackbar
                        open={snackBarData.show}
                        info={snackBarData.data}
                        onClose={() => setSnackBarData({ ...snackBarData, show: false })}
                    />
                </Grid>
            )}
        </DLoadingWrapper>
    );
};

export { DServiceDetailComments };
