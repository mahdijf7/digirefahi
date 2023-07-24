import {Box, Checkbox, Divider, Grid, InputAdornment, Typography} from '@mui/material';
// Assets
import React, {useState} from "react";
import {Paper} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Form, Formik} from "formik";
import CustomInputBase from "../../../../../Common/Form/CustomInputBase";
import SearchIcon from "@mui/icons-material/Search";
import CheckboxListItem from "./CheckboxListItem";
import DBox from "../../../../shared/DBox";
import {LoadingButton, TreeView} from "@mui/lab";
import CustomTreeItem from "./CustomTreeItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const SelectCategories = ({children, ...props}) => {
    const { loading, categories, selectedCategories, setSelectedCategories, setSelectedCategoriesChanged, handleCategoryCheckboxChange } = props;

    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectAllCategoriesFlag, setSelectAllCategoriesFlag] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState([]);

    const handleSearchCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const getTotalCategoriesCount = () => {
        let count = 0;
        const countCategories = (category) => {
            count++;
            category.children_all.forEach(countCategories);
        };
        categories.forEach(countCategories);
        return count;
    };

    const selectAllCategories = (category, selectedCategoriesList) => {
        selectedCategoriesList.push(category);
        category.children_all.forEach((childCategory) => selectAllCategories(childCategory, selectedCategoriesList));
    };

    const handleSelectAllCategories = () => {
        if (selectedCategories.length === getTotalCategoriesCount()) {
            setSelectedCategories([]);
            setSelectedCategoriesChanged(true);
            setSelectAllCategoriesFlag(false);
        } else {
            const allCategories = [];
            categories.forEach((category) => selectAllCategories(category, allCategories));
            setSelectedCategories(allCategories);
            setSelectedCategoriesChanged(true);
            setSelectAllCategoriesFlag(true);
        }
    };

    const renderTree = (category) => (
        <CustomTreeItem
            key={category.id}
            expandedCategories={expandedCategories}
            setExpandedCategories={setExpandedCategories}
            nodeId={category.id.toString()}
            sx={{
                '& > .MuiTreeItem-content': {
                    backgroundColor: 'white!important', // Set the background color to inherit or the desired color
                },
                '&:hover > .MuiTreeItem-content': {
                    backgroundColor: 'white!important', // Set the background color to inherit or the desired color
                },
            }}
            label={
                <CheckboxListItem
                    data={category}
                    selectedItems={selectedCategories}
                    handleChange={handleCategoryCheckboxChange}>
                    {category.children_all.length > 0 ? (
                        <span className="flex">
                            {expandedCategories.includes(category.id) ? <KeyboardArrowDownIcon /> : <ChevronLeftIcon />}
                        </span>

                    ) : null}
                </CheckboxListItem>
            }
        >
            {category.children_all.length > 0 && category.children_all.map((childCategory) => renderTree(childCategory))}
        </CustomTreeItem>
    );

    return (
        <DBox mt={2}>
            <Box
                sx={{ display: 'flex', flexDirection: 'column' }}
                className={loading.refresh && 'box--isLoading'}>
                <Box className="flex" justifyContent="space-between" p="1rem 3rem ">
                    <Typography variant="h4">انتخاب دسته بندی خدمات</Typography>
                    <span className="flex"><KeyboardArrowDownIcon sx={{ fontSize: '3rem' }} /></span>
                </Box>
                <Divider />
                <Box sx={{ display: 'grid', padding: '20px 30px 0 30px' }}>
                    <Formik initialValues={{ categoryName: '' }}>
                        <Form>
                            <CustomInputBase
                                name="categoryName"
                                placeholder={'جستجو دسته بندی'}
                                weight
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={categoryFilter}
                                onChange={handleSearchCategoryChange}
                            />
                        </Form>
                    </Formik>
                </Box>
                <Box sx={{ display: 'grid', padding: '20px 30px 0 30px' }}>
                    <LoadingButton
                        variant="outlined"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            color: '#2C2C2E',
                            borderColor: '#D1D1D6',
                            fontSize: '12px',
                            height: '36px'
                        }}
                        onClick={handleSelectAllCategories}>
                        <Checkbox
                            checked={selectAllCategoriesFlag}
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: '2rem' },
                                '&.Mui-checked': {
                                    color: 'primary.main',
                                },
                            }}
                        />
                        انتخاب همه دسته‌ها
                    </LoadingButton>
                </Box>
                <Box width="90%" height="100%" m="1rem auto" position="relative" className="scrollable-container" style={{ maxHeight: '400px' }}>
                    <TreeView>
                        {categories
                            .filter((f) => f.name.includes(categoryFilter) || categoryFilter === '')
                            .map((category) => renderTree(category))}
                    </TreeView>
                </Box>
            </Box>
        </DBox>
    );
};

export default SelectCategories;
