import { useState, useCallback } from 'react';
import dashboardService from 'service/api/dashboardService';
import { useSnackbar } from 'store/Snackbar-context';

function useLocation(id) {
    const { showAlert } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [provinceOption, setProvinceOption] = useState([]);
    const [cityOption, setCityOption] = useState([]);

    const handleSelectOption = (id) => {
        getCityData(id);
    };

    const getProvinceData = useCallback(async () => {
        setLoading(true);
        await dashboardService
            .getProvince()
            .then((res) => {
                setLoading(false);
                setProvinceOption(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                // showAlert(err.response.data.meta.msg, 'error');
            });
    }, [setLoading, setProvinceOption]);

    const getCityData = async (id) => {
        setLoading(true);
        await dashboardService
            .getCity(id)
            .then((res) => {
                setLoading(false);
                setCityOption(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
                // showAlert(err.response.data.meta.msg, 'error');
            });
    };

    return {
        getProvinceData,
        getCityData,
        provinceOption,
        cityOption,
        loading,
        handleSelectOption,
    };
}

export default useLocation;
