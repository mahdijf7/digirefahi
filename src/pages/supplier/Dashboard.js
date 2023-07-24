import React, {useEffect, useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
// Utils
import SupplierService from 'service/api/supplier.service';

// Components
import DashboardCard from 'components/Common/Card/DashboardCard';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DBox from 'components/new/shared/DBox';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
// import OrgDashboardLastServices from 'components/new/pages/organization/dashboard/OrgDashboardLastServices';
// import OrgDashboardPublicServices from 'components/new/pages/organization/dashboard/OrgDashboardPublicServices';
// import OrgDashboardCompanyServices from 'components/new/pages/organization/dashboard/OrgDashboardCompanyServices';
// Assets
import SupplierDashboardTicket from 'assets/image/supplier/supplierDashboardTicket.svg';
import SupplierDashboardAdd from 'assets/image/supplier/supplierDashboardAdd.svg';
import CustomInputSearch from "../../components/Common/Form/CustomInputSearch";
import {Form, Formik} from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import SaleTicketListItem from "./SaleTicketListItem";
import DServiceBox from "../../components/new/shared/DServiceBox";
import SearchOrderItems from "./SearchOrderItems";
import SearchOrderDetail from "./SearchOrderDetail";
import {getErrorForSnackbar} from "../../utils/helpers";
import DSnackbar from "../../components/new/shared/DSnackbar";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    scales: {

        x: {
            beginAtZero: true,
            grid: {
                offset: true,
                display: false,

            },
            ticks: {
                callback: function (label) {
                    return `${this.getLabelForValue(label)}`
                }
            }


        },
        y: {
            beginAtZero: true,
            grid: {
                offset: true,
                display: false,

            },


            ticks: {
                callback: function (label) {
                    return `${this.getLabelForValue(label)}`
                }
            }


        }
    },

    plugins: {

        legend: {
            position: 'top',
            rtl: true,
            tooltips: {
                enabled: false
            },
            labels: {
                usePointStyle: false,
                pointStyle: 'circle'
            }
        },

        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['اسفند', 'بهمن', 'دی', 'آذر', 'آبان', 'مهر', 'شهریور', 'مرداد', 'تیر', 'خرداد', 'اردیبهشت', 'فروردین'];
// export const data = {
//     labels: labels,
//     datasets: [{
//         label: 'درآمد(تومان)',
//         data: [100, 190, 800, 880, 100, 550, 400, 800, 810, 560, 500, 400],
//         backgroundColor: [
//             'rgba(8, 119, 189, 1)',
//             'rgba(0, 77, 136, 1)',
//             'rgba(8, 119, 189, 1)',
//             'rgba(0, 77, 136, 1)',
//             'rgba(8, 119, 189, 1)',
//             'rgba(0, 77, 136, 1)',
//             'rgba(8, 119, 189, 1)',
//             'rgba(0, 77, 136, 1)',
//             'rgba(8, 119, 189, 1)',
//             'rgba(0, 77, 136, 1)',
//             'rgba(8, 119, 189, 1)',
//             'rgba(0, 77, 136, 1)',
//         ],
//         borderRadius: 5
//     }]
// }
const breadCrumbLinks = [{title: 'پیشخوان'}];

const Dashboard = () => {
    const [loading, setLoading] = useState({
        initial: true,
        save:false
    });
    const [dashboard, setDashboard] = useState(false);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const [data, setData] = useState([]);
    const [services, setServices] = useState([]);
    const [searchOrders, setSearchOrders] = useState([]);
    const [searchCode, setSearchCode] = useState('');
    const [showSearchPageOrder, setShowSearchPageOrder] = useState(false);
    const [order, setOrder] = useState({});
    const [showOrderDetailDialog, setShowOrderDetailDialog] = useState(false);
    const chartOptions = {
        maintainAspectRatio: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'درآمد (تومان)',
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
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const Initial_Values = {
        name: '',
    };
    const handleSubmit = async (values) => {
        if (loading.save) return;
        setLoading({save: true});
        let reg = {code: values.name}
        setSearchCode(values.name)
        SupplierService.getSearchOrder(reg)
            .then((res) => {

                if (!res.data.data) {
                    setSnackBarData({
                        show: true,
                        data: {
                            text: res.data.meta.msg,
                            type: 'error',
                        },
                    });
                }

               else if (Array.isArray(res.data.data)) {
                    setSearchOrders(res.data.data)
                    setShowSearchPageOrder(true)
                } else {
                    setShowOrderDetailDialog(true)
                    setOrder(res.data.data)
                }
                setLoading({save: false});

            })
            .catch((err) => {
                setLoading({save: false});
            });
        // setFilters({...filters, name});
    };


    const closeShowSearchPageOrder = () => {
        setShowSearchPageOrder(false)
    }
    const closeShowOrderDetail = () => {
        setShowOrderDetailDialog(false);
    }
    const openShowOrderDetail = (item) => {
        setOrder(item)
        setShowOrderDetailDialog(true);
    }
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            await SupplierService.get(`dashboard`, {signal})
                .then((res) => {
                    setDashboard(res.data.data);
           
                    // let labels=[]
                    let dataLabels = []
                    res.data.data.sales_chart.map(item => {
                        // labels.push(item.month)
                        dataLabels.push(item.total_price)
                    })
                    setLoading({
                        initial: false,
                    });
                    const data = {
                        labels: labels,
                        datasets: [{
                            label: 'درآمد(تومان)',
                            data: dataLabels,
                            // data:  [100, 190, 800, 880, 100, 550, 400, 800, 810, 560, 500, 400],
                            backgroundColor: [
                                'rgba(8, 119, 189, 1)',
                                'rgba(0, 77, 136, 1)',
                                'rgba(8, 119, 189, 1)',
                                'rgba(0, 77, 136, 1)',
                                'rgba(8, 119, 189, 1)',
                                'rgba(0, 77, 136, 1)',
                                'rgba(8, 119, 189, 1)',
                                'rgba(0, 77, 136, 1)',
                                'rgba(8, 119, 189, 1)',
                                'rgba(0, 77, 136, 1)',
                                'rgba(8, 119, 189, 1)',
                                'rgba(0, 77, 136, 1)',
                            ],
                            borderRadius: 5
                        }]
                    }
                    setData(data)
                    setServices(res.data.data.my_services)
                })
                .catch((err) => {
                    console.log('error occured!');
                });
        })();
        return () => controller.abort();
    }, []);

    return (
        <DashboardCard pt="2rem">
            <Breadcrumb links={breadCrumbLinks}/>
            <DLoadingWrapper loading={loading.initial}>
                {dashboard && (
                    <>
                        {showSearchPageOrder && (

                            <SearchOrderItems
                                onClose={() => closeShowSearchPageOrder()}
                                searchCode={searchCode}
                                searchOrders={searchOrders}
                                openShowOrderDetail={openShowOrderDetail}

                            />
                        )}
                        {showOrderDetailDialog && (

                            <SearchOrderDetail
                                onClose={() => closeShowOrderDetail()}
                                order={order}
                                searchCode={searchCode}


                            />
                        )}
                        <DSnackbar
                            open={snackBarData.show}
                            info={snackBarData.data}
                            onClose={() => setSnackBarData({...snackBarData, show: false})}
                        />
                        <Grid container spacing="24px" mt="30px">
                            <Grid item xs={7}>
                                <DBox sx={{p: '20px 28px'}}>
                                    <Box
                                        sx={{...boxStyle}}>
                                        <span style={{marginBottom: 10}}>بررسی بلیط</span>

                                        <Formik initialValues={Initial_Values} onSubmit={handleSubmit}>
                                            <Form>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        justifyContent: "space-between",
                                                    }}>
                                                    <CustomInputSearch
                                                        sx={{minWidth: '450px !important'}}
                                                        placeholder={'جستجو بر اساس کد رهگیری یا شماره ملی'}
                                                        name="name"
                                                    />


                                                    <LoadingButton
                                                        variant="contained"
                                                        loading={loading.save}
                                                        sx={blueBtnStyle}
                                                        color="error"
                                                        type={'submit'}>جستجو
                                                    </LoadingButton>
                                                </Box>
                                            </Form>

                                        </Formik>

                                    </Box>
                                </DBox>
                            </Grid>
                            <Grid item xs={2.5}>
                                <DBox sx={{p: '20px 28px', ...DboxBorderStyle}}
                                >
                                    <Box
                                        sx={{
                                            ...boxStyle,
                                            alignItems: 'center',
                                        }}>
                                        <img src={SupplierDashboardAdd} style={{width: '42px'}}/>
                                        <p>جمع درآمد (تومان)</p>
                                        <span>{dashboard.total_income}</span>


                                    </Box>
                                </DBox>
                            </Grid>
                            <Grid item xs={2.5}>
                                <DBox sx={{p: '20px 28px', ...DboxBorderStyle}}
                                >
                                    <Box
                                        sx={{
                                            ...boxStyle, alignItems: 'center',
                                        }}>
                                        <img src={SupplierDashboardTicket} style={{width: '42px'}}/>
                                        <p>تعداد بلیط استفاده شده</p>
                                        <span>{dashboard.total_used_ticket}</span>


                                    </Box>
                                </DBox>
                            </Grid>
                        </Grid>
                        <Grid container spacing="24px" mt="30px">
                            <Grid item xs={6}>
                                <DBox sx={{p: '20px 28px'}}>
                                    <Box
                                        sx={{
                                            padding: '20px', paddingLeft: '60px', minHeight: '400px',
                                            ...boxStyle
                                        }}>
                                        <span style={{marginBottom: 10}}>نمودار فروش سالانه</span>
                                        {/*<Bar options={options} data={data}/>*/}

                                        <Bar data={data} options={chartOptions} type={"bar"}/>

                                    </Box>


                                </DBox>
                            </Grid>
                            <Grid item xs={6}>
                                <DBox sx={{p: '20px 28px', height: '440px'}}>
                                    <Box
                                        sx={{
                                            ...boxStyle
                                        }}>
                                        <Box sx={{
                                            marginBottom: "10px",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: "100%"
                                        }}>
                                            <span>آخرین بلیط های فروخته شده</span>
                                            <Link style={{ textDecoration: 'none',width: '28%',display: 'grid' }} to={`/app/supplier/used-tickets`}>
                                            <LoadingButton
                                                variant="contained"
                                                sx={blueLightBtnStyle}
                                                color="error"
                                                type={'submit'}>مشاهده همه بلیط ها
                                            </LoadingButton>
                                            </Link>
                                        </Box>

                                        {dashboard.last_orders && dashboard.last_orders.map((item, index) => (

                                            index <= 4 &&
                                            <SaleTicketListItem item={item}
                                                                background={index % 2 === 0 ? "rgba(237, 251, 255, 1)" : "rgba(242, 242, 247, 1)"}
                                                                border={index % 2 === 0 ? "rgba(8, 119, 189, 1)" : "rgba(180, 180, 180, 1)"}/>
                                        ))}

                                    </Box>
                                </DBox>
                            </Grid>

                        </Grid>

                        <Grid container spacing="24px" mt="30px">
                            <Grid item xs={12}>
                                <DBox sx={{p: '20px 28px'}}>
                                    <Box
                                        sx={{
                                            ...boxStyle
                                        }}>

                                        <Box sx={{
                                            marginBottom: "10px",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: "100%"
                                        }}>
                                            <span>خدمات رفاهی من</span>
                                            <Link style={{ textDecoration: 'none',width: '12%',display: 'grid' }} to={`/app/supplier/my-services`}>
                                            <LoadingButton
                                                variant="contained"
                                                sx={blueLightBtnStyle}
                                                color="error"
                                                type={'submit'}>مشاهده همه خدمات
                                            </LoadingButton>
                                            </Link>
                                        </Box>

                                        <Grid container columnSpacing={'44px'} rowSpacing="30px" mt={'10px'}>
                                            {services && services.length === 0 &&
                                            <Typography>سرویسی برای نمایش وجود ندارد.</Typography>}
                                            {services.map((service, index) => (
                                                index <= 5 &&
                                                <Grid item md={2} xl={2.4} key={service.id}>
                                                    <DServiceBox service={service} tag={''}/>
                                                </Grid>
                                            ))}

                                        </Grid>

                                    </Box>
                                </DBox>
                            </Grid>
                        </Grid>
                    </>
                )}
            </DLoadingWrapper>
        </DashboardCard>
    );
};
const style = {
    background: '#EDFBFF',
    border: '1px solid #0877BD',
    borderRadius: '5px',
    padding: '0 10px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#0877BD',
    textDecoration: 'none',
};
const boxStyle = {
    p: '16px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: "space-between",
    gap: '8px',
    fontWeight: 600,
    color: '#000',
    flexDirection: 'column',
}
const titleStyles = {
    fontSize: '20px',
};
const DboxBorderStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: "space-between",
    border: "1.4px solid rgba(8, 119, 189, 1)",
    fontWeight: 600,
    padding: "7px 28px",
    color: 'rgba(8, 119, 189, 1)',
    '& span': {
        color: 'rgba(0, 77, 136, 1)',
    },
    '& p': {
        color: 'rgba(8, 119, 189, 1)',
    }
}


const blueBtnStyle = {
    padding: "8px 55px",
    backgroundColor: "rgba(8, 119, 189, 1)",
    border: "1px solid rgba(8, 119, 189, 1)",
    borderRadius: "5px",
    fontSize: 12,
    color: "#fff",
    textDecoration: "none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: "0 20px",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration: "none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(8, 119, 189, 1)",
        color: "#fff",
        textDecoration: "none",
    },
}
const blueLightBtnStyle = {
    padding: "4px 10px",
    backgroundColor: "rgba(237, 251, 255, 1)",
    border: "1px solid rgba(8, 119, 189, 1)",
    borderRadius: "5px",
    fontSize: 12,
    color: "rgba(8, 119, 189, 1)",
    textDecoration: "none",
    fontFamily: `"IRANSans", "sans-serif", "serif"`,
    margin: "0",
    boxShadow: 'none',
    '&:hover': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(237, 251, 255, 1)",
        color: "rgba(8, 119, 189, 1)",
        textDecoration: "none"
    },
    '&:visited,&:active,& a': {
        boxShadow: 'none !important',
        backgroundColor: "rgba(237, 251, 255, 1)",
        color: "rgba(8, 119, 189, 1)",
        textDecoration: "none",
    },
}

export default Dashboard;
