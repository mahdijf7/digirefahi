import {Checkbox, Grid, Typography} from '@mui/material';
// Assets
import React from "react";
import {Paper} from "@mui/material";

const CheckboxListItem = ({children, ...props}) => {
    const { data, selectedItems, handleChange } = props;

    return (
        <Paper elevation={0} style={{
            ...PaperStyle,
            background: selectedItems.includes(data.id) ? '#EDFBFF' : '#F2F2F7',
            color: selectedItems.includes(data.id) ? '#0877BD' : '#000',
        }}>
            <Grid container spacing={0} style={{direction: 'rtl'}}>
                <Grid item xs={12} style={ItemStyle}>
                    <Checkbox
                        key={data.id}
                        checked={selectedItems.some((selectedItem) => selectedItem.id === data.id)}
                        onChange={() => handleChange([data])}
                        sx={CheckboxStyle}
                    />
                    <Typography flex={3} style={TextStyle}>{data.name}</Typography>
                    {children}
                </Grid>
            </Grid>
        </Paper>
    );
};


const PaperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '7px 5px',
    padding: '0',
    borderRadius: '5px',
};

const ItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: "36px",
    padding: '7px'
};

const CheckboxStyle = {
    '& .MuiSvgIcon-root': { fontSize: '2rem' },
    '&.Mui-checked': {
        color: 'primary.main',
    },
};

const TextStyle = {
    textAlign: 'right',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '1'
};
export default CheckboxListItem;
