import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Checkbox, FormControlLabel, Typography, Grid } from '@mui/material';

function CustomProfileChekbox({ data, onSelect }) {
    const { t } = useTranslation();
    const [checkedState, setCheckedState] = useState(data);
 

    const handleCheckboxChange = (event, index) => {
        const updatedData = [...checkedState];

        updatedData[index] = {
            ...updatedData[index],
            used: event.target.checked ? 1 : 0,
        };
        setCheckedState(updatedData);
        const fixedData = updatedData.filter((item) => item.used === 1); 
        onSelect(fixedData);
 
    };

    return (
        <Box minHeight="10rem" mt="6rem " borderRadius=".8rem" display="flex" border=" .1rem solid #D1D1D6" position="relative">
            <Typography position="absolute" top="-3rem" variant="h4">
                {t('profile.interest')}
            </Typography>
            <Grid container>
                {checkedState.map((list, index) => {
                    return (
                        <Grid display="flex" item xs={10} sm={3} key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={list.used === 1}
                                        onChange={(event) => handleCheckboxChange(event, index)}
                                        inputProps={{ 'aria-label': list.name }}
                                    />
                                }
                                label={list.name}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default CustomProfileChekbox;
