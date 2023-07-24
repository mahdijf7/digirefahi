import { useState } from 'react';
import { Box, Typography, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

// Material Icons
import ControlPointIcon from '@mui/icons-material/ControlPoint';

// Utils
import adminService from 'service/api/adminService';
import theme from 'assets/theme';

// Components
import CategoryTreeRootHeaderContent from './CategoryTreeRootHeaderContent';

// Assets
import { StyledList, StyledAddBox } from './styles';

const CategoryTreeRoot = ({ root, color, parentId, isChildRoot, onActionSelected, onSave, onDelete, onChange }) => {
    const [open, setOpen] = useState(false);
    const [parent, setParent] = useState(root);
    const [children, setChildren] = useState(root.children_all);
    const { id, name, isNew } = parent;
    const hasChildren = children && children.length > 0;

    const handleClick = () => {
        // prevent collapse when we are adding a new category
        if (isNew) return;

        setOpen(!open);
    };
    const onAddNewChild = () => {
        setChildren(
            children ? [...children, { isNew: true, id: Math.random() * 10000 }] : [{ isNew: true, id: Math.random() * 10000 }]
        );
    };

    const childSaved = (child) => { 
        const newChildren = children.map((item) => {
            if (item.id === child.oldId) {
                item.isNew = undefined;
                item.name = child.name;
                item.id = child.id;
            } else if (item.id === child.id) {
                item.name = child.name;
            }
            return item;
        }); 
        setChildren(newChildren); 
        onChange();
    };
    const childDeleted = (child) => {
        const newChildren = children.filter((item) => item.id !== child.id);
        setChildren(newChildren);
        onChange();
    };

    const collapseStyles = {
        '&:before': {
            height: hasChildren ? 'calc(100% - 35px)' : 'calc(100% - 47px)  ',
        },
    };

    return (
        <>
            <ListItemButton sx={{ p: 0 }}>
                <ListItemText
                    sx={{ m: 0 }}
                    primary={
                        <CategoryTreeRootHeaderContent
                            open={open}
                            childrenArray={children}
                            root={root}
                            color={color}
                            parentId={parentId}
                            isNew={isNew}
                            onSave={(data) => {
                                if (!parentId) childSaved(data);
                                else onSave(data);
                            }}
                            onDelete={onDelete}
                            onActionSelected={onActionSelected}
                            onClick={handleClick}
                        />
                    }
                />
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit sx={collapseStyles}>
                {/* add item */}
                <Box sx={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                    <StyledAddBox sx={{ color: color, cursor: 'pointer ' }} onClick={onAddNewChild}>
                        <ControlPointIcon fontSize="large" />
                        <Typography fontSize="12px">
                            افزودن زیرمجموعه به{' '}
                            <Typography fontWeight={600} fontSize="13px" component="span">
                                "{name}"
                            </Typography>
                        </Typography>
                    </StyledAddBox>
                </Box>

                {/* render children */}
                <StyledList component="div" disablePadding>
                    {children &&
                        children.map((rootChild) => (
                            <CategoryTreeRoot
                                key={rootChild.id}
                                root={rootChild}
                                color={color}
                                parentId={id}
                                isChildRoot
                                onActionSelected={onActionSelected}
                                onSave={childSaved}
                                onDelete={childDeleted}
                                onChange={onChange}
                            />
                        ))}
                </StyledList>
            </Collapse>
        </>
    );
};

export default React.memo(CategoryTreeRoot);
