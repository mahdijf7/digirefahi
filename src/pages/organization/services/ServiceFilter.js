import React, { useEffect, useState } from 'react';
import {
    Box,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Button,
    Grid,
    Typography,
    InputAdornment,
    CircularProgress, Divider, Paper, Checkbox
} from '@mui/material';
import { LoadingButton, TreeView, TreeItem } from '@mui/lab';
import { useTranslation } from 'react-i18next';


// Utils
import organizationService from 'service/api/organization.service';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DTableWrapper from 'components/new/shared/DTable/DTableWrapper';
import DTableEmpty from 'components/new/shared/DTable/DTableEmpty';
import DTableHeader from 'components/new/shared/DTable/DTableHeader';
import DPagination from 'components/new/shared/DPagination/Index';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

// Assets
import theme from 'assets/theme';
import DSnackbar from 'components/new/shared/DSnackbar';
import '../../../assets/style/scrollbar.css';
import SelectGroup from "../../../components/new/pages/organization/serviceManagement/serviceFilter/SelectGroup";
import SelectChart from "../../../components/new/pages/organization/serviceManagement/serviceFilter/SelectChart";
import SelectCategories from "../../../components/new/pages/organization/serviceManagement/serviceFilter/SelectCategories";
import {getErrorForSnackbar} from "../../../utils/helpers";
import {reloadResources} from "i18next";

const ExcelIcon = require('../../../assets/icone/excel.svg').default;

const tableColumns = [
    { title: 'عنوان خدمت' },
    { title: 'دسته‌بندی' },
    { title: 'تامین کننده' },
    { title: 'قیمت' }
];
const breadCrumbLinks = [
    { link: '/app/organization/dashboard', title: 'پیشخوان', dash: '/' },
    { link: '/app/organization/services/basic-service-filter', title: 'فیلتر خدمات عمومی' },
];

const OrganizationBasicServiceFilter = () => {
    const [loading, setLoading] = useState({
        initial: true,
        refreshGroup: true,
        refreshCategory: true,
        refresh: false,
        excel: false,
        submit: false
    });

    const [services, setServices] = useState([]);
    const [charts, setCharts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryServices, setCategoryServices] = useState([]);
    const [chartServices, setChartServices] = useState([]);
    const [filters, setFilters] = useState({ page: 1, per_page: 500, type: 'BASIC' });
    const [filtersChanged, setFiltersChanged] = useState(false);
    const [totalPage, setTotalPage] = useState(1);

    const [selectedTableItems, setSelectedTableItems] = useState([]);
    const [selectedChart, setSelectedChart] = useState({});
    const [selectedChartChanged, setSelectedChartChanged] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategoriesChanged, setSelectedCategoriesChanged] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { t } = useTranslation();

    const addCommas = (number)=> {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleTableCheckboxChange = (item) => {
        if (selectedTableItems.some((selectedItem) => selectedItem.id === item.id)) {
            setSelectedTableItems(selectedTableItems.filter((selectedItem) => selectedItem.id !== item.id));
        } else {
            setSelectedTableItems([...selectedTableItems, item]);
        }
    };
    const handleTableSelectAll = () => {
        if (selectedTableItems.length === services.length) {
            setSelectedTableItems([]);
        } else {
            setSelectedTableItems(services.map((item) => item));
        }
    };
    const handleChartCheckboxChange = (item) => {
        setSelectedChart(item);
        setSelectedChartChanged(true);
    };
    const handleCategoryCheckboxChange = (categories) => {
        const toggleCategory = (category, isChecked) => {
            if (isChecked) {
                setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, category]);
            } else {
                setSelectedCategories((prevSelectedCategories) => prevSelectedCategories.filter((item) => item.id !== category.id));
            }
        };

        const toggleChildren = (children, isChecked) => {
            children.forEach((child) => {
                toggleCategory(child, isChecked);
                if (child.children_all && child.children_all.length > 0) {
                    toggleChildren(child.children_all, isChecked);
                }
            });
        };

        categories.forEach((category) => {
            const isChecked = selectedCategories.some((selectedItem) => selectedItem.id === category.id);

            if (isChecked) {
                toggleCategory(category, false);
                if (category.children_all && category.children_all.length > 0) {
                    toggleChildren(category.children_all, false);
                }
            } else {
                toggleCategory(category, true);
                if (category.children_all && category.children_all.length > 0) {
                    toggleChildren(category.children_all, true);
                }
            }
        });

        setSelectedCategoriesChanged(true);
    };

    const checkMatchesCategory = async (categoryList, parentAdded = false) => {
        const matches = [];

        for (const category of categoryList) {
            let isParentAdded = parentAdded;

            for (const service of chartServices) {
                if (category.id === service.category.id) {
                    matches.push(category);
                    isParentAdded = true;
                    break;
                }
            }

            if (!isParentAdded && category.children_all.length > 0) {
                const childMatches = await checkMatchesCategory(category.children_all, isParentAdded);
                for (const childMatch of childMatches) {
                    matches.push(childMatch);
                }
            }
        }

        return matches;
    }

    const getCharts = async () => {
        const queryString = new URLSearchParams();
        queryString.append('per_page', filters.per_page);
        await organizationService
            .getCharts(queryString.toString())
            .then((res) => {
                console.log(res.data.data.charts);
                setCharts(res.data.data.charts);
                setLoading({ ...loading, initial: false, refresh: false });
            })
            .catch((err) => {
                const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
                errorMsg &&
                setSnackBarData({
                    show: true,
                    data: {
                        text: errorMsg,
                        type: 'error',
                    },
                });
            });
    };
    const getCategories = async () => {
        await organizationService
            .getCategories()
            .then((res) => {
                setCategories(res.data.data);
                setLoading({ ...loading, initial: false, refresh: false });
            })
            .catch((err) => {
                const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
                errorMsg &&
                setSnackBarData({
                    show: true,
                    data: {
                        text: errorMsg,
                        type: 'error',
                    },
                });
            });
    };
    const getServicesFilteredByChart = async () => {
        if(isSelectedChartEmpty()) return { reload: false, data: [] };
        const queryString = new URLSearchParams();
        queryString.append('page', filters.page);
        queryString.append('per_page', filters.per_page);
        queryString.append('type', filters.type);
        queryString.append('chart_id', selectedChart.id);
        try {
            const res = await organizationService.getServices(queryString.toString());
            if (Number(res.data.meta.last_page) > 1) {
                setFilters({ ...filters, per_page: (filters.per_page * Number(res.data.meta.last_page)) });
                return { reload: true, data: [] };
            }
            return { reload: false, data: res.data.data };
        } catch (err) {
            const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
            errorMsg &&
            setSnackBarData({
                show: true,
                data: {
                    text: errorMsg,
                    type: 'error',
                },
            });
            return { reload: false, data: [] };
        }
    };
    const getServicesFilteredByCategory = async () => {
        if(isSelectedCategoriesEmpty()) return { reload: false, data: [] };
        const queryString = new URLSearchParams();
        queryString.append('page', filters.page);
        queryString.append('per_page', filters.per_page);
        queryString.append('type', filters.type);
        selectedCategories.forEach((category, index) => {
            queryString.append('categories[' + index + ']', category.id);
        });
        try {
            const res = await organizationService.getServices(queryString.toString());
            if (Number(res.data.meta.last_page) > 1) {
                setFilters({ ...filters, per_page: (filters.per_page * Number(res.data.meta.last_page)) });
                return { reload: true, data: [] };
            }
            return { reload: false, data: res.data.data };
        } catch (err) {
            const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
            errorMsg &&
            setSnackBarData({
                show: true,
                data: {
                    text: errorMsg,
                    type: 'error',
                },
            });
            return { reload: false, data: [] };
        }
    };
    const submitServices = async () => {
        setLoading({...loading, submit: true});
        const queryString = new URLSearchParams();
        queryString.append('chart_id', selectedChart.id);
        selectedTableItems.forEach((service, index) => {
            queryString.append('service_ides[' + index + ']', service.id);
        });
        await organizationService
            .update(`services-filter-assign?${queryString.toString()}`)
            .then((res) => {
                setLoading({...loading, submit: false});
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'خدمات چارت سازمانی بروزرسانی شد.',
                        type: 'success',
                    },
                });
                reloadChartServices();
            })
            .catch((err) => {
                const errorMsg = err?.response?.data?.data && getErrorForSnackbar(err.response.data.data);
                errorMsg &&
                setSnackBarData({
                    show: true,
                    data: {
                        text: errorMsg,
                        type: 'error',
                    },
                });
            });
    };
    const submitList = async () => {
        if(Object.keys(selectedChart).length === 0) {
            return setSnackBarData({
                show: true,
                data: {
                    text: 'چارت سازمانی را انتخاب کنید!',
                    type: 'error',
                },
            });
        }
        if(selectedCategories.length <= 0) {
            return setSnackBarData({
                show: true,
                data: {
                    text: 'دسته‌بندی خدمات را انتخاب کنید!',
                    type: 'error',
                },
            });
        }
        if(selectedTableItems.length <= 0) {
            return setSnackBarData({
                show: true,
                data: {
                    text: 'حداقل یک خدمت را انتخاب کنید!',
                    type: 'error',
                },
            });
        }
        await submitServices();
    };

    const isSelectedChartEmpty = () => {
        return Object.keys(selectedChart).length === 0;
    }
    const isSelectedCategoriesEmpty = () => {
        return selectedCategories.length === 0;
    }
    const clearTable = () => {
        setServices([]);
        setSelectedTableItems([]);
        setSelectedCategories([]);
    }

    const reloadServices = async () => {
        clearTable();

        if(isSelectedChartEmpty()) {
            setLoading({ ...loading, refresh: false });
            return;
        }

        const matches = await checkMatchesCategory(categories);
        setSelectedCategories(matches);
        setSelectedCategoriesChanged(true);
    }
    const appendCategoryServices = async () => {
        setLoading({ ...loading, refresh: true });

        if(selectedCategories === []) {
            setLoading({ ...loading, refresh: false });
            return;
        }
        let similar = [];
        let diff = [];

        for (let service of categoryServices) {
            let found = chartServices.some(item => item.id === service.id);

            if (found) {
                similar.push(service);
            } else {
                diff.push(service);
            }
        }

        setSelectedTableItems(similar);
        setServices([...similar, ...diff]);
        setLoading({ ...loading, refresh: false });
    }

    const reloadCategoryServices = async () => {
        if(isSelectedCategoriesEmpty()) {
            setSelectedTableItems([]);
            setServices([]);
            setLoading({ ...loading, refresh: false });
            return;
        }
        if(isSelectedChartEmpty()) return [];
        setLoading({ ...loading, refresh: true });
        let data = await getServicesFilteredByCategory();
        if(data.reload)
            data = await getServicesFilteredByCategory();

        setCategoryServices(data.data);
    }
    const reloadChartServices = async () => {
        if(isSelectedChartEmpty()) return[];
        setLoading({ ...loading, refresh: true });
        let data = await getServicesFilteredByChart();
        if(data.reload)
            data = await getServicesFilteredByChart();
        setChartServices(data.data);
    }

    useEffect(() => {
        getCharts();
        getCategories();
    }, []);
    useEffect(() => {
        if(filtersChanged) {
            setFiltersChanged(false);
            reloadChartServices();
        }
    }, [filtersChanged]);
    useEffect(() => {
        if(selectedCategoriesChanged) {
            setSelectedCategoriesChanged(false);
            reloadCategoryServices();
        }
    }, [selectedCategoriesChanged]);
    useEffect(() => {
        if(selectedChartChanged) {
            setSelectedChartChanged(false);
            reloadChartServices();
        }
    }, [selectedChartChanged]);
    useEffect(() => {
        reloadServices();
    }, [chartServices]);
    useEffect(() => {
        appendCategoryServices();
    }, [categoryServices]);

    return (

        <DashboardCard pt="2rem" meta={{ title: 'فیلتر خدمات عمومی' }}>
            <Breadcrumb links={breadCrumbLinks} />

            <DLoadingWrapper loading={loading.initial}>
                <Grid container spacing={2}>
                    <Grid item xs={3.3} mt="32px">
                        <SelectChart
                            loading={loading}
                            charts={charts}
                            selectedChart={selectedChart}
                            handleChartCheckboxChange={handleChartCheckboxChange}
                        />

                        {/*<SelectGroup*/}
                        {/*    loading={loading}*/}
                        {/*    groups={groups}*/}
                        {/*    selectedGroup={selectedGroup}*/}
                        {/*    handleGroupCheckboxChange={handleGroupCheckboxChange}*/}
                        {/*/>*/}

                        <SelectCategories
                            loading={loading}
                            categories={categories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            setSelectedCategoriesChanged={setSelectedCategoriesChanged}
                            handleCategoryCheckboxChange={handleCategoryCheckboxChange}
                        />

                    </Grid>

                    <Grid item xs={8.7} mt="32px">
                        <DBox sx={{ background: '#0877BD' }}>
                            <DLoadingWrapper loading={loading.initial}>
                                <>
                                    <Box style={{
                                        padding: '17px 30px 0px 30px',
                                        color: '#fff',
                                        fontSize: '16px'}}>
                                        <DTableHeader title={selectedChart.name || '---'}>
                                            {/*<LoadingButton*/}
                                            {/*    variant="outlined"*/}
                                            {/*    loading={loading.excel}*/}
                                            {/*    // startIcon={<SvgExcel/>}*/}
                                            {/*    sx={{*/}
                                            {/*        color: '#fff',*/}
                                            {/*        borderColor: '#fff',*/}
                                            {/*        paddingRight: '30px',*/}
                                            {/*        fontSize: '14px',*/}
                                            {/*        '&:hover': {*/}
                                            {/*            borderColor: '#fff',*/}
                                            {/*        }*/}
                                            {/*    }}*/}
                                            {/*    onClick={downloadExcel}>*/}
                                            {/*    خروجی اکسل*/}
                                            {/*    <img*/}
                                            {/*        src={ExcelIcon}*/}
                                            {/*        alt="Excel icon"*/}
                                            {/*        style={{*/}
                                            {/*            width: '18px',*/}
                                            {/*            height: '18px',*/}
                                            {/*            marginLeft: '5px',*/}
                                            {/*            left: 'auto',*/}
                                            {/*            right: '8px',*/}
                                            {/*            pointerEvents: 'none',*/}
                                            {/*            position: 'absolute',*/}
                                            {/*            display: 'flex',*/}
                                            {/*            alignItems: 'center',*/}
                                            {/*            justifyContent: 'center',*/}
                                            {/*        }}*/}
                                            {/*    />*/}
                                            {/*</LoadingButton>*/}
                                        </DTableHeader>
                                    </Box>

                                    <Box style={{padding: '17px 30px 17px 30px', color: '#000', fontSize: '16px', background: '#fff'}}>
                                        <DTableHeader title="لیست خدمات عمومی در دسته‌بندی‌های انتخاب شده"></DTableHeader>
                                    </Box>

                                    <DTableWrapper sx={{padding: '0 30px', background: '#fff'}}>
                                        <TableHead sx={{maxHeight: '60px'}}>
                                            <TableRow style={{maxHeight: '60px'}}>
                                                <TableCell style={{...tableHeadStyle, display: 'flex', justifyContent: "center", alignItems: 'center', fontSize: '12px'}} key={`table-column-${0}`}>
                                                    <Checkbox
                                                        checked={selectedTableItems.length === services.length}
                                                        onChange={handleTableSelectAll}
                                                        sx={{
                                                            marginLeft: '5px',
                                                            padding: '0',
                                                            '& .MuiSvgIcon-root': { fontSize: '2rem' },
                                                            '&.Mui-checked': {
                                                                color: 'primary.main',
                                                            },
                                                        }}
                                                    />
                                                    {'انتخاب همه'}
                                                </TableCell>
                                                {tableColumns.map((column, index) => {
                                                    return (
                                                        <TableCell style={tableHeadStyle} key={`table-column-${index}`}>
                                                            {column.title}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {loading.refresh ? (
                                                <TableRow
                                                    style={{
                                                        backgroundColor: '#ffffff',
                                                        width: '100%'
                                                    }}>
                                                    <TableCell colSpan="9999" style={{textAlign: 'center'}}>
                                                        <CircularProgress />
                                                    </TableCell>
                                                </TableRow>
                                            ) : (services.length > 0 ? (
                                                    services.map((service, index) => (
                                                        <TableRow key={service.id} style={{
                                                            backgroundColor: index % 2 !== 0 ? '#f2f2f2' : '#ffffff',
                                                            maxHeight: '60px'
                                                        }}>
                                                            {/*<TableCell style={tableCellStyle}>{service.name || '---'}</TableCell>*/}
                                                            <TableCell style={tableCellStyle}>
                                                                <Checkbox
                                                                    checked={selectedTableItems.some((selectedItem) => selectedItem.id === service.id)}
                                                                    onChange={() => handleTableCheckboxChange(service)}
                                                                    sx={{
                                                                        '& .MuiSvgIcon-root': { fontSize: '2rem' },
                                                                        '&.Mui-checked': {
                                                                            color: 'primary.main',
                                                                        },
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell style={tableCellStyle}>
                                                                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                                    <img src={`${process.env.REACT_APP_STORAGE_URL}/${service.image}`} style={{
                                                                        maxHeight: '30px',
                                                                        marginLeft: '10px',
                                                                        borderRadius: '5px'
                                                                    }} />
                                                                    {service.name || '---'}
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell style={tableCellStyle}>{service.category.name || '---'}</TableCell>
                                                            <TableCell style={tableCellStyle}>{service.supplier || '---'}</TableCell>
                                                            <TableCell style={tableCellStyle}>{addCommas(service.price) || '---'}</TableCell>

                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <DTableEmpty message={'هر دو فیلتر چارت سازمانی و دسته‌بندی را انتخاب کنید'}/>
                                                )
                                            )}
                                        </TableBody>

                                    </DTableWrapper>
                                    <Box sx={{ p: '20px', background: '#fff' }}>
                                        {totalPage > 1 && (
                                            <DPagination
                                                sx={{ marginRight: 'auto' }}
                                                totalPages={totalPage}
                                            />
                                        )}
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: '20px', background: '#fff' }}>
                                        <LoadingButton
                                            variant="contained"
                                            loading={loading.submit}
                                            color="brandWarning"
                                            sx={{
                                                fontSize: '14px',
                                                height: '32px',
                                                width: '126px',
                                                backgroundColor: '#0877BD',
                                                color: 'white',
                                            }}
                                            onClick={submitList}>
                                            بروز رسانی
                                        </LoadingButton>
                                    </Box>
                                </>
                            </DLoadingWrapper>
                        </DBox>
                    </Grid>
                </Grid>
            </DLoadingWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
};
const tableHeadStyle = {
    backgroundColor: theme.main.palette.primary.light,
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};

const tableCellStyle = {
    borderColor: theme.main.palette.background.lightDark,
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '1.2rem',
    padding: '6px 14px',
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
};
export default OrganizationBasicServiceFilter;
