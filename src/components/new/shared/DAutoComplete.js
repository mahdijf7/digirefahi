import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';

// Utils
import adminService from 'service/api/adminService';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
const cache = {};
const DAutoComplete = ({ label, placeholder, defaultOptions, optionLabelKey = 'name', isAsync = false, onChange }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(defaultOptions || []);
    const [inputValue, setInputValue] = useState('');
    const loading = open && options.length === 0;
   
    const asyncronousProps = isAsync && {
        autoComplete: true,
        open: open,
        loading: loading,

        filterOptions: (x) => x,
        onInputChange: (event, newInputValue) => {
            inputValue !== newInputValue && setInputValue(newInputValue);
        },
        onOpen: () => {
            setOpen(true);
        },
        onClose: () => {
            setOpen(false);
        },
    };

    useEffect(() => {
        const controller = new AbortController();

        if (!open) {
            return undefined;
        }
     

        if (inputValue === '' ? cache['cacheEmptyString'] : cache[inputValue]) {
            setOptions(cache[inputValue === '' ? 'cacheEmptyString' : inputValue]);
            return undefined;
        } else {
            (async () => {
                await adminService
                    .getCompanies(`page=1&name=${inputValue}`, { signal: controller.signal })
                    .then((res) => {
                        cache[inputValue === '' ? 'cacheEmptyString' : inputValue] = res.data.data;
                        setOptions([...res.data.data]);
                    })
                    .catch((err) => {
                        console.log('error occured!');
                    });
            })();
        }

        return () => controller.abort();
    }, [inputValue, open]);

    useEffect(() => {
        if (!open && isAsync) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Box sx={wrapperStyles}>
            {/* Label */}
            {label && (
                <Typography fontWeight={600} mb="6px">
                    {label}
                </Typography>
            )}

            {/* AutoComplete */}
            <StyledAutoComplete
                className="test isRtl"
                id="combo-box-demo"
                options={options}
                getOptionLabel={(option) => option[optionLabelKey]}
                onChange={(event, newValue) => onChange(newValue)}
                renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        sx={{
                            direction: 'rtl',
                            bgcolor: 'white',
                        }}>
                        {option[optionLabelKey]}
                    </Box>
                )}
                {...asyncronousProps}
            />
        </Box>
    );
};
const wrapperStyles = {
    display: 'flex',
    flexDirection: 'column',
    direction: 'rtl',
};
const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
    '&.MuiAutocomplete-root': {
        width: '100%',
        // borderColor: theme.palette.primary.main,
        // borderRadius: '.5rem',
        '&.isRtl': {
            '& .MuiInputBase-root': {
                padding: '0 9px 0px 39px !important',
                height: '42px',
                background: '#F2F2F7',
            },
            '& .MuiAutocomplete-endAdornment': {
                right: 'auto !important',
                left: '9px !important',
                '& svg': {
                    fontSize: '22px',
                },
            },
        },
        '&.test': {
            '& .MuiInputBase-root': {
                height: '42px',
                background: '#F2F2F7',
                border: '1px solid #D1D1D6',
            },
            '& .MuiAutocomplete-endAdornment': {
                '& svg': {
                    fontSize: '22px',
                },
            },
            '& .MuiInputBase-input': {
                fontSize: '14px',
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
            },
        },
    },
    // '& .MuiOutlinedInput-root': {
    //     paddingTop: '0 !important',
    // },
    // '&.MuiAutocomplete-root .MuiAutocomplete-inputRoot': {
    //     padding: '0 .8rem !important',
    // },
    // '& .MuiAutocomplete-inputRoot': {
    //     paddingLeft: theme.spacing(2),
    //     paddingRight: theme.spacing(2),
    //     '& .MuiAutocomplete-endAdornment': {
    //         right: 'auto',
    //         left: theme.spacing(3),
    //         top: '30%',
    //         transform: 'scale(2)',
    //     },
    // },
    // '& input::placeholder': {
    //     [theme.breakpoints.down('md')]: {},
    //     fontSize: '1.2rem',
    //     paddingBottom: '.5rem',
    // },
    // '& .MuiAutocomplete-endAdornment': {},

    // ...sx,
}));
export default DAutoComplete;

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];
