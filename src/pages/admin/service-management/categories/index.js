import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Box, Button, Typography, InputAdornment } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { Form, Formik } from 'formik';

// Utils
import adminService from 'service/api/adminService';
import theme from 'assets/theme';

// Components
import DBox from 'components/new/shared/DBox';
import DSnackbar from 'components/new/shared/DSnackbar';
import Breadcrumb from 'components/new/shared/BreadCrumb/Index';
import DashboardCard from 'components/Common/Card/DashboardCard';
import DLoadingWrapper from 'components/new/shared/DLoadingWrapper';
import DDeleteDialog from 'components/new/shared/DDeleteDialog/Index';
import CategoryTree from 'components/new/pages/admin/categories/categoryTree';
import CustomInputBase from 'components/Common/Form/CustomInputBase';
import CategoryServices from 'components/new/pages/admin/categories/categoryServices';
import CategoryBox from 'components/new/pages/admin/categories/categoryBox';

const systemColors = theme.main.palette;

const AdminCategories = () => {
    const [loading, setLoading] = useState({ initial: true, delete: false, refresh: false });
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    const [showAddCategoryBox, setShowAddCategoryBox] = useState(false);
    const [categories, setCategories] = useState([]);
    const [listId, setListId] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedCategoryForTree, setSelectedCategoryForTree] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
    const { t } = useTranslation();

    const filterCategories = (event) => {
        const temp = [];
        categories.filter((category) => category.name.includes(event.target.value) && temp.push(category));
        setFilteredCategories(temp);
    };
    const openDeleteCategoryDialog = (category) => {
        setSelectedCategory(category);
        setShowDeleteCategoryDialog(true);
    };
    const closeDeleteCategoryDialog = (category) => {
        setSelectedCategory(null);
        setShowDeleteCategoryDialog(false);
    };
    const selectCategoryForTree = (category) => {
        setSelectedCategoryForTree(category);

        // hide services section
        setSelectedSubCategory(null);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const categoryCreated = () => {
        if (loading.refresh) return;
        setLoading({ ...loading, refresh: true });

        setSnackBarData({
            show: true,
            data: {
                text: 'دسته بندی با موفقیت ایجاد شد.',
                type: 'success',
            },
        });

        // hide add category box
        toggleAddCategoryBox();

        // reFetch categories
        getCategories();
    };
    const onTreeChange = () => {
        if (loading.refresh) return;
        setLoading({ ...loading, refresh: true });

        getCategories();
    };
    const deleteCategory = async () => {
        if (loading.delete) return;
        setLoading({ ...loading, delete: true });

        await adminService
            .deleteCategory(selectedCategory.id)
            .then((res) => {
                setLoading({ ...loading, delete: false, refresh: true });
                closeDeleteCategoryDialog();
                setSelectedCategoryForTree(null);
                getCategories();
                window.scrollTo({ top: 0, behavior: 'smooth' });

                setSnackBarData({
                    show: true,
                    data: {
                        text: 'دسته بندی با موفقیت حذف شد.',
                        type: 'success',
                    },
                });
            })
            .catch((err) => {
                console.log('error occured!');
            });
    };
    const getCategories = async (filters) => {
        const queryString = new URLSearchParams();
        if (filters?.categoryName) queryString.append('name', filters.categoryName);

        await adminService
            .getCategories(queryString)
            .then((res) => {
                setCategories(res.data.data);
                setFilteredCategories(res.data.data);
                setListId(listId + 1);
                setLoading({ initial: false, delete: false, refresh: false });
            })
            .catch((err) => {
                console.log('error occured!', err);
            });
    };
    const handleSelectedTreeAction = async (actionName, actionData) => {
        console.log('test');
        if (actionName === 'delete') openDeleteCategoryDialog(actionData);
        else if (actionName === 'seeServices') setSelectedSubCategory(() => actionData);
    };
    const toggleAddCategoryBox = () => {
        setShowAddCategoryBox(!showAddCategoryBox);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <DashboardCard pt="2rem" meta={{ title: 'دسته‌بندی خدمات' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Breadcrumb links={breadCrumbLinks} />
                </Grid>
                <Grid item xs={12} mt="22px">
                    <DLoadingWrapper loading={loading.initial}>
                        <Box sx={{ display: 'flex', gap: '20px', width: '100%', alignItems: 'flex-start' }}>
                            <DBox sx={{ flex: '0 0 300px' }}>
                                <Box
                                    sx={{ display: 'flex', flexDirection: 'column' }}
                                    className={loading.refresh && 'box--isLoading'}>
                                    <Box
                                        sx={{
                                            padding: '16px 30px',
                                            display: 'flex',
                                            borderBottom: `1px solid ${theme.main.palette.text.light}`,
                                        }}>
                                        <Typography fontWeight={600}>انتخاب دسته بندی</Typography>
                                    </Box>

                                    {/* hide searchBar when we want to add new category */}
                                    {!showAddCategoryBox && (
                                        <Box sx={{ display: 'grid', padding: '20px 30px 0 30px' }}>
                                            <Formik initialValues={{ categoryName: '' }}>
                                                <Form>
                                                    <CustomInputBase
                                                        name="categoryName"
                                                        placeholder={t('searchInCategories')}
                                                        weight
                                                        inputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    <SearchIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        onKeyUp={filterCategories}
                                                    />
                                                </Form>
                                            </Formik>
                                        </Box>
                                    )}

                                    <Box sx={categoriesWrapperStyles} key={listId}>
                                        {showAddCategoryBox ? (
                                            <CategoryBox addBox onCancel={toggleAddCategoryBox} onCreate={categoryCreated} />
                                        ) : (
                                            filteredCategories.map((category) => {
                                                return (
                                                    <CategoryBox
                                                        key={category.id}
                                                        defaultValues={category}
                                                        isSelected={
                                                            selectedCategoryForTree && category.id === selectedCategoryForTree.id
                                                        }
                                                        onDelete={openDeleteCategoryDialog}
                                                        onSelect={selectCategoryForTree}
                                                    />
                                                );
                                            })
                                        )}
                                    </Box>

                                    {!showAddCategoryBox && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '24px 0px' }}>
                                            <Button
                                                variant="contained"
                                                color="brandWarning"
                                                sx={{ fontSize: '14px' }}
                                                startIcon={<ListIcon sx={{ ml: 1 }} />}
                                                onClick={toggleAddCategoryBox}>
                                                تعریف دسته بندی
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </DBox>

                            <Box sx={{ flex: 1 }}>
                                <DBox>
                                    <Box
                                        sx={{
                                            padding: '16px 30px',
                                            display: 'flex',
                                            borderBottom: `1px solid ${theme.main.palette.text.light}`,
                                        }}>
                                        <Typography fontWeight={600}>
                                            افزودن زیرمجموعه های&nbsp;
                                            <Typography
                                                component="span"
                                                fontWeight={600}
                                                sx={{
                                                    color: selectedCategoryForTree
                                                        ? selectedCategoryForTree.color
                                                        : theme.main.palette.text.main,
                                                }}>
                                                {selectedCategoryForTree ? selectedCategoryForTree.name : 'عنوان دسته بندی'}&nbsp;
                                            </Typography>
                                            <Typography
                                                component="span"
                                                fontWeight={600}
                                                fontSize="12px"
                                                sx={{
                                                    color: selectedCategoryForTree
                                                        ? selectedCategoryForTree.color
                                                        : theme.main.palette.text.main,
                                                }}>
                                                / &nbsp;
                                                {selectedCategoryForTree ? selectedCategoryForTree.children_all.length : 0}&nbsp;
                                                زیرمجموعه
                                            </Typography>
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'grid', padding: '20px 30px 56px 30px' }}>
                                        {selectedCategoryForTree && (
                                            <CategoryTree
                                                key={selectedCategoryForTree.id}
                                                root={selectedCategoryForTree}
                                                onActionSelected={handleSelectedTreeAction}
                                                onChange={onTreeChange}
                                            />
                                        )}
                                    </Box>
                                </DBox>
                                {selectedSubCategory && (
                                    <CategoryServices key={selectedSubCategory.id} category={selectedSubCategory} />
                                )}
                            </Box>
                        </Box>
                    </DLoadingWrapper>
                </Grid>
            </Grid>

            {/* Delete Group Dialog */}
            {showDeleteCategoryDialog && (
                <DDeleteDialog
                    loading={loading.delete}
                    title="دسته‌بندی"
                    onDelete={deleteCategory}
                    onClose={closeDeleteCategoryDialog}
                />
            )}
            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </DashboardCard>
    );
};

const breadCrumbLinks = [
    { path: '/app/admin/', title: 'پیشخوان' },
    { path: '/app/admin/service-management/categories/', title: 'مدیریت خدمات' },
    { title: 'دسته بندی خدمات' },
];
const categoriesWrapperStyles = {
    padding: '0 30px',
    display: 'grid',
    gap: '10px',
    borderBottom: `1px solid ${systemColors.info.input}`,
    marginTop: '15px',
};
export default AdminCategories;
