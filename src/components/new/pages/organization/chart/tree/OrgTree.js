import {List, Box} from '@mui/material';

// Components
import OrgTreeRoot from './OrgTreeRoot';

// Assets
import theme from 'assets/theme';

const CategoryTree = ({ root, onActionSelected, onChange }) => {
    return (
        <Box sx={{p: '20px 100px', display: 'grid'}}>
            <List sx={rootStyles}>
                <OrgTreeRoot isMainRoot root={root} color={root.color} onActionSelected={onActionSelected} onChange={onChange} />
            </List>            
        </Box>

    );
};
const rootStyles = {
    '& .MuiButtonBase-root:not(:first-of-type)': {
        marginTop: '16px',
    },
    '& .MuiButtonBase-root': {
        '& .MuiTouchRipple-root': {
            display: 'none',
        },

        '&:hover': {
            backgroundColor: `transparent !important`,
        },
    },

    '&>.MuiCollapse-root': {
        m: '0 24px 0 50px',

        // hide collapse root borderRightLine after the last list-item
        '& .MuiList-root:last-of-type': {
            backgroundColor: '#fff',
        },
    },
    '& .MuiCollapse-root .MuiCollapse-root': {
        m: '0 56px 0 50px',
    },
    '& .MuiCollapse-root ': {
        position: 'relative',
        '&:before': {
            content: `''`,
            position: 'absolute',
            top: 0,
            right: 0,
            borderRight: `1px solid ${theme.main.palette.info.border}`,
            zIndex: 1,
        },
        '& .MuiCollapse-root:last-of-type ': {
            zIndex: 3,
            m: '0',
            p: '0 56px 0 50px',
            backgroundColor: '#fff',

            '&:before': {
                right: '56px',
                zIndex: 3,
            },
            '&:after': {
                content: `''`,
                position: 'absolute',
                top: 0,
                right: '-5px',
                width: '10px',
                height: '30px',
                marginTop: '-30px',
                backgroundColor: '#fff',
            },
        },
    },
};
export default CategoryTree;
