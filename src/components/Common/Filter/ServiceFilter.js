import React, { useEffect } from 'react';
import { Box, Divider, Typography, Grid } from '@mui/material';
import '../../../assets/style/dashboard.scss';
import CustomInputSearch from '../../Common/Form/CustomInputSearch';
import { Formik, Form } from 'formik';
import CustomAutocompleteV1 from '../../Common/Form/CustomAutocompleteV1';
import CustomAutocomplete from '../../Common/Form/CustomAutocomplete';
import Location from '../../../assets/icone/svg/Location';
import IconoirShop from '../../../assets/icone/svg/IconoirShop';
import IconPrice from '../../../assets/icone/svg/Price';
import IconCategory from '../../../assets/icone/svg/Category';
import useFilter from 'hooks/use-filter';
import theme from 'assets/theme';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

function ServiceFilter({
  handleSubmit,
  category: categoryValue,
  supplier: supplierValue,
  province: provinceValue,
  price: priceValue,
}) {
  const { t } = useTranslation();
  const { category, suppliers, provinceOption, priceOption } = useFilter();

  const Initial_Values = {
    name: '',
    category: '',
    province: '',
    price: '',
    supplier: '',
  };

  const handleSubmitCategory = useCallback(
    (value) => handleSubmit({ category: value }),
    [handleSubmit]
  );

  const handleSubmitProvince = useCallback(
    (value) => handleSubmit({ province: value }),
    [handleSubmit]
  );

  const handleSubmitPrice = useCallback((value) => handleSubmit({ price: value }), [handleSubmit]);

  const handleSubmitSupplier = useCallback((value) => handleSubmit({ supplier: value }), []);

  useEffect(() => {
    if (supplierValue) {
      handleSubmitSupplier(supplierValue);
    }

    // if (categoryValue) {
    //   console.log('handleSubmitCategory');
    //   handleSubmitCategory(categoryValue);
    // } else if (supplierValue) {
    //   console.log('handleSubmitSupplier');
    //   handleSubmitSupplier(supplierValue); // pass a different value here to test
    // } else if (provinceValue) {
    //   console.log('handleSubmitProvince');
    //   handleSubmitProvince(provinceValue);
    // } else if (priceValue) {
    //   console.log('handleSubmitPrice');
    //   handleSubmitPrice(priceValue);
    // }
  }, [supplierValue, handleSubmitSupplier]);

  return (
    <Formik initialValues={Initial_Values} onSubmit={handleSubmit}>
      <Form>
        <Box pb="2.2rem" width="100%" className="flex" justifyContent="space-between">
          <Typography variant="h3">{t('dashboard.categories')}</Typography>
          <CustomInputSearch placeholder={t('dashboard.search')} name="name" />
        </Box>
        <Divider sx={{ mb: '1.8rem' }} />

        <Grid spacing="3rem" container>
          <Grid item sm={3}>
            <CustomAutocompleteV1
              defaultValue={+categoryValue || ''}
              icon={<IconCategory />}
              options={category}
              onSelect={handleSubmitCategory}
              name="category"
              placeholder={t('dashboard.category')}
              sx={AutocompleteStyle}
            />
          </Grid>
          <Grid item sm={3}>
            <CustomAutocompleteV1
              defaultValue={+provinceValue || ''}
              icon={<Location />}
              onSelect={handleSubmitProvince}
              options={provinceOption}
              name="province"
              placeholder={t('dashboard.provinceP')}
              sx={AutocompleteStyle}
            />
          </Grid>
          <Grid item sm={3}>
            <CustomAutocomplete
              defaultValue={+priceValue || ''}
              icon={<IconPrice />}
              options={priceOption}
              onSelect={handleSubmitPrice}
              name="price"
              placeholder={t('dashboard.priceP')}
              sx={AutocompleteStyle}
            />
          </Grid>
          <Grid item sm={3}>
            <CustomAutocompleteV1
              defaultValue={+supplierValue || ''}
              icon={<IconoirShop />}
              options={suppliers}
              onSelect={handleSubmitSupplier}
              name="supplier"
              placeholder={t('dashboard.supplierP')}
              sx={AutocompleteStyle}
            />
          </Grid>
        </Grid>
        <Divider sx={{ m: '1.8rem 0' }} />
      </Form>
    </Formik>
  );
}

export default ServiceFilter;
const AutocompleteStyle = {
  '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
    paddingRight: '1rem',
    borderRadius: '.5rem !important',
    backgroundColor: theme.main.palette.common.white,
    height: '3.6rem',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: `.1rem solid ${theme.main.palette.primary.main}`,
  },
};
