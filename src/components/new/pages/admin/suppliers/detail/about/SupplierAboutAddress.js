import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Components
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomInputBase from 'components/Common/Form/CustomInputBase';

// Assets
import theme from 'assets/theme';

const SupplierAboutAddress = ({ address, provinces, baseName, onDelete }) => {
    const cityRef = useRef();
    const { t } = useTranslation();

    const provinceChanged = () => {
        // we need to reset the city dropdown
        cityRef.current && cityRef.current.reset();
    };

    return (
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={2.5}>
                    <DAutoComplete
                        key={`${baseName}province`}
                        name={`${baseName}province`}
                        formControlStyle={{ height: '42px' }}
                        defaultValue={address.province}
                        defaultOptions={provinces}
                        buttonProps={{ label: 'انتخاب استان' }}
                        placeholder=" استان"
                        weight
                        optionValueKey="name"
                        onSelect={provinceChanged}
                    />
                </Grid>
                <Grid item xs={6} sm={2.5}>
                    <DAutoComplete
                        key={`${baseName}city`}
                        name={`${baseName}city`}
                        formControlStyle={{ height: '42px' }}
                        defaultValue={address.city}
                        optionValueKey="id"
                        ref={cityRef}
                        weight
                        buttonProps={{ label: address.province ? 'شهر' : 'اول استان را انتخاب کنید' }}
                        placeholder="جستجوی شهر"
                        isDisabled={!address.province}
                        isAsync
                        callOnOpen
                        apiPath={`city/${address.province && address.province.id}`}
                    />
                </Grid>
                <Grid item xs={4}>
                    <CustomInputBase hasDefaultStyle name={`${baseName}description`} weight />
                </Grid>
                <Grid item xs={2}>
                    <CustomInputBase hasDefaultStyle name={`${baseName}phone`} weight />
                </Grid>
                <Grid item xs={1}>
                    <Box
                        sx={{
                            border: `1px solid ${theme.main.palette.primary.main}`,
                            borderRadius: '8px',
                            color: theme.main.palette.primary.main,
                            height: '42px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                        }}
                        onClick={onDelete}>
                        <DeleteOutlineIcon />
                        <Typography sx={{ fontSize: '9px', fontWeight: 600, lineHeight: '16px' }}>{t('deleteRow')}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SupplierAboutAddress;
