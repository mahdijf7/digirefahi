import {Box, Divider, Grid, InputAdornment, Typography} from '@mui/material';
// Assets
import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Form, Formik} from "formik";
import CustomInputBase from "../../../../../Common/Form/CustomInputBase";
import SearchIcon from "@mui/icons-material/Search";
import DBox from "../../../../shared/DBox";
import RadioBoxListItem from "./RadioboxListItem";

const SelectCompany = ({children, ...props}) => {
    const { loading, companies, selectedCompany, handleCompanyCheckboxChange } = props;

    const [companyFilter, setCompanyFilter] = useState('');

    const handleSearchCompanyChange = (event) => {
        setCompanyFilter(event.target.value);
    };

    return (
        <DBox>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}
                 className={loading.refresh && 'box--isLoading'}>
                <Box className="flex" justifyContent="space-between" p="1rem 3rem ">
                    <Typography variant="h4">انتخاب سازمان</Typography>
                    <span className="flex">
                        <KeyboardArrowDownIcon sx={{ fontSize: '3rem' }} />
                    </span>
                </Box>
                <Divider />
                <Box sx={{ display: 'grid', padding: '20px 30px 0 30px' }}>
                    <Formik initialValues={{ categoryName: '' }}>
                        <Form>
                            <CustomInputBase
                                name="categoryName"
                                placeholder={'جستجو سازمان'}
                                weight
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={companyFilter}
                                onChange={handleSearchCompanyChange}
                            />
                        </Form>
                    </Formik>
                </Box>
                <Box width="90%" height="100%" m="1rem auto" position="relative"
                     className="scrollable-container" style={{maxHeight: '400px'}}>

                    {companies.filter(f => f.name.includes(companyFilter) || companyFilter === '')
                        .map(((company, index) => {
                            return (
                                <RadioBoxListItem
                                    key={company.id}
                                    data={company}
                                    selectedItems={[selectedCompany]}
                                    handleChange={handleCompanyCheckboxChange}/>
                            );
                        }))}
                </Box>

            </Box>
        </DBox>
    );
};

export default SelectCompany;
