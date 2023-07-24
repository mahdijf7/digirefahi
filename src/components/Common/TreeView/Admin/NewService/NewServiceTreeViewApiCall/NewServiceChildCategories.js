import React from 'react';
import { useState, useEffect } from 'react';
import { ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import GetChildList from '../NewServiceGetChildList';

import { ColorPrimaryLight, ColorGrey } from 'assets/theme/color';

import adminService from 'service/api/adminService';

function NewServiceChildCategories({ item, style }) {
    const [loading, setLoading] = useState(false);
    const [childData, setChildData] = useState({});
    const [open, setOpen] = useState(false);

    const getData = async (enteredData) => {
        setLoading(true);
        await adminService
            .newServiceCategory(enteredData)
            .then((res) => {
                const children = res.data.data.categories;
                setChildData((prev) => {
                    return { ...prev, children: children };
                });
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            }); 
    };

    const handleClick = (id) => () => {
        getData(id);
        setOpen(!open);
    };
    useEffect(() => {
        setChildData(item);
    }, []);

    return childData.child_count === 0 ? (
        <>
            <ListItem
                button
                sx={{
                    cursor: 'pointer',
                    height: '3.6rem',
                    my: '1rem',
                    borderRadius: '.6rem',
                    bgcolor: open ? ColorPrimaryLight : ColorGrey,
                    ...style,
                }}
                key={childData.id}>
                <ListItemIcon>{open ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}</ListItemIcon>
                <ListItemText primary={childData.name} />
            </ListItem>
            <Divider />
        </>
    ) : (
        <GetChildList open={open} childData={childData} handleClick={handleClick} />
    );
}

export default NewServiceChildCategories;
