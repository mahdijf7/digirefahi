import React, { useRef, useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CardNewService from 'components/Common/Card/Admin/NewService/CardNewService';
import DAutoComplete from 'components/new/shared/Form/DAutoComplete';
import CustomChip from 'components/Common/Form/CustomChip';

function ServiceEditAddAddress({
    values,
    supplierId,
    setAddress,
    autocompleteStyle,
    serviceData,
    selectedProvince,
    addressChipOption,
    setAddressChipOption,
    selectedAddress,
}) {
    const { t } = useTranslation();
    const autoCompleteRef = useRef(null);
    const isInitialRender = useRef(true);

    const handleDeleteChip = (option) => {
        const newSelectedOptions = addressChipOption.filter((item) => item.id !== option.id);
        autoCompleteRef.current.setValue(newSelectedOptions);
    };
    useEffect(() => {
        if (!isInitialRender.current) {
            autoCompleteRef.current.reset();
        } else {
            isInitialRender.current = false;
        }
    }, [selectedProvince]);

    let provinceIdes = {};
    selectedProvince &&
        selectedProvince.forEach((item, index) => {
            provinceIdes[`province_ides[${index}]`] = item;
        });

    return (
        <CardNewService title="newService.chooseAddress" minHeight="20.6rem">
            <Grid container spacing="2rem">
                <Grid item xs={6}>
                    <DAutoComplete
                        name="address_ides"
                        ref={autoCompleteRef}
                        multiple
                        formControlStyle={autocompleteStyle}
                        buttonProps={{ label: 'انتخاب آدرس' }}
                        placeholder={t('newService.providerP')}
                        isAsync
                        callOnOpen
                        searchOnType
                        optionLabelKey="description"
                        apiPath={`admin/address`}
                        apiStaticParams={{ ...provinceIdes, supplier_id: supplierId }}
                        onSelect={selectedAddress}
                        isDisabled={!selectedProvince.length > 0}
                    />
                </Grid>
                <Grid xs={6}>
                    <Box mt="2rem">
                        <CustomChip
                            chipStyle={{ width: 'calc(100% - 2rem)' }}
                            labelKey="description"
                            handleDeleteChip={handleDeleteChip}
                            chipOption={addressChipOption}
                        />
                    </Box>
                </Grid>
            </Grid>
        </CardNewService>
    );
}

export default ServiceEditAddAddress;
