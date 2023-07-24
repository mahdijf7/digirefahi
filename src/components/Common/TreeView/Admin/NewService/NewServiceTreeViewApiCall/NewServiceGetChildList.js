import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChildCategory from './NewServiceChildCategories';
import { ColorWhite, ColorPrimary, ColorPrimaryLight, ColorGrey } from 'assets/theme/color';

function NewServiceGetChildList({ handleClick, childData, open }) {
    const style = {
        width: '80% !important',
        cursor: 'pointer',
        height: '3.6rem',
        color: ColorPrimary,
        m: '1rem auto',
        borderRadius: '.6rem',
        bgcolor: open ? ColorPrimaryLight : ColorWhite,

        '& svg': {
            color: ColorPrimary,
        },
    };
    return (
        <>
            <ListItem
                sx={{
                    cursor: 'pointer',
                    height: '3.6rem',
                    my: '1rem',
                    borderRadius: '.6rem',
                    bgcolor: open ? ColorPrimaryLight : ColorGrey,
                }}
                onClick={handleClick(childData.id)}
                button
                key={childData.id}>
                <ListItemIcon>{open ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}</ListItemIcon>
                <ListItemText primary={childData.name} />
            </ListItem>
            <Divider />

            {Array.isArray(childData?.children) &&
                childData?.children?.map((item, i) => (
                    <Collapse key={i} in={!open} timeout="auto" unmountOnExit>
                        <ChildCategory item={item} style={style} />
                    </Collapse>
                ))}
        </>
    );
}

export default NewServiceGetChildList;
