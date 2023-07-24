import React, { useState } from 'react';
import { Grid, Box, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// Styles
import { ColorGreyBorder, ColorGrey, ColorBlack, ColorPrimary } from 'assets/theme/color';
import Atach from 'assets/icone/svg/Admin/Atach';
import Download from 'assets/icone/svg/Admin/Download';
import TrashBin from 'assets/icone/svg/Admin/TrashBin';
// Utils
import theme from 'assets/theme';

// Components
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import CustomInputNumber from 'components/Common/Form/CustomInputNumber';
import CustomInputDocument from 'components/Common/Form/CustomInputFile';

function ServiceListForm({ setOpen, handleSubmit, selectedService, loading, selectedFile, setSelectedFile }) {
    const { t } = useTranslation();

    const Validation_Schema = Yup.object({
        file: Yup.string().when([], {
            is: () => tiket,
            then: Yup.string().required('فایل اکسل الزامی است'),
            otherwise: Yup.string().nullable().notRequired(),
        }),
        value: Yup.string().when([], {
            is: () => !tiket,
            then: Yup.string().required('تعداد الزامی است'),
            otherwise: Yup.string().nullable().notRequired(),
        }),
    });
    const initialValues = {
        name: selectedService.name || '',
        currentInventory: selectedService.value || '',
        newInventory: '',
        value: '',
        file: selectedService.file || '',
    };

    const tiket = selectedService?.ticket_type === 'کد تخفیف';

    console.log(selectedService, 'mahdi', 34343423423423);

    const handleDownload = () => {
        const fileBlob = new Blob([selectedFile], { type: 'text/plain' });
        const fileUrl = URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = selectedFile.name;
        link.click();
        link.remove();
        URL.revokeObjectURL(fileUrl);
    };
    const handleSelectfile = (file) => {
        console.log(file);
        setSelectedFile(file);
        console.log(file, 'GETTING THE FILE DATA');
    };

    return (
        <Formik initialValues={initialValues} validationSchema={Validation_Schema} onSubmit={handleSubmit}>
            <Form>
                <Grid container spacing="2rem">
                    <Grid item sm={6}>
                        <CustomInputBase
                            sx={inputStyle}
                            showlabel="true"
                            name="name"
                            title={t('serviceList.serviceTitle')}
                            weight="true"
                            disabled
                        />
                    </Grid>

                    <Grid item sm={tiket ? 5 : 3}>
                        <CustomInputNumber
                            sx={inputStyle}
                            showlabel="true"
                            name="currentInventory"
                            title={t('serviceList.currentInventory')}
                            weight="true"
                            disabled
                        />
                    </Grid>

                    {!tiket && (
                        <Grid item sm={3}>
                            <CustomInputNumber
                                name="value"
                                sx={inputStyle}
                                title={'موجودی جدید'}
                                showlabel="true"
                                weight="true"
                            />
                        </Grid>
                    )}
                    <Grid item xs={6} sx={gridStyle}>
                        {tiket && (
                            <>
                                <Typography m="1rem" fontSize="1.3rem" fontWeight="bold">
                                    {'فایل جدید بن تخفیف'}
                                </Typography>
                                {!selectedFile && (
                                    <CustomInputDocument
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        onSelect={handleSelectfile}
                                        sx={buttonStyle}
                                        name="file">
                                        <Atach />
                                        {t('آپلود فایل اکسل')}
                                    </CustomInputDocument>
                                )}
                                {selectedFile && (
                                    <Box className="flex" gap=".4rem">
                                        <Button sx={linkStyle} onClick={handleDownload}>
                                            <Download />
                                            {t('newService.download')}
                                        </Button>
                                        <Box
                                            onClick={() => setSelectedFile(null)}
                                            sx={{ ...linkStyle, width: '15% !important', flexWrap: 'wrap', fontSize: '.7rem' }}>
                                            <span className="column" style={{ lineHeight: '1rem' }}>
                                                <TrashBin />
                                                {t('newService.remove')}
                                            </span>
                                        </Box>
                                    </Box>
                                )}
                            </>
                        )}
                    </Grid>

                    <CustomActionBox>
                        <LoadingButton sx={{ fontSize: '14px' }} variant="contained" type="submit" loading={loading}>
                            {t('serviceList.submit')}
                        </LoadingButton>
                        <Button variant="contained" sx={{ fontSize: '14px' }} color="brandWarning" onClick={() => setOpen(false)}>{t('serviceList.cancel')}</Button>
                    </CustomActionBox>
                </Grid>
            </Form>
        </Formik>
    );
}

export default ServiceListForm;
const { palette } = theme.main;

const gridStyle = {
    '& div': {
        border: 'none',
    },
};

const linkStyle = {
    cursor: 'pointer',
    width: '100%',
    bgcolor: 'common.white',
    height: '2.8rem',
    display: 'flex',
    justifyContent: 'center',
    color: ColorPrimary,
    borderRadius: '.5rem',
    gap: '.5rem',
    alignItems: 'center',
    fontSize: '1.1rem',
    border: `.1rem solid ${ColorPrimary} !important`,
    textDecoration: 'none',

    '&:hover': {
        bgcolor: 'common.white',
        color: ColorPrimary,
    },
};
const buttonStyle = {
    border: 'none !important',
    width: '100%',
    bgcolor: ColorPrimary,
    height: '2.8rem',
    display: 'flex',
    justifyContent: 'center',
    color: 'common.white',
    borderRadius: '.5rem',
    gap: '.5rem',
    alignItems: 'center',
    fontSize: '1.1rem',
    '&:hover': {
        bgcolor: ColorPrimary,
        color: 'common.white',
    },
    helper: {
        textAlign: 'right',
        top: '2rem',
        // left: '-5rem',
        width: '20rem',
        backgroundColor: 'green !important',
    },
};

const CustomActionBox = styled(Box)(({ theme }) => ({
    width: '60%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: ' 2rem auto 1rem 0',
    gap: '5%',
})); 

const inputStyle = {
    backgroundColor: palette.common.white,
    borderRadius: '.6rem !important',
    '& .MuiOutlinedInput-root': {
        fontSize: '1.1rem',
        height: '3.4rem !important',
        color: ` ${palette.common.black}`,
        '& fieldset': {
            border: `.1rem solid ${palette.info.border} `,
        },
    },
};
