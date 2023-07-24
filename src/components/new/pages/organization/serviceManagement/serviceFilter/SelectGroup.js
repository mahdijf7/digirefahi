import {Box, Divider, Grid, InputAdornment, Typography} from '@mui/material';
// Assets
import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Form, Formik} from "formik";
import CustomInputBase from "../../../../../Common/Form/CustomInputBase";
import SearchIcon from "@mui/icons-material/Search";
import DBox from "../../../../shared/DBox";
import RadioBoxListItem from "./RadioboxListItem";

const SelectGroup = ({children, ...props}) => {
    const { loading, groups, selectedGroup, handleGroupCheckboxChange } = props;

    const [groupFilter, setGroupFilter] = useState('');

    const handleSearchGroupChange = (event) => {
        setGroupFilter(event.target.value);
    };

    return (
        <DBox>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}
                 className={loading.refresh && 'box--isLoading'}>
                <Box className="flex" justifyContent="space-between" p="1rem 3rem ">
                    <Typography variant="h4">انتخاب گروه</Typography>
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
                                placeholder={'جستجو گروه'}
                                weight
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={groupFilter}
                                onChange={handleSearchGroupChange}
                            />
                        </Form>
                    </Formik>
                </Box>
                <Box width="90%" height="100%" m="1rem auto" position="relative"
                     className="scrollable-container" style={{maxHeight: '400px'}}>

                    {groups.filter(f => f.name.includes(groupFilter) || groupFilter === '')
                        .map(((group, index) => {
                            return (
                                <RadioBoxListItem
                                    key={group.id}
                                    data={group}
                                    selectedItems={[selectedGroup]}
                                    handleChange={handleGroupCheckboxChange}/>
                            );
                        }))}
                </Box>

            </Box>
        </DBox>
    );
};

export default SelectGroup;
