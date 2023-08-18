import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

//component
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DashboardCard from 'components/Common/Card/DashboardCard';
import Card from 'components/Common/Card/Card';
import AddService from './NewServiceLayout/AddService';
import AddDescription from './NewServiceLayout/AddDescription';
import AddAddress from './NewServiceLayout/AddAddress';
import ConfirmService from './NewServiceLayout/ConfirmService';
import NewSeviceCategories from 'layout/Admin/SeviceManagement/NewSeviceCategories';
import NewServiceCheckboxNotSelected from './NewServiceLayout/NewServiceCheckboxNotSelected';

// utils
import adminService from 'service/api/adminService';

import DSnackbar from 'components/new/shared/DSnackbar';

// style
import { ColorGreyBorder, ColorGrey, ColorBlack } from 'assets/theme/color';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { theme } from 'assets/theme/default';
const { palette } = theme;

function NewService(props) {
    const navigate = useNavigate();
    const [expandedItems, setExpandedItems] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(true);
    const [isChecked, setIsChecked] = useState(true);
    const [address, setAddress] = useState(null);
    const [supplierId, setSupplierId] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [company, setCompany] = useState(null);
    const [tiket, setTiket] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [document, setDocument] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const [type, setType] = useState({
        basic: false,
        company: false,
    });

    const { t } = useTranslation();

    const newServiceSchemas = yup.object().shape({
        name: yup.string().nullable().required('نام الزامی است'),
        price: yup.string().required(t('مبلغ الزامی است')),
        description: yup.string('').required('توضیحات الزامی است'),
        images: yup.mixed().when([], {
            is: () => !uploadImage,
            then: yup
                .mixed()
                .test('fileType', 'عکس  معتبر نیست', (value) => {
                    return ['image/jpeg', 'image/png'].includes(value?.type);
                })
                .required('عکس  الزامی است'),
            otherwise: yup.mixed().nullable().notRequired(),
        }),
        expired_at: yup.string().when([], {
            is: () => !isChecked,
            then: yup.string().required('تاریخ الزامی است'),
            otherwise: yup.string().nullable().notRequired(),
        }),

        value: yup.string().when([], {
            is: () => tiket !== 1,
            then: yup.string().required('تعداد الزامی است'),
            otherwise: yup.string().nullable().notRequired(),
        }),
        file: yup.string().when([], {
            is: () => tiket === 1,
            then: yup.string().required('کد تخفیف الزامی است'),
            otherwise: yup.string().nullable().notRequired(),
        }),
        ticket_type_id: yup.object().nullable().required('نوع بلیط الزامی است'),
        order_limit: yup.string('').required('سقف قابل استفاده الزامی است'),
        long_description: yup.string('').required('توضیخات الزامی است'),
        terms_of_use: yup.string('').required('شرایط استفاده الزامی است'),
        supplier_id: yup.object().nullable().required('تامین کننده الزامی است'),
    });

    const initialValues = {
        name: '',
        price: '',
        description: '',
        supplier_id: '',
        address_ides: '',
        category_id: '',
        province_ids: '',
        value: '',
        images: '',
        expired_at: '',
        status: '',
        long_description: '',
        terms_of_use: '',
        companies_ides: [],
        ticket_type_id: '',
        order_limit: '',
        file: '',
    };

    const handleSubmit = async (values, actions) => {
        console.log(values);
        const fd = new FormData();

        values.name && fd.append('name', values.name);
        values.file && fd.append('file', values.file);
        values.price && fd.append('price', values.price);
        values.value && fd.append('value', values.value);
        expandedItems &&
            expandedItems[expandedItems.length - 1] &&
            fd.append('category_id', expandedItems[expandedItems.length - 1]);
        values.description && fd.append('description', values.description);
        values.expired_at && fd.append('expired_at', values.expired_at);
        fd.append('status', checked ? 'ACTIVE' : 'DEACTIVATE');
        values.long_description && fd.append('long_description', values.long_description);
        values.terms_of_use && fd.append('terms_of_use', values.terms_of_use);
        type && fd.append('type', type.basic === true ? 'BASIC' : 'COMPANY');
        values.order_limit && fd.append('order_limit', values.order_limit);
        tiket && fd.append('ticket_type_id', tiket);
        supplierId && fd.append('supplier_id', supplierId);

        uploadImage && uploadImage.map((el, index) => fd.append(`images[${index}]`, el));

        address && address.map((el, index) => fd.append(`address_ides[${index}]`, el));

        selectedProvince && selectedProvince.map((el, index) => fd.append(`province_ids[${index}]`, el));

        company && company.map((el, index) => fd.append(`companies_ides[${index}]`, el));

        createNewService(fd, actions);
    };

    const rowThreeSupplierSelected = (supplier) => {
        setSupplierId(supplier?.id);
        console.log(supplier?.id);
    };

    const handleSelectCategory = (item) => {
        setSelectedCategory(item);
    };

    const handleChange = (event) => {
        // console.log(event.target.checked, 'CHEKED STATUS');
        setChecked(event.target.checked);
    };
    const getCategoryData = async (enteredData) => {
        setLoading(true);

        await adminService
            .newServiceCategory(enteredData)
            .then((res) => {
                setLoading(false);
                setCategoryData(res.data.data);
            })
            .catch((err) => {
                setLoading(false);
            });
    };
    const createNewService = async (enteredData, actions) => {
        setLoading(true);
        await adminService
            .createService(enteredData)
            .then((res) => {
                setLoading(false);
                console.log(res.data, 'RESPONSE OF CREATING SERVICE');
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'سرویس با موفقیت ثبت شد.',
                        type: 'success',
                    },
                });
                navigate('/app/admin/service-management/service-list');
            })
            .catch((err) => {
                setLoading(false);
                if (err?.response.status === 422) actions.setErrors(err.response.data.data);
                console.log(err.response.data, 'dlflkdsjlfkjsdjlf', 43234);
                setSnackBarData({
                    show: true,
                    data: {
                        text: err.response.data?.message || 'مشگلی پیش آمد',
                        type: 'error',
                    },
                });
            });
    };

    useEffect(() => {
        getCategoryData();
    }, []);

    return (
        <DashboardCard pt="22px" meta={{ title: 'تعریف خدمت جدید' }}>
            <Breadcrumb links={breadCrumbLinks} />
            <Box sx={{ mt: '22px' }}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={newServiceSchemas}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Grid container spacing="2rem">
                                <Grid item sm={3.5}>
                                    <NewServiceCheckboxNotSelected type={type} setType={setType} />
                                    <Card mb="2rem" minHeight="73.5rem">
                                        <Box className="flex" justifyContent="space-between" p="1rem 3rem ">
                                            <Typography variant="h4">{t('newService.categoryOfServices')}</Typography>
                                            <span className="flex">
                                                <KeyboardArrowDownIcon sx={{ fontSize: '3rem' }} />
                                            </span>
                                        </Box>
                                        <Divider />
                                        <NewSeviceCategories
                                            values={values}
                                            categoryData={categoryData}
                                            expandedItems={expandedItems}
                                            setExpandedItems={setExpandedItems}
                                            selectedCategory={selectedCategory}
                                            onSelect={handleSelectCategory}
                                            loading={loading.initial}
                                            data={categoryData}
                                        />
                                    </Card>
                                </Grid>
                                <Grid item sm={8.5}>
                                    <AddService
                                        values={values}
                                        type={type}
                                        supplierId={supplierId}
                                        selectedProvince={selectedProvince}
                                        setSelectedProvince={setSelectedProvince}
                                        uploadImage={uploadImage}
                                        setUploadImage={setUploadImage}
                                        isChecked={isChecked}
                                        setIsChecked={setIsChecked}
                                        document={document}
                                        setDocument={setDocument}
                                        autosizeStyle={autosizeStyle}
                                        rowThreeSupplierSelected={rowThreeSupplierSelected}
                                        autocompleteStyle={autocompleteStyle}
                                        setSupplierId={setSupplierId}
                                        selectedCategory={selectedCategory}
                                        categoryData={categoryData}
                                        expandedItems={expandedItems}
                                        setExpandedItems={setExpandedItems}
                                    />

                                    <AddDescription values={values} autosizeStyle={autosizeStyle} />
                                    <AddAddress
                                        values={values}
                                        selectedProvince={selectedProvince}
                                        autocompleteStyle={autocompleteStyle}
                                        supplierId={supplierId}
                                        setAddress={setAddress}
                                        address={address}
                                    />
                                    <ConfirmService
                                        setFieldValue={setFieldValue}
                                        values={values}
                                        companyData={companyData}
                                        setCompanyData={setCompanyData}
                                        tiket={tiket}
                                        setTiket={setTiket}
                                        selectedFile={selectedFile}
                                        setSelectedFile={setSelectedFile}
                                        handleChange={handleChange}
                                        autocompleteStyle={autocompleteStyle}
                                        company={company}
                                        setCompany={setCompany}
                                        setChecked={setChecked}
                                        checked={checked}
                                        loading={loading}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
}
const chekboxStyle = {
    '& .MuiSvgIcon-root': { fontSize: '2.4rem' },
    '&.Mui-checked': {
        color: 'primary.main',
    },
};

const autosizeStyle = {
    border: `.2rem dashed ${palette.info.border} `,
    '&:focus': {
        outline: `.24rem dashed ${theme.palette.primary.main} !important`,
        border: `.2rem dashed white !important`,
    },
};

const autocompleteStyle = {
    '& .MuiBox-root': {
        backgroundColor: ColorGrey,
        height: '2.8rem !important',
        color: ` ${ColorBlack}`,
        borderRadius: '.6rem !important',
        '& fieldset': {
            border: `.1rem solid${ColorGreyBorder} `,
        },
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: palette.info.input,
        fontSize: '1.1rem',
        display: 'flex',
        height: '2.8rem !important',
        padding: '0 !important',
        margin: '0 !important',
    },

    '& .MuiAutocomplete-endAdornment': {
        marginTop: '-.2rem',
        '& svg': {
            width: '1rem',
            height: '1rem',
        },
    },
};

const breadCrumbLinks = [
    { path: '/app/admin/', title: 'پیشخوان' },
    { path: '/app/admin/service-management/new-service/', title: 'مدیریت خدمات' },
    { title: 'تعریف خدمت جدید' },
];

export default NewService;
// name: 'پینت بال ساعی',
// price: '300000',
// description:
//     'مجموعه سرپوشیده تهران یکی از امکان جذاب تفریحی شمال غرب تهران می باشد.این مجموعه دارای بازی های جذابی از جمله پینت بال',
// supplier_id: '1',
// address_ides: '2',
// category_id: '2',
// province_ids: '3',
// value: '10',
// images: '',
// expired_at: '',
// status: 'ACTIVE',
// long_description:
//     'تیر های بازیکن های قبلی رو جارو میزنن میدن به ما مشکل اینه شما که تیر بایکن های پیشن رو دارید میدید به ما لاعقل تیر ها رو نامحدود',
// terms_of_use:
//     'تیر های بازیکن های قبلی رو جارو میزنن میدن به ما مشکل اینه شما که تیر بایکن های پیشن رو دارید میدید به ما لاعقل تیر ها رو نامحدود',
// companies_ides: '1',
// ticket_type_id: '2',
// BASIC: true,
// COMPANY: false,
// order_limit: '1',
// file: '',
