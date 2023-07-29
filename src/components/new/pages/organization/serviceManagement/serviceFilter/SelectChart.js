import {Box, Divider, Grid, InputAdornment, Typography} from '@mui/material';
// Assets
import React, {useState} from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Form, Formik} from "formik";
import CustomInputBase from "../../../../../Common/Form/CustomInputBase";
import SearchIcon from "@mui/icons-material/Search";
import DBox from "../../../../shared/DBox";
import RadioBoxListItem from "./RadioboxListItem";
import {TreeView} from "@mui/lab";
import CustomTreeItem from "./CustomTreeItem";
import CheckboxListItem from "./CheckboxListItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const SelectChart = ({children, ...props}) => {
    const { loading, charts, selectedChart, handleChartCheckboxChange } = props;

    const [chartFilter, setChartFilter] = useState('');
    const [expandedCharts, setExpandedCharts] = useState([]);

    const handleSearchChartChange = (event) => {
        setChartFilter(event.target.value);
    };

    const renderTree = (chart) => (
        <CustomTreeItem
            key={chart.id}
            expandedCategories={expandedCharts}
            setExpandedCategories={setExpandedCharts}
            nodeId={chart.id.toString()}
            sx={{
                '& > .MuiTreeItem-content': {
                    backgroundColor: 'white!important', // Set the background color to inherit or the desired color
                },
                '&:hover > .MuiTreeItem-content': {
                    backgroundColor: 'white!important', // Set the background color to inherit or the desired color
                },
            }}
            label={
                <RadioBoxListItem
                    key={chart.id}
                    data={chart}
                    selectedItems={[selectedChart]}
                    handleChange={handleChartCheckboxChange}>
                    {chart.children_all.length > 0 ? (
                        <span className="flex">
                            {expandedCharts.includes(chart.id) ? <KeyboardArrowDownIcon /> : <ChevronLeftIcon />}
                        </span>

                    ) : null}
                </RadioBoxListItem>
            }
        >
            {chart.children_all.length > 0 && chart.children_all.map((childChart) => renderTree(childChart))}
        </CustomTreeItem>
    );

    return (
        <DBox>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}
                 className={loading.refresh && 'box--isLoading'}>
                <Box className="flex" justifyContent="space-between" p="1rem 3rem ">
                    <Typography variant="h4">انتخاب چارت سازمانی</Typography>
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
                                placeholder={'جستجو چارت سازمانی'}
                                weight
                                inputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                value={chartFilter}
                                onChange={handleSearchChartChange}
                            />
                        </Form>
                    </Formik>
                </Box>
                <Box width="90%" height="100%" m="1rem auto" position="relative" className="scrollable-container" style={{ maxHeight: '400px' }}>
                    <TreeView>
                        {charts
                            .filter((f) => f.name.includes(chartFilter) || chartFilter === '')
                            .map((chart) => renderTree(chart))}
                    </TreeView>
                </Box>

            </Box>
        </DBox>
    );
};

export default SelectChart;
