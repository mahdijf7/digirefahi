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
import TreeRootHeaderContent from './TreeRootHeaderContent';
import DSnackbar from 'components/new/shared/DSnackbar';

const TreeRoot = ({
    isMainRoot = false,
    root,
    color,
    parentId,
    isChildRoot,
    onActionSelected,
    onCreate,
    onDelete,
    onUpdate,
    onChange,
}) => {
    const [open, setOpen] = useState(false);
    const [parent, setParent] = useState(root);
    const [children, setChildren] = useState(root.children_all);
    const [snackBarData, setSnackBarData] = useState({
        show: false,
        data: {},
    });
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
                item = child;
            } else if (item.id === child.id) {
                item.name = child.name;
            }
            return item;
        });
        
        setChildren(newChildren);
     
        setSnackBarData({
            show: true,
            data: {
                text: 'واحد سازمانی با موفقیت ایجاد شد.',
                type: 'success',
            },
        });
    };
    const childDeleted = (child, showSnackbar) => {
        const newChildren = children.filter((item) => item.id !== child.id);
        setChildren(newChildren);

        showSnackbar &&
            setSnackBarData({
                show: true,
                data: {
                    text: 'واحد سازمانی با موفقیت حذف شد.',
                    type: 'success',
                },
            });
    };

    const childUpdated = (child) => {
     
        const newChildren = children.map((item) => {
            if (item.id === child.id) {
                item = child;
            } 
            return item;
        });
         
        setChildren(newChildren);
       
        setSnackBarData({
            show: true,
            data: {
                text: 'واحد سازمانی با موفقیت ویرایش شد.',
                type: 'success',
            },
        });
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
                        <TreeRootHeaderContent
                            isMainRoot={isMainRoot}
                            open={open}
                            childrenLength={children && children.length || 0}
                            root={root}
                            color={color}
                            parentId={parentId}
                            isNew={isNew}
                            onCreate={onCreate}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            onActionSelected={onActionSelected}
                            onClick={handleClick}
                        />
                    }
                />
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit sx={collapseStyles}>
                {/* add item */}
                <Box sx={{ height: '80px', display: 'flex', alignItems: 'center' }}>
                    <CssAddBox sx={{ color: color, cursor: 'pointer ' }} onClick={onAddNewChild}>
                        <ControlPointIcon fontSize="large" sx={{ color: theme.main.palette.primary.main }} />
                        <Typography fontSize="12px" sx={{ color: theme.main.palette.text.main }}>
                            افزودن زیرمجموعه به{' '}
                            <Typography fontWeight={600} fontSize="13px" component="span">
                                "{name}"
                            </Typography>
                        </Typography>
                    </CssAddBox>
                </Box>

                {/* render children */}
                <List component="div" disablePadding sx={childRootStyles}>
                    {children &&
                        children.map((rootChild) => (
                            <TreeRoot
                                key={rootChild.id}
                                root={rootChild}
                                color={color}
                                parentId={root.id}
                                isChildRoot
                                onActionSelected={onActionSelected}
                                onCreate={childSaved}
                                onDelete={childDeleted}
                                onUpdate={childUpdated}
                                onChange={onChange}
                            />
                        ))}
                </List>
            </Collapse>

            <DSnackbar
                open={snackBarData.show}
                info={snackBarData.data}
                onClose={() => setSnackBarData({ ...snackBarData, show: false })}
            />
        </>
    );
};

const rightSideBorderForItems = {
    position: 'relative',
    '&:before': {
        content: `''`,
        position: 'absolute',
        bottom: '50%',
        right: 0,
        borderRight: `1px solid ${theme.main.palette.info.border}`,
        borderBottom: `1px solid ${theme.main.palette.info.border}`,
        height: '25px',
        width: '26px',
        borderRadius: '0px 0px 10px 0',
        zIndex: 4,
    },
};
const childRootStyles = {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiButtonBase-root.MuiListItemButton-root': {
        paddingRight: '26px',
        ...rightSideBorderForItems,
    },
};

const CssAddBox = styled(Box)(({}) => ({
    paddingRight: '34px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    ...rightSideBorderForItems,
}));
export default React.memo(TreeRoot);
