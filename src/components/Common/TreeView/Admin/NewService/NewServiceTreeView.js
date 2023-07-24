import React, { useState } from 'react';
import TreeItem from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ColorPrimary, ColorPrimaryLight, ColorGrey, ColorBlack } from 'assets/theme/color';

function NewServiceTreeView({ data, onSelect, expandedItems, setExpandedItems }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelect = (event, nodeIds) => {
        const selectedId = nodeIds[0];
        const selected = findItemById(selectedId, data);
        if (selected && selected.children_all.length === 0) {
            setSelectedItem(selected);
            onSelect(expandedItems);
            const parentIds = [];
            let currentParent = findParentItem(selected.parent_id, data);
            while (currentParent) {
                parentIds.unshift(currentParent.id.toString());
                currentParent = findParentItem(currentParent.parent_id, data);
            }
            setExpandedItems([...parentIds, selectedId]);
        } else if (selected) {
            const parent = findParentItem(selected.parent_id, data);
            const parentIds = parent ? [parent.id.toString()] : [];
            setExpandedItems([...parentIds, selectedId]);
            onSelect(expandedItems);
        }
    };

    const findParentItem = (parentId, items) => {
        for (const item of items) {
            if (item.id === parentId) {
                return item;
            }
            if (item.children_all.length > 0) {
                const parent = findParentItem(parentId, item.children_all);
                if (parent) {
                    return parent;
                }
            }
        }
        return null;
    };

    const findItemById = (id, items) => {
        for (const item of items) {
            if (item.id.toString() === id) {
                return item;
            }
            if (item.children_all.length > 0) {
                const child = findItemById(id, item.children_all);
                if (child) {
                    return child;
                }
            }
        }
        return null;
    };

    const renderTree = (nodes, handleSelect, selectedId) => (
        <TreeItem
            sx={StyledTreeItem}
            key={nodes.id}
            nodeId={nodes.id.toString()}
            label={nodes.name}
            selected={nodes.id === selectedId}
            onClick={() => handleSelect(null, [nodes.id.toString()])}>
            {Array.isArray(nodes.children_all)
                ? nodes.children_all.map((node) => renderTree(node, handleSelect, selectedId))
                : null}
        </TreeItem>
    );

    return (
        <>
            <TreeView
                sx={StyledTreeView}
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronLeftIcon />}
                expanded={expandedItems}
                multiSelect={false}
                onNodeSelect={handleSelect}>
                {data.map((node) => renderTree(node, handleSelect, selectedItem))}
            </TreeView>
        </>
    );
}

const StyledTreeView = {
    marginTop: '3rem',
    flexGrow: 1,
    '& .MuiTreeItem-root .MuiTreeItem-content': {
        backgroundColor: 'transparent',
        color: ColorBlack,
        fontWeight: 'bold',
    },
    '& > .MuiTreeItem-root': {
        borderBottom: `.2rem solid ${ColorGrey}`,
        marginBottom: '.6rem',
        paddingBottom: '.2rem',
        '& > .MuiTreeItem-content': {
            backgroundColor: `${ColorGrey} !important`,
            color: `${ColorBlack} !important`,
            fontWeight: 'bold',
        },
    },
};

const StyledTreeItem = {
    '&  .MuiTreeItem-content': {
        height: '3.6rem',
        backgroundColor: ColorGrey,
        borderRadius: '.6rem',
        marginBottom: '.4rem',
        paddingRight: '2rem',
        '& svg': {
            marginLeft: '2rem',
        },
        '&:hover': {
            backgroundColor: ColorPrimaryLight,
        },
    },
    '& .MuiTreeItem-content.Mui-selected': {
        backgroundColor: ` ${ColorPrimaryLight} !important `,
        color: `${ColorPrimary} !important`,
        fontWeight: 'bold',
    },
    '& .MuiTreeItem-content.Mui-expanded': {
        backgroundColor: ` ${ColorPrimaryLight} !important `,
        color: `${ColorPrimary} !important`,
    },
    '& .MuiTreeItem-group': {
        marginRight: '2rem !important ',
        marginLeft: '0 !important',
    },
};

export default NewServiceTreeView;
