import React, { useEffect, useState, useRef } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';

//components
import CustomInputAutosize from 'components/Common/Form/CustomInputAutosize';
import Card from 'components/Common/Card/Card';
import BasicBreadcrumbs from 'components/Common/Breadcrumb/Breadcrumb';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import JalaliDatePicker from 'components/Common/Form/JalaliDatePicker';
import CustomInputNumber from 'components/Common/Form/CustomInputNumber';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomChip from 'components/Common/Form/CustomChip';

import ServiceEditDocuments from './ServiceEditDocuments';
import CustomCheckbox from 'components/Common/Form/CustomChekbox';

//styling
import { theme } from 'assets/theme/default';

//api services

const { palette } = theme;

const margin = '1.5rem';

function ServiceEditAddService({
    supplierId,
    values,
    serviceData,
    setSelectedProvince,
    basic,
    autocompleteStyle,
    rowThreeSupplierSelected,
    autosizeStyle,
    document,
    setDocument,
    isChecked,
    setIsChecked,
    uploadImage,
    setUploadImage,
    selectedProvince,
    expandedItems,
    categoryData,
    rowTwoProvinceSelected,
    setProvinceChipOption,
    provinceChipOption,
}) {
    const { errors } = useFormikContext();
    const hasError = !!errors?.price;
    const autoCompleteRef = useRef(null);

    const { t } = useTranslation();

    const handleChekbox = (value) => {
        setIsChecked(value);
    };

    const findNameById = (id, arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i].name;
            }
            if (arr[i].children_all && arr[i].children_all.length > 0) {
                const name = findNameById(id, arr[i].children_all);
                if (name) {
                    return name;
                }
            }
        }
        return null;
    };

    const names = expandedItems.map((id) => findNameById(parseInt(id), categoryData));

    for (let i = 0; i < names.length; i++) {
        const element = names[i];
        console.log(element);
    }

    const linkData = [
        {
            link: 'app/admin/service-management',
            title: basic === true ? 'خدمت عمومی' : 'خدمت سازمانی',
            dash: '/',
        },
    ];
    for (let i = 0; i < names.length; i++) {
        const element = names[i];
        const linkObject = {
            link: `${element?.toLowerCase().replace(/\s+/g, '-')}`,
            title: element,
        };

        if (i !== names.length - 1) {
            linkObject.dash = '/';
        }

        linkData.push(linkObject);
    }

    const handleDeleteChip = (option) => {
        const newSelectedOptions = provinceChipOption.filter((item) => item.id !== option.id);
        autoCompleteRef.current.setValue(newSelectedOptions);
    };

    useEffect(() => {
        if (!supplierId) autoCompleteRef.current && autoCompleteRef.current.reset();
    }, [supplierId]);

    return (
        <Card mb="2rem" minHeight="40.4rem" p="2rem">
            <Box p="1.5rem" borderRadius={2} border={`0.75px solid ${palette.background.lightDark}`}>
                <BasicBreadcrumbs mt="-1rem" height="4.3rem" fontSize="1.2rem" data={linkData} />
                <Divider />
                <Grid container spacing="2rem">
                    <Grid mt="1.5rem" item xs={7}>
                        <Grid container>
                            <Grid item xs={4} mb={margin}>
                                <CustomInputBase sx={inputStyle} name="name" placeholder={t('newService.nameP')} />
                            </Grid>
                            <Grid item xs={4} mr="auto" mb={margin}>
                                <CustomInputNumber
                                    sx={{ ...inputStyle, direction: 'ltr' }}
                                    name="price"
                                    placeholder={t('newService.priceP')}
                                />
                            </Grid>
                            <Divider sx={{ mt: hasError ? '1rem' : '0', width: '100%' }} />
                            <Grid item xs={12} my={margin}>
                                <CustomInputAutosize
                                    name="description"
                                    minRows={2}
                                    placeholder={t('newService.shortDesP')}
                                    sx={autosizeStyle}
                                />
                            </Grid>
                            <Divider width="100%" />
                            <Grid item xs={7} my={margin}>
                                <DAutoComplete
                                    name="supplier_id"
                                    formControlStyle={autocompleteStyle}
                                    buttonProps={{ label: 'تامین‌کننده' }}
                                    placeholder="جستجوی تامین‌کننده"
                                    searchOnType
                                    isAsync
                                    callOnOpen
                                    apiPath={`admin/suppliers`}
                                    onSelect={rowThreeSupplierSelected}
                                />
                            </Grid>
                            <Grid item xs={8} />
                            <Divider width="100%" />
                            <Grid item xs={7} my={margin} ml="2rem">
                                <DAutoComplete
                                    name="province_ids"
                                    ref={autoCompleteRef}
                                    multiple
                                    formControlStyle={autocompleteStyle}
                                    buttonProps={{ label: 'استان خدمت' }}
                                    placeholder="جستجوی استان"
                                    searchOnType
                                    isAsync
                                    singleCall
                                    callOnOpen
                                    apiPath={`admin/address`}
                                    apiStaticParams={{ province_list: 1, supplier_id: supplierId }}
                                    onSelect={rowTwoProvinceSelected}
                                    isDisabled={!supplierId}
                                />
                            </Grid>
                            <Box className="flex" mb="1rem">
                                <CustomChip handleDeleteChip={handleDeleteChip} chipOption={provinceChipOption} />
                            </Box>
                            <Divider width="100%" />
                        </Grid>
                        <Grid
                            item
                            xs={8}
                            height="3rem"
                            mt={margin}
                            mb=".5rem"
                            display="flex"
                            justifyContent="flex-start"
                            alignItems="center"
                            gap="2rem">
                            <Box width="40%">
                                <CustomCheckbox
                                    checked={isChecked}
                                    onSelect={handleChekbox}
                                    sx={chekboxStyle}
                                    name="select"
                                    label={t('newService.noExpiration')}
                                />
                            </Box>
                            <Box width="60%">
                                <JalaliDatePicker
                                    disabled={isChecked}
                                    height="2.6rem"
                                    name="expired_at"
                                    placeholder={t('newService.validityDate')}
                                    sx={{ ...inputStyle, height: '2.6rem' }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid mt="1.5rem" item xs={5}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ServiceEditDocuments
                                    serviceData={serviceData}
                                    uploadImage={uploadImage}
                                    setUploadImage={setUploadImage}
                                    document={document}
                                    setDocument={setDocument}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                </Grid>
            </Box>
        </Card>
    );
}

export default ServiceEditAddService;

const chekboxStyle = {
    mr: '-2rem',

    '& .MuiSvgIcon-root': { fontSize: '2.4rem' },
    '& .MuiFormControlLabel-label': {
        fontSize: '1.2rem !important',
    },
    '&.Mui-checked': {
        color: 'primary.main',
    },
};

const inputStyle = {
    backgroundColor: palette.common.white,
    // borderRadius: '.8rem !important',

    '& .MuiOutlinedInput-root': {
        height: '2.6rem !important',
        color: ` ${palette.common.black}`,
        '& fieldset': {
            border: `.2rem dashed ${palette.info.border} `,
        },
    },
};
