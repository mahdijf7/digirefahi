import React, { useState, useEffect } from 'react';
import { Box, Grid, FormGroup, FormControlLabel, Switch, Divider, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useFormikContext } from 'formik';

import Card from 'components/Common/Card/Card';

import { theme } from 'assets/theme/default';
import CustomInputNumber from 'components/Common/Form/CustomInputNumber';

import Atach from 'assets/icone/svg/Admin/Atach';
import Download from 'assets/icone/svg/Admin/Download';
import TrashBin from 'assets/icone/svg/Admin/TrashBin';
import IconeEye from 'assets/icone/svg/Admin/IconeEye';
import ClosedEye from 'assets/icone/svg/Admin/ClosedEye';
import NewServiceTable from 'components/Table/Admin/NewSrevice/NewServiceTable';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';

//api service

import { ColorPrimary } from 'assets/theme/color';
import { ColorGreyBorder, ColorGrey, ColorBlack } from 'assets/theme/color';
import CustomInputDocument from 'components/Common/Form/CustomInputDocument';
import { useNavigate } from 'react-router-dom';

const { palette } = theme;

function ConfirmService({
    setFieldValue,
    values,
    serviceData,
    selectedFile,
    setSelectedFile,
    handleChange,
    loading,
    setChecked,
    checked,
    company,
    companyData,
    setTiket,
    tiket,
    setCompanyData,
    setCompany,
    selectedtTiket,
    selectedCompany,
    selectedFileError,
}) {
    const formik = useFormikContext();
    const { t } = useTranslation();
    const [showTable, setShowTable] = useState(false);
    const { errors } = useFormikContext();
    const hasError = !!errors?.price;
    const navigate = useNavigate();

    const buttonIcon = !showTable ? <IconeEye /> : <ClosedEye />;
    const buttonTitle = !showTable ? t('newService.viewList') : t('newService.closeList');

    useEffect(() => {
        tiket === 1 && setFieldValue('value', '');
    }, [tiket]);
    return (
        <Card minHeight="22.6rem" mt="2rem" p="2rem">
            <Grid container spacing="2rem" mt="1rem">
                <Grid item xs={4} mt="2rem">
                    <CustomInputNumber
                        disabled={tiket === 1}
                        name="value"
                        placeholder={t('newService.numberOfService')}
                        sx={inputStyle}
                    />
                </Grid>
                <Grid item xs={4} mt="2rem">
                    <CustomInputNumber
                        name="order_limit"
                        title={t('newService.ceilingPerUser')}
                        placeholder={t('newService.ceilingPerUser')}
                        sx={inputStyle}
                    />
                </Grid>
                <Grid item xs={4} mt="2rem" mr="-1rem">
                    <FormGroup dir="ltr">
                        <FormControlLabel
                            control={<Android12Switch name="123" checked={checked} onChange={handleChange} />}
                            label={
                                <Typography width="100%" ml=".6em" variant="body21">
                                    {t('newService.serviceStatus')}
                                </Typography>
                            }
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={4} sx={{ mt: hasError ? '1rem' : '0' }}>
                    <DAutoComplete
                        name="ticket_type_id"
                        formControlStyle={autocompleteStyle}
                        buttonProps={{ label: 'کد تخفیف' }}
                        placeholder={'انتخاب کنید'}
                        isAsync
                        callOnOpen
                        searchOnType
                        apiPath={`admin/services-get-ticket-type`}
                        onSelect={selectedtTiket}
                    />
                </Grid>
                <Grid item xs={4} sx={{ mt: hasError ? '1rem' : '0' }}>
                    <DAutoComplete
                        name="companies_ides"
                        multiple
                        formControlStyle={autocompleteStyle}
                        buttonProps={{ label: 'دسترسی سازمان ها' }}
                        placeholder={'انتخاب کنید'}
                        isAsync
                        callOnOpen
                        searchOnType
                        apiPath={`admin/companies`}
                        onSelect={selectedCompany}
                    />
                </Grid>
                <Grid item xs={4} />
                <Grid item xs={4} mt="-2rem">
                    {tiket === 1 && (
                        <>
                            <Typography m="1rem" color="text.main" fontSize="1.1rem">
                                {t('newService.viewTheRelatedExcelFile') + ':'}
                            </Typography>
                            {selectedFile ? (
                                <Box className="flex" gap=".4rem">
                                    <Button
                                        sx={linkStyle}
                                        // onClick={selectedFile?.name ? handleDownload : undefined}
                                        href={process.env.REACT_APP_STORAGE_URL + '/' + selectedFile}>
                                        <Download />
                                        {t('newService.download')}
                                    </Button>
                                </Box>
                            ) : (
                                <Typography m="1rem" color="#D32F2F" fontSize="1.1rem">
                                    {selectedFileError}
                                </Typography>
                            )}
                        </>
                    )}
                </Grid>
                <Grid item xs={4} mt="-2rem">
                    {company && (
                        <>
                            <Typography m="1rem" color="text.main" fontSize="1.1rem">
                                {t('newService.viewTheSelectedOrganizations')}
                            </Typography>
                            <LoadingButton
                                onClick={() => setShowTable(!showTable)}
                                sx={!showTable ? buttonStyle : linkStyle}
                                name="uploadData">
                                {buttonIcon}
                                {buttonTitle}
                            </LoadingButton>
                        </>
                    )}
                </Grid>
                {showTable && (
                    <Grid item xs={12}>
                        {companyData.length > 0 && <NewServiceTable content={companyData} />}
                    </Grid>
                )}
                <Grid item xs={12} m="0 auto">
                    <Divider />
                    <Box className="flex" mt="2rem" gap="2rem">
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={() => navigate('/app/admin/service-management/service-list')}
                            sx={{ fontSize: '14px' }}>
                            {'لغو'}
                        </Button>
                        <LoadingButton
                            size="large"
                            color="brandWarning"
                            type="submit"
                            loading={loading}
                            variant="contained"
                            sx={{ fontSize: '14px' }}>
                            {'ثبت تغییرات خدمت'}
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ConfirmService;

const Android12Switch = styled(Switch)(({ theme }) => ({
    width: '65px !important',
    height: '32px !important',
    padding: '3px 0 !important',

    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        backgroundColor: '#FFFFFF !important',
        width: 22,
        height: 22,
        margin: '2px 0 !important',
    },
    '& .MuiSwitch-switchBase': {
        padding: '3px !important',
    },
    '& .MuiSwitch-switchBase+.MuiSwitch-track': {
        backgroundColor: '#D7D7D7 !important',
        opacity: '1 !important',
    },
    '& .MuiSwitch-track': {
        borderRadius: '999px !important',
        '&:before, &:after': {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        '&:before': {
            content: `'فعال'`,
            left: 12,
            fontSize: 12,
            color: '#fff',
            display: 'none',
        },
        '&:after': {
            content: `"غیرفعال"`,
            right: 6,
            fontSize: 10,
            color: '#FEFEFE',
        },
    },
    '& .Mui-checked+.MuiSwitch-track': {
        backgroundColor: '#75CE79 !important',
        opacity: '1 !important',
        '&:after': {
            display: 'none',
        },
        '&:before': {
            display: 'flex',
        },
    },
    '& .Mui-checked ': {
        transform: 'translateX(38px) !important',
    },
}));

const autocompleteStyle = {
    '& .MuiBox-root': {
        backgroundColor: ColorGrey,
        height: '3.4rem !important',
        color: ` ${ColorBlack}`,
        borderRadius: '.6rem !important',
        '& fieldset': {
            border: `.1rem solid${ColorGreyBorder} `,
        },
    },
};
const inputStyle = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: palette.info.input,
        fontSize: '1.1rem',
        height: '3.4rem !important',
        color: ` ${palette.common.black}`,
        '& fieldset': {
            borderRadius: '.6rem !important',
            border: `.1rem solid ${palette.info.border} `,
        },
    },
};
const buttonStyle = {
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
    border: `.1rem solid ${ColorPrimary}`,
    textDecoration: 'none',

    '&:hover': {
        bgcolor: 'common.white',
        color: ColorPrimary,
    },
};
