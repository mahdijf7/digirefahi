import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ColorLensIcon from '@mui/icons-material/ColorLens';

// Utils
import theme from 'assets/theme';

const colors = [
    '#004D88',
    '#F7C906',
    '#75CE79',
    '#CE6ADE',
    '#F77A06',
    '#EDBDA9',
    '#F44242',
    '#9747FF',
    '#99D6FD',
    '#49A8A2',
    '#C2834E',
    '#318A2F',
];
const CategoryBoxColorPallate = ({ hasPrimaryColor, defaultSelectedColor = null, onSelect }) => {
    const [selectedColor, setSelectedColor] = useState(defaultSelectedColor);
    const [showColorPallate, setShowColorPallate] = useState(false);

    const openColorPallate = () => {
        setSelectedColor(null);
        setShowColorPallate(true);
    };
    const selectThisColor = (color) => {
        setSelectedColor(color);
        onSelect(color);
    };

    return (
        <Box
            sx={{
                border: hasPrimaryColor
                    ? `1px solid ${theme.main.palette.primary.main}`
                    : `1px solid ${theme.main.palette.brandGray.main}`,
                borderRadius: '5px',
                flex: `0 0 60px`,
                display: 'flex',
                position: 'relative',
                '& svg': {
                    fill: hasPrimaryColor ? theme.main.palette.primary.main : theme.main.palette.brandGray.main,
                },
            }}>
            {/* selected color box */}
            {selectedColor && (
                <Box
                    sx={{
                        backgroundColor: selectedColor,
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onClick={openColorPallate}></Box>
            )}

            {/* render colors */}
            {showColorPallate && (
                <ColorPallateBox>
                    {colors.map((color, index) => (
                        <Box
                            key={`color-${index}`}
                            sx={{ backgroundColor: color, height: '20px' }}
                            onClick={() => selectThisColor(color)}></Box>
                    ))}
                </ColorPallateBox>
            )}

            {/* show default box if we havnt selected any color */}
            {!selectedColor && !showColorPallate && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        width: '100%',
                        cursor: 'pointer',
                        height: '80px',
                    }}
                    onClick={openColorPallate}>
                    <ColorLensIcon />
                    <Typography
                        fontSize="10px"
                        fontWeight={600}
                        sx={{ color: hasPrimaryColor ? theme.main.palette.primary.main : theme.main.palette.brandGray.main }}>
                        انتخاب رنگ
                    </Typography>
                </Box>
            )}
        </Box>
    );
};
const ColorPallateBox = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    width: '100%',
    overflow: 'hidden',
    '& .MuiBox-root ': {
        cursor: 'pointer',
    },
    '& .MuiBox-root:nth-of-type(1) ': {
        borderTopRightRadius: '4px',
    },
    '& .MuiBox-root:nth-of-type(3) ': {
        borderTopLeftRadius: '5px',
    },
    '& .MuiBox-root:nth-of-type(10) ': {
        borderBottomRightRadius: '5px',
    },
    '& .MuiBox-root:nth-of-type(12) ': {
        borderBottomLeftRadius: '5px',
    },
});
export default CategoryBoxColorPallate;
