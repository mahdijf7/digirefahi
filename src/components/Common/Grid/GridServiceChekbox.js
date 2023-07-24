import React, { useState } from 'react';
import { Grid, Box, Typography, Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../../assets/style/dashboard.scss';

export default function GridServiceCheckbox({ data, checkedIds, setCheckedIds }) {
    const navigate = useNavigate();

    const handleCheckboxChange = (event, id) => {
        if (event.target.checked) {
            setCheckedIds([...checkedIds, id]);
        } else {
            setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
        }
    };
    const style = {
        cursor: 'pointer',
    };
    const updatedData = data.map((item) => {
        const isChecked = checkedIds.includes(item.id);
        return {
            ...item,
            selected: isChecked,
            used: isChecked ? 1 : 0,
        };
    }); 

    return (
        <Grid p="0 3rem 0 0" container spacing="4rem">
            {updatedData.map((list, index) => (
                <Grid position="relative" alignSelf="flex-end" sx={style} key={index} item xs={10} sm={2}>
                    <Box bgcolor="red">
                        <Checkbox
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                position: 'absolute',
                                top: '3rem',
                                right: '-4.5rem',
                            }}
                            checked={checkedIds.includes(list.id)}
                            onChange={(event) => handleCheckboxChange(event, list.id)}
                            inputProps={{ 'aria-label': list.name }}
                        />
                    </Box>
                    <Box borderRadius="1.4rem" boxShadow={1} minHeight="14.9rem" onClick={() => navigate(list.link)}>
                        <Box borderRadius="1.4rem 1.4rem 0 0" height="10rem" bgcolor="primary.main">
                            {list.thumbnail && (
                                <img
                                    style={{ width: '100%', borderRadius: '1.4rem 1.4rem 0 0', height: '10rem' }}
                                    src={process.env.REACT_APP_STORAGE_URL + '/' + list.thumbnail}
                                    alt=""
                                />
                            )}
                        </Box>
                        <Box className="flex" borderRadius="1.4rem" height="4rem" bgcolor="common.white">
                            <Typography textAlign="center" variant="h4">
                                {list.name}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
