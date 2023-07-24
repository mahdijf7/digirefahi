import { useState, useCallback, useEffect } from 'react';

import dashboardService from 'service/api/dashboardService';

function useFilter() {
  const [category, setCategory] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [provinceOption, setProvinceOption] = useState([]);
  const [priceOption, setPriceOption] = useState(price);

  const getCategoryData = useCallback(async () => {
    await dashboardService
      .getAllCategories()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {});
  }, [setCategory]);
  const getSupplierData = useCallback(async () => {
    await dashboardService
      .getAllSuppliers()
      .then((res) => {
        setSuppliers(res.data.data);
      })
      .catch((err) => {});
  }, [setSuppliers]);
  const getProvinceData = useCallback(async () => {
    await dashboardService
      .getProvince()
      .then((res) => {
        setProvinceOption(res.data.data);
      })
      .catch((err) => {});
  }, [setProvinceOption]);

  useEffect(() => {
    getSupplierData();
    getCategoryData();
    getProvinceData();
  }, []);

  return {
    category,
    suppliers,
    provinceOption,
    priceOption,
  };
}

export default useFilter;
const price = [
  { label: 'کمتر از 500.000', value: { price_from: 500000 } },
  { label: 'بین 500.000 تا 1.000.000', value: { price_from: 500000, price_to: 1000000 } },
  {
    label: 'بین 500.000 تا بین 1.000.000 تا 2.000.000',
    value: { price_from: 500000, price_to: 2000000 },
  },
  { label: 'بیشتر از 2.000.000', value: { price_from: 2000000 } },
];
