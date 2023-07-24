import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { t } from 'i18next';
import NewServiceTreeView from 'components/Common/TreeView/Admin/NewService/NewServiceTreeView';
import ServiceEditTreeView from 'components/Common/TreeView/Admin/NewService/ServiceEditTreeView';

function Category({ data, loading, onSelect, selectedCategory, serviceData, expandedItems, setExpandedItems, categoryData }) {
    const location = useLocation();
    const isEditing = location.pathname.includes('/app/admin/service-management/service-list/service-editing');

    const getAllParents = (category) => {
        const parents = [];
        parents.push(category?.id);
        function extractParents(category) {
            if (category && category.parents) {
                parents.push(category.parents?.id);
                extractParents(category.parents);
            }
        }
        extractParents(category);
        return parents.map((num) => String(num));
    };

    const defaultOpenNodeId = getAllParents(serviceData?.category_parents[0]);

    const findById = (id, arr) => {
        for (let i = 0; i < arr?.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
            if (arr[i].children_all && arr[i]?.children_all?.length > 0) {
                const list = findById(id, arr[i]?.children_all);
                if (list) {
                    return list;
                }
            }
        }
        return null;
    };

    const foundedItem = expandedItems.map((id) => findById(parseInt(id), categoryData));

    const isSelectedNodeValid = foundedItem?.[0] || serviceData?.category?.id;

    useEffect(() => {
        console.log(expandedItems);
        if (expandedItems.length > 0 && expandedItems[0] === 'undefined') {
            setExpandedItems([serviceData?.category?.id]);
        }
    }, [expandedItems]);

    return (
        <Box width="90%" height="100%" m="1rem auto" position="relative">
            {loading && (
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        top: '15rem',
                        left: '40%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            )}
            {!loading && (
                <>
                    <Sidebar>
                        {isEditing ? (
                            <>
                                <ServiceEditTreeView
                                    expandedItems={expandedItems}
                                    setExpandedItems={setExpandedItems}
                                    defaultOpenNodeId={defaultOpenNodeId}
                                    defaultSelectedItem={serviceData?.category?.id}
                                    data={data}
                                    onSelect={onSelect}
                                />
                            </>
                        ) : (
                            <NewServiceTreeView
                                expandedItems={expandedItems}
                                setExpandedItems={setExpandedItems}
                                data={data}
                                onSelect={onSelect}
                            />
                        )}
                    </Sidebar>
                    {!isSelectedNodeValid && (
                        <Box className="flex" sx={{ width: '100% ', height: '5rem' }}>
                            <Typography sx={{ color: '#D32F2F' }}>{'دسته بندی خدمات را انتخاب کنید.'}</Typography>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}
export default Category;

const Sidebar = styled('div')(({ theme }) => ({
    width: '100%',
    flexShrink: 0,
}));
