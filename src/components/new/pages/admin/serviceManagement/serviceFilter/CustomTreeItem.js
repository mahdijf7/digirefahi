import {Checkbox, Grid, Typography} from '@mui/material';
// Assets
import React from "react";
import {Paper} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {TreeItem} from "@mui/lab";

const CustomTreeItem = ({ label, onClick, ...props }) => {
    const { expandedCategories, setExpandedCategories, nodeId } = props;
    const handleExpand = (categoryId) => {
        setExpandedCategories((prevExpandedCategories) => {
            if (prevExpandedCategories.includes(categoryId)) {
                return prevExpandedCategories.filter((id) => id !== categoryId);
            } else {
                return [...prevExpandedCategories, categoryId];
            }
        });
    };

    const handleClick = (event) => {
        if (onClick) {
            handleExpand(Number(nodeId));
            onClick(event);
        }
    };

    return (
        <TreeItem {...props} label={label} onClick={handleClick}/>
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
export default CustomTreeItem;
