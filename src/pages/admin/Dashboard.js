import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useTranslation } from 'react-i18next';
import { Bar } from 'react-chartjs-2';

// Utils
import adminService from 'service/api/adminService';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import ReportBox from 'components/new/pages/admin/dashboard/ReportBox';
import TitleBox from 'components/new/pages/admin/dashboard/TitleBox';
import Comment from 'components/new/pages/admin/dashboard/Comment';
import Service from 'components/new/pages/admin/dashboard/Service';
import Event from 'components/new/pages/admin/dashboard/Event';
import ServiceRequest from 'components/new/pages/admin/dashboard/ServiceRequest';
import CreditRequest from 'components/new/pages/admin/dashboard/CreditRequest';
import EmployeeRequest from 'components/new/pages/admin/dashboard/EmployeeRequest';
import SaleCategory from 'components/new/pages/admin/dashboard/SaleCategory';

// Assets
import theme from 'assets/theme';
import DSnackbar from 'components/new/shared/DSnackbar';
import DLoadingWrapper from '../../components/new/shared/DLoadingWrapper';
import { getErrorForSnackbar } from '../../utils/helpers';
import { Link } from 'react-router-dom';
let moment = require('moment-jalaali');

const DropdownIcon = require('../../assets/icone/dropDown.svg').default;

const breadCrumbLinks = [{ path: '/admin', title: 'پیشخوان' }];

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [chartLoading, setChartLoading] = useState(true);

    const [commentsData, setCommentsData] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [creditRequestData, setCreditRequestData] = useState([]);
    const [serviceRequestData, setServiceRequestData] = useState([]);
    const [servicesData, setServicesData] = useState([]);
    const [employeesRequestData, setEmployeesRequestData] = useState([]);
    const [reportBoxData, setReportBoxData] = useState([]);
    const [saleCategoryData, setSaleCategoryData] = useState([]);

    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderWidth: 0,
                borderRadius: 5,
            },
        ],
    });
    const backgroundBar = {
        id: 'backgroundBar',
        beforeDatasetDraw(chart, args, options) {
            const {
                data,
                ctx,
                chartArea: { top, bottom, right, left, width, height },
                scales: { x, y },
            } = chart;
            ctx.save();
            const segment = width / data.labels.length;
            const barWidth = segment * data.datasets[0].barPercentage * data.datasets[0].categoryPercentage;

            ctx.fillStyle = options.barColor;
            for (let i = 0; i < data.labels.length; i++) {
                ctx.fillRect(x.getPixelForValue(i) - barWidth / 2, top, barWidth, height);
            }
        },
    };
    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'فروش (تومان)',
                align: 'end',
                font: {
                    family: 'IRANSans, sans-serif',
                    size: 10,
                },
            },
            datalabels: {
                color: '#fff',
                align: 'center',
                anchor: 'end',
                formatter: (value) => addCommas(value),
                rotation: -90,
                clamp: true,
                clip: true,
                offset: 1,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90,
                    font: {
                        family: 'IRANSans, sans-serif',
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                position: 'right',
                grid: {
                    display: false,
                },
            },
        },
    };

    function addCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const loadData = async () => {
        await adminService
            .get(`dashboard`)
            .then((res) => {
                setCommentsData(res.data.data.latest_comments);
                setEventsData(res.data.data.latest_events);
                setServicesData(res.data.data.latest_services_most_rate);
                setCreditRequestData(res.data.data.latest_credit_request);
                setServiceRequestData(res.data.data.latest_service_request);
                setEmployeesRequestData(res.data.data.latest_employees_orders);
                setReportBoxData([
                    {
                        icon: require('../../assets/icone/reportBoxIcon1.svg').default,
                        title: 'تعداد سازمان',
                        number: res.data.data.companies_count || 0,
                        linkText: 'افزودن سازمان',
                        linkPath: '/app/admin/companies',
                        theme: 'DarkBlue',
                    },
                    {
                        icon: require('../../assets/icone/reportBoxIcon2.svg').default,
                        title: 'تعداد کارمند',
                        number: res.data.data.employees_count || 0,
                        linkText: 'افزودن کارمند',
                        linkPath: '/app/admin/employees',
                        theme: 'LightBlue',
                    },
                    {
                        icon: require('../../assets/icone/reportBoxIcon3.svg').default,
                        title: 'تعداد تامین کننده',
                        number: res.data.data.suppliers_count || 0,
                        linkText: 'افزودن تامین کننده',
                        linkPath: '/app/admin/suppliers-management',
                        theme: 'DarkBlue',
                    },
                    {
                        icon: require('../../assets/icone/reportBoxIcon4.svg').default,
                        title: 'تعداد خدمات',
                        number: res.data.data.services_count || 0,
                        linkText: 'افزودن خدمات',
                        linkPath: '/app/admin/service-management/new-service',
                        theme: 'LightBlue',
                    },
                    {
                        icon: require('../../assets/icone/reportBoxIcon5.svg').default,
                        title: 'کل اعتبار سازمان‌ها',
                        number: addCommas(res.data.data.companies_credit || 0),
                        linkText: 'مشاهده گزارش',
                        linkPath: '#',
                        theme: 'DarkBlue',
                        hideLink: true,
                        isPrice: true,
                    },
                ]);
                setLoading(false);
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

    const loadChart = async () => {
        if (selectedMonth === '' || selectedYear === '') return;
        setChartLoading(true);

        const queryString = new URLSearchParams();
        queryString.append('year', selectedYear);
        queryString.append('month', selectedMonth);
        await adminService
            .get(`sales-chart?${queryString.toString()}`)
            .then((res) => {
                let labels = [];
                let values = [];
                let backgroundColor = [];
                res.data.data.map((data, index) => {
                    labels.push(data.category.name);
                    values.push(data.sum);
                    backgroundColor.push(data.category.color);
                });

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: backgroundColor,
                            borderWidth: 0,
                            borderRadius: 5,
                        },
                    ],
                });
                setSaleCategoryData(res.data.data);

                setChartLoading(false);
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

    const handleChangeMonth = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleChangeYear = (event) => {
        setSelectedYear(event.target.value);
    };

    const setDate = async () => {
        // Get current Jalali date
        const currentJalaliDate = moment();
        const currentJalaliYear = currentJalaliDate.jYear();
        const currentMonthIndex = currentJalaliDate.jMonth() + 1; // Adjust for 0-based index

        setSelectedMonth(currentMonthIndex.toString());
        setSelectedYear(currentJalaliYear.toString());
    };

    useEffect(() => {
        loadData();
        setDate();
    }, []);

    useEffect(() => {
        loadChart();
    }, [selectedMonth, selectedYear]);

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks} />
            <DLoadingWrapper loading={loading} sx={{ mt: '24px' }}>
                <Grid container spacing="20px" mt="4px">
                    <Grid item sm={8.2}>
                        <Grid container spacing="20px">
                            {reportBoxData.map((data, index) => (
                                <ReportBox theme={data.theme} data={data} key={`report-box-${index}`} />
                            ))}
                            <Grid item sm={12}>
                                <DBox sx={{ marginTop: '20px', padding: '16px' }}>
                                    <Grid
                                        container
                                        spacing={2.7}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                        }}>
                                        <Grid item sm={8} style={{ textAlign: 'left' }}>
                                            <h5
                                                style={{
                                                    color: '#0877BD',
                                                    fontWeight: '500',
                                                    fontSize: '16px',
                                                    textAlign: 'right',
                                                    clear: 'both',
                                                }}>
                                                فروش ماهانه خدمات در دسته بندی های مختلف
                                            </h5>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <Grid container spacing={2.5}>
                                                <Grid item sm={6} style={{ textAlign: 'left' }}>
                                                    <Select
                                                        value={selectedMonth}
                                                        onChange={handleChangeMonth}
                                                        fullWidth
                                                        style={{
                                                            height: '30px',
                                                            color: '#0877BD',
                                                            border: '1px solid #0877BD',
                                                            borderRadius: '5px',
                                                            textAlign: 'right',
                                                        }}
                                                        IconComponent={() => (
                                                            <img
                                                                src={DropdownIcon}
                                                                alt="Dropdown Icon"
                                                                style={{
                                                                    width: '16px',
                                                                    height: '5px',
                                                                    marginRight: '5px',
                                                                    right: 'auto',
                                                                    left: '8px',
                                                                    pointerEvents: 'none',
                                                                    position: 'absolute',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}
                                                            />
                                                        )}>
                                                        <MenuItem value="1" style={{ justifyContent: 'flex-end' }}>
                                                            فروردین
                                                        </MenuItem>
                                                        <MenuItem value="2" style={{ justifyContent: 'flex-end' }}>
                                                            اردیبهشت
                                                        </MenuItem>
                                                        <MenuItem value="3" style={{ justifyContent: 'flex-end' }}>
                                                            خرداد
                                                        </MenuItem>
                                                        <MenuItem value="4" style={{ justifyContent: 'flex-end' }}>
                                                            تیر
                                                        </MenuItem>
                                                        <MenuItem value="5" style={{ justifyContent: 'flex-end' }}>
                                                            مرداد
                                                        </MenuItem>
                                                        <MenuItem value="6" style={{ justifyContent: 'flex-end' }}>
                                                            شهریور
                                                        </MenuItem>
                                                        <MenuItem value="7" style={{ justifyContent: 'flex-end' }}>
                                                            مهر
                                                        </MenuItem>
                                                        <MenuItem value="8" style={{ justifyContent: 'flex-end' }}>
                                                            آبان
                                                        </MenuItem>
                                                        <MenuItem value="9" style={{ justifyContent: 'flex-end' }}>
                                                            آذر
                                                        </MenuItem>
                                                        <MenuItem value="10" style={{ justifyContent: 'flex-end' }}>
                                                            دی
                                                        </MenuItem>
                                                        <MenuItem value="11" style={{ justifyContent: 'flex-end' }}>
                                                            بهمن
                                                        </MenuItem>
                                                        <MenuItem value="12" style={{ justifyContent: 'flex-end' }}>
                                                            اسفند
                                                        </MenuItem>
                                                    </Select>
                                                </Grid>
                                                <Grid item sm={6} style={{ textAlign: 'left' }}>
                                                    <Select
                                                        value={selectedYear}
                                                        onChange={handleChangeYear}
                                                        fullWidth
                                                        style={{
                                                            height: '30px',
                                                            color: '#0877BD',
                                                            border: '1px solid #0877BD',
                                                            borderRadius: '5px',
                                                            textAlign: 'right',
                                                        }}
                                                        IconComponent={() => (
                                                            <img
                                                                src={DropdownIcon}
                                                                alt="Dropdown Icon"
                                                                style={{
                                                                    width: '16px',
                                                                    height: '5px',
                                                                    marginRight: '5px',
                                                                    right: 'auto',
                                                                    left: '8px',
                                                                    pointerEvents: 'none',
                                                                    position: 'absolute',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}
                                                            />
                                                        )}>
                                                        {[...Array(10)].map((_, index) => {
                                                            const currentJalaliDate = moment();
                                                            const year = currentJalaliDate.jYear() - index;
                                                            return (
                                                                <MenuItem
                                                                    value={year.toString()}
                                                                    style={{ justifyContent: 'flex-end' }}>
                                                                    {year}
                                                                </MenuItem>
                                                            );
                                                        })}
                                                    </Select>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <DLoadingWrapper loading={chartLoading}>
                                        <>
                                            <Grid container spacing={0} style={{ direction: 'rtl' }}>
                                                <Grid
                                                    item
                                                    xs={8}
                                                    style={{ padding: '20px', paddingLeft: '60px', minHeight: '400px' }}>
                                                    <Bar data={chartData} options={chartOptions} type={'bar'} />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    {saleCategoryData.map((data, index) => (
                                                        <SaleCategory
                                                            index={index}
                                                            data={data}
                                                            theme={index % 2 === 0 ? 'Blue' : 'Gray'}
                                                        />
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        </>
                                    </DLoadingWrapper>
                                </DBox>
                            </Grid>

                            <Grid item sm={12}>
                                <TitleBox
                                    sx={{ marginTop: '20px', padding: '16px' }}
                                    btnTop={true}
                                    data={{
                                        title: 'سفارشات اخیر کارمندان',
                                        linkText: 'مشاهده همه',
                                        linkPath: '#',
                                        hideLink: true,
                                    }}>
                                    <DLoadingWrapper loading={loading}>
                                        <>
                                            {employeesRequestData.map((data, index) => (
                                                <EmployeeRequest data={data} theme={index % 2 === 0 ? 'Blue' : 'Gray'} />
                                            ))}
                                        </>
                                    </DLoadingWrapper>
                                </TitleBox>
                            </Grid>

                            <Grid item sm={6}>
                                <TitleBox
                                    sx={{ marginTop: '3rem', padding: '16px' }}
                                    data={{
                                        title: 'جدید ترین درخواست های افزایش اعتبار',
                                        linkText: 'مشاهده همه',
                                        linkPath: '/app/admin/management-requests/credit-requests',
                                    }}>
                                    <DLoadingWrapper loading={loading}>
                                        <>
                                            {creditRequestData.map((data, index) => (
                                                <CreditRequest data={data} />
                                            ))}
                                        </>
                                    </DLoadingWrapper>
                                </TitleBox>
                            </Grid>

                            <Grid item sm={6}>
                                <TitleBox
                                    sx={{ marginTop: '3rem', padding: '16px' }}
                                    data={{
                                        title: 'جدید ترین درخواست های خدمت سازمانی',
                                        linkText: 'مشاهده همه',
                                        linkPath: '/app/admin/management-requests/organization-requests',
                                    }}>
                                    <DLoadingWrapper loading={loading}>
                                        <>
                                            {serviceRequestData.map((data, index) => (
                                                <ServiceRequest data={data} />
                                            ))}
                                        </>
                                    </DLoadingWrapper>
                                </TitleBox>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={3.8}>
                        <TitleBox
                            sx={{ padding: '16px' }}
                            data={{
                                title: 'جدیدترین نظرات',
                                linkText: 'مشاهده همه',
                                linkPath: '/app/admin/comments-management',
                            }}>
                            <DLoadingWrapper loading={loading}>
                                <>
                                    {commentsData.map((data, index) => (
                                        <Comment data={data} />
                                    ))}
                                </>
                            </DLoadingWrapper>
                        </TitleBox>
                        <TitleBox
                            sx={{ marginTop: '3rem', padding: '16px' }}
                            data={{
                                title: 'خدمات با بالاترین امتیاز',
                                linkText: 'مشاهده همه',
                                linkPath: '/app/admin/service-management/service-list?page=1',
                            }}>
                            <Grid xs={12} item sx={{display: 'grid'}}>
                                {servicesData.map((data) => (
                                    <Service data={data} key={`service-with-most-rating-${data.id}`} />
                                ))}
                            </Grid>
                        </TitleBox>
                        <TitleBox
                            sx={{ marginTop: '3rem', padding: '16px' }}
                            data={{
                                title: 'آخرین رویدادها',
                                linkText: 'مشاهده همه',
                                linkPath: '/app/admin/management-events',
                            }}>
                            <DLoadingWrapper loading={loading}>
                                <>
                                    {eventsData.map((data, index) => (
                                        <Event data={data} />
                                    ))}
                                </>
                            </DLoadingWrapper>
                        </TitleBox>
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
export default Dashboard;
