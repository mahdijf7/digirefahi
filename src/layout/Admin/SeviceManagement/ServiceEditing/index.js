import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';

//component
import Container from 'components/Common/Card/Container';
import Card from 'components/Common/Card/Card';
import ServiceEditAddService from './ServiceEditingLayout/ServiceEditAddService';
import ServiceEditAddDescription from './ServiceEditingLayout/ServiceEditAddDescription';
import ServiceEditAddAddress from './ServiceEditingLayout/ServiceEditAddAddress';
import ServiceEditConfirmService from './ServiceEditingLayout/ServiceEditConfirmService';
import NewSeviceCategories from 'layout/Admin/SeviceManagement/NewSeviceCategories';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';

// utils
import adminService from 'service/api/adminService';
import { useSnackbar } from 'store/Snackbar-context';
import DSnackbar from 'components/new/shared/DSnackbar';

// style
import { ColorGreyBorder, ColorGrey, ColorBlack } from 'assets/theme/color';
// import { newServiceSchemas, newServiceSchemasDate } from 'components/Schemas/AdminSchemas';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { theme } from 'assets/theme/default';
import NewServiceChcekbox from '../NewServiceShare/NewServiceChcekbox';
import { useNavigate } from 'react-router-dom';
const { palette } = theme;

function ServiceEditing(props) {
    const { showAlert } = useSnackbar();

    const [loading, setLoading] = useState({ initial: true, update: false, refresh: false });
    const [expandedItems, setExpandedItems] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
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
    const [uploadImage, setUploadImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [serviceData, setServiceData] = useState(null);
    const [provinceChipOption, setProvinceChipOption] = useState(null);
    const [addressChipOption, setAddressChipOption] = useState(null);
    const [selectedFileError, setSelectedFileError] = useState(null);
    const navigate = useNavigate();
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });

    const [type, setType] = useState({
        basic: true,
        company: false,
    });
    const { id } = useParams();

    const { t } = useTranslation();

    const newServiceSchemas = yup.object().shape({
        name: yup.string().nullable().required('نام الزامی است'),
        price: yup.string().required(t('مبلغ الزامی است')),
        description: yup.string('').required('توضیحات الزامی است'),
        images: yup.mixed().when([], {
            is: () => uploadImage?.length < 0,
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
        order_limit: yup.string('').required('سقف قابل استفاده الزامی است'),
        long_description: yup.string('').required('توضیخات الزامی است'),
        terms_of_use: yup.string('').required('شرایط استفاده الزامی است'),
        supplier_id: yup.object().nullable().required('تامین کننده الزامی است'),
    });

    // defaultValue={}

    const initialValues = {
        name: serviceData?.name || '',
        price: serviceData?.price || '',
        description: serviceData?.description || '',
        supplier_id: serviceData?.supplier || '',
        address_ides: serviceData?.address || '',
        category_id: '',
        province_ids: serviceData?.province || '',
        value: serviceData?.value || '',
        images: '',
        expired_at: serviceData?.expired_at || '',
        status: serviceData?.status || '',
        long_description: serviceData?.long_description || '',
        terms_of_use: serviceData?.terms_of_use || '',
        companies_ides: serviceData?.companies || '',
        ticket_type_id: serviceData?.ticket_type || '',
        order_limit: serviceData?.order_limit || '',
        file: '',
    };

    const handleSubmit = async (values, actions) => {
        const fd = new FormData();
        fd.append('_method', 'PUT');
        values.name && fd.append('name', values.name);
        values.file && fd.append('file', selectedFile);
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

        updateService(fd, actions);
    };

    console.log(expandedItems, 'mahdihidfbjksdb');

    const rowTwoProvinceSelected = (province) => {
        console.log(province, 'data');
        setProvinceChipOption(province);
        const ids = province.map((item) => item.id);
        console.log(province);
        setSelectedProvince((prev) => ids);
    };
    const rowThreeSupplierSelected = (supplier) => {
        setSupplierId(supplier?.id);
        console.log(supplier, 'test updating supplier id');
    };
    const selectedAddress = (data) => {
        console.log(data);
        setAddressChipOption(data);
        const ids = data.map((item) => item.id);
        setAddress((prev) => ids);
    };

    const handleSelectCategory = (selected) => {
        setSelectedCategory(selected);
    };

    const selectedtTiket = (data) => {
        console.log(data.id, data.name, 'GETTING THE DATA OF TIKET');
        setTiket(data?.id);
    };
    const selectedCompany = (data) => {
        setCompanyData(data);
        const ids = data.map((item) => item.id);
        setCompany((prev) => ids);
    };

    const handleChange = (event) => {
        console.log(event.target.checked, 'CHEKED STATUS');
        setChecked(event.target.checked);
    };
    const getServiceData = async () => {
        setLoading((prev) => {
            return { ...prev, refresh: true };
        });
        await adminService
            .getServiceById(`/${id}`)
            .then((res) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
                const seviceRes = res.data.data;
                rowThreeSupplierSelected(seviceRes?.supplier);
                rowTwoProvinceSelected(seviceRes?.province);
                selectedAddress(seviceRes?.address);
                selectedtTiket(seviceRes?.ticket_type);
                selectedCompany(seviceRes?.companies);
                setServiceData(seviceRes);
            })
            .catch((err) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
            });
    };
    const getCategoryData = async (enteredData) => {
        setLoading((prev) => {
            return { ...prev, refresh: true };
        });
        await adminService
            .newServiceCategory(enteredData)
            .then((res) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
                setCategoryData(res.data.data);
            })
            .catch((err) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false };
                });
            });
    };
    const updateService = async (enteredData, actions) => {
        setLoading((prev) => {
            return { ...prev, update: true };
        });
        await adminService
            .updateService(id, enteredData)
            .then((res) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false, update: false };
                });
                console.log(res.data, 'RESPONSE OF CREATING SERVICE');
                setSnackBarData({
                    show: true,
                    data: {
                        text: 'ویرایش سرویس با موفقیت انجام شد.',
                        type: 'success',
                    },
                });

                navigate('/app/admin/service-management/service-list');
            })
            .catch((err) => {
                setLoading((prev) => {
                    return { ...prev, initial: false, refresh: false, update: false };
                });
                // console.log(err.response.data, 'dslkjflksdjkfjdsljf', 1e2321434);
                if (err?.response?.status === 422) actions.setErrors(err.response.data.data);
                setSnackBarData({
                    show: true,
                    data: {
                        text: err?.response?.data.message || 'مشگلی پیش آمد',
                        type: 'error',
                    },
                });
            });
    };

    const getAllServiceDiscountTicket = async (enteredData) => {
        await adminService
            .get(`codes-export/${id}`)
            .then((res) => {
                setSelectedFile(res.data.data);
            })
            .catch((err) => {
                setSelectedFileError(err.response.data.meta.msg);
            });
    };

    useEffect(() => {
        serviceData?.expired_at && setIsChecked(false);
    }, [isChecked, serviceData]);

    useEffect(() => {
        getCategoryData();
        getServiceData();
    }, []);
    useEffect(() => {
        tiket && getAllServiceDiscountTicket();
    }, [tiket]);
    useEffect(() => {
        if (serviceData?.type) {
            setType((prev) => {
                return {
                    company: serviceData?.type === 'BASIC' ? false : true,
                    basic: serviceData?.type === 'BASIC' ? true : false,
                };
            });
        }
    }, [serviceData]);

    useEffect(() => {
        const newCategory = categoryData.filter((item) => item.id === serviceData?.category_id);
        setSelectedCategory(newCategory);
    }, [categoryData, serviceData]);

    useEffect(() => {
        setUploadImage(serviceData?.images);
    }, [serviceData]);

    useEffect(() => {
        if (serviceData?.status) setChecked(serviceData?.status === 'ACTIVE' ? true : false);
    }, [serviceData]);
    return (
        <Container breadcrumb={linkData}>
            <DLoadingWrapper loading={loading.initial}>
                {serviceData?.name && (
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={newServiceSchemas}>
                        {({ values, setFieldValue }) => (
                            <Form>
                                <Grid container spacing="2rem">
                                    <Grid item sm={3.5}>
                                        <NewServiceChcekbox type={type} setType={setType} />
                                        <Card mb="2rem" minHeight="73.5rem">
                                            <Box className="flex" justifyContent="space-between" p="1rem 3rem ">
                                                <Typography variant="h4">{t('newService.categoryOfServices')}</Typography>
                                                <span className="flex">
                                                    <KeyboardArrowDownIcon sx={{ fontSize: '3rem' }} />
                                                </span>
                                            </Box>
                                            <Divider />
                                            <NewSeviceCategories
                                                expandedItems={expandedItems}
                                                setExpandedItems={setExpandedItems}
                                                serviceData={serviceData}
                                                selectedCategory={selectedCategory}
                                                onSelect={handleSelectCategory}
                                                loading={loading.initial}
                                                data={categoryData}
                                            />
                                        </Card>
                                    </Grid>
                                    <Grid item sm={8.5}>
                                        <ServiceEditAddService
                                            values={values}
                                            provinceChipOption={provinceChipOption}
                                            rowTwoProvinceSelected={rowTwoProvinceSelected}
                                            setProvinceChipOption={setProvinceChipOption}
                                            categoryData={categoryData}
                                            expandedItems={expandedItems}
                                            setExpandedItems={setExpandedItems}
                                            serviceData={serviceData}
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
                                            basic={type.basic}
                                            supplierId={supplierId}
                                            setSupplierId={setSupplierId}
                                            selectedCategory={selectedCategory}
                                        />

                                        <ServiceEditAddDescription values={values} autosizeStyle={autosizeStyle} />
                                        <ServiceEditAddAddress
                                            values={values}
                                            addressChipOption={addressChipOption}
                                            setAddressChipOption={setAddressChipOption}
                                            selectedAddress={selectedAddress}
                                            selectedProvince={selectedProvince}
                                            serviceData={serviceData}
                                            autocompleteStyle={autocompleteStyle}
                                            supplierId={supplierId}
                                            setAddress={setAddress}
                                            address={address}
                                        />
                                        <ServiceEditConfirmService
                                            setFieldValue={setFieldValue}
                                            selectedFileError={selectedFileError}
                                            values={values}
                                            selectedtTiket={selectedtTiket}
                                            selectedCompany={selectedCompany}
                                            serviceData={serviceData}
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
                                            loading={loading.update}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                )}
            </DLoadingWrapper>
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </Container>
    );
}

export default ServiceEditing;

const linkData = [
    { link: '/app/admin/dashboard', title: 'پیشخوان', dash: '/' },
    { link: '/app/admin/service-management/service-list/service-editing', title: 'ویرایش خدمت' },
];

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
