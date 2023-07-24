import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid, Button, Typography, Stack, Rating, Box } from '@mui/material';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// Utils
import dashboardService from 'service/api/dashboardService';
import { getErrorTranslation } from 'utils/helpers';

// Components
import DDialogWrapper from 'components/new/shared/DDialog/DDialogWrapper';
import CustomInputAutosize from 'components/Common/Form/CustomInputAutosize';

const DServiceDetailCommentDialog = ({ onClose, onSave }) => {
    const { serviceId } = useParams();
    const [loading, setLoading] = useState({ add: false });
    const [score, setScore] = useState(5);
    const { t } = useTranslation();

    const Validation_Schema = Yup.object({
        comment: Yup.string('').required(getErrorTranslation(t('errors.required'), { name: 'متن نظر' })),
    });

    const addComment = async (values, actions) => {
        if (loading.add) return;
        setLoading({ add: true });
        console.log(values);
        const queryString = new URLSearchParams();
        if (values.comment) queryString.append('comment', values.comment);
        queryString.append('score', score);

        await dashboardService
            .create(`comments/${serviceId}?${queryString.toString()}`)
            .then((res) => {
                onSave(t('commentAddedSuccessfully'));
            })
            .catch((err) => {
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
            });
        setLoading({ save: false });
    };

    return (
        <DDialogWrapper bodyStyles={{ padding: '26px 44px 20px 44px' }} open onClose={onClose}>
            <Formik validationSchema={Validation_Schema} initialValues={{ comment: '' }} onSubmit={addComment}>
                {(values) => (
                    <Form>
                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography fontSize="18px" sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MessageOutlinedIcon sx={{ color: '#0877BD', fontSize: '20px' }} />
                                    ثبت نظر
                                </Typography>

                                <Rating
                                    name="score-controlled"
                                    value={score}
                                    size="large"
                                    onChange={(event, newValue) => {
                                        setScore(newValue);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} mt="33px">
                                <CustomInputAutosize
                                    name="comment"
                                    minRows={5}
                                    placeholder={t('writeYourComment')}
                                    sx={{
                                        border: '1px solid #8C8C8C',
                                        p: '16px 22px',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', mt: '20px' }}>
                                <Stack spacing="20px" direction="row" useFlexGap sx={{ mr: 'auto' }}>
                                    <Button
                                        component="span"
                                        variant="outlined"
                                        sx={{ fontSize: '14px', minWidth: '110px' }}
                                        disabled={loading.add}
                                        onClick={onClose}>
                                        انصراف
                                    </Button>
                                    <LoadingButton
                                    type="submit"
                                        variant="contained"
                                        sx={{ fontSize: '14px', minWidth: '110px' }}
                                        loading={loading.add}>
                                        ثبت نظر
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </DDialogWrapper>
    );
};

export { DServiceDetailCommentDialog };
