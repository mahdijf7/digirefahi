import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Divider, Paper, Typography, Button, TextField, Checkbox, ClickAwayListener, Autocomplete } from '@mui/material';
import { styled } from '@mui/material/styles';

// Material Icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import { createFilterOptions } from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';

// Assets
import theme from 'assets/theme';

const icon = <CheckBoxOutlineBlankIcon fontSize="large" />;
const checkedIcon = <CheckBoxIcon fontSize="large" />;

const filterOptions = createFilterOptions({
    trim: true,
    stringify: (option) => option.title,
});
const cache = {};
let draftValues = [];
const DSelectionDropdown = ({
    isAsync = false,
    searchOnType = false,
    api,
    apiDefaultQuery = '',
    apiSearchKey = 'name',
    label,
    inputPlaceholder,
    showSelectedOptions = true,
    multiple = true,
    styles = {},
    defaultOptions,
    defaultValue,
    optionLabelKey = 'name',
    equalityKey = 'id',
    onSelect,
}) => {
    const [options, setOptions] = useState(defaultOptions || []);
    const [value, setValue] = useState(defaultValue ? defaultValue : multiple ? [] : '');
    const [inputValue, setInputValue] = useState('');
    const [selectedValues, setSelectedValues] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    console.log(options.length, options, 'options');
    const removeValue = (id) => {
        setSelectedValues(selectedValues.filter((item) => item.id !== id));
    };

    // Async options for autocomplete component
    const searchOnTypeProps = searchOnType && {
        filterOptions: (x) => x,
    };

    // api call for async dropdown with search on change
    useEffect(() => {
        const controller = new AbortController();
        if (isAsync && searchOnType && multiple) {
            if (inputValue === '' ? cache['cacheEmptyString'] : cache[inputValue]) {
                console.log(23345);
                setOptions(cache[inputValue === '' ? 'cacheEmptyString' : inputValue]);
                return undefined;
            } else {
                (async () => {
                    await api(`${apiDefaultQuery}&page=1&${apiSearchKey}=${inputValue}`, { signal: controller.signal })
                        .then((res) => {
                            cache[inputValue === '' ? 'cacheEmptyString' : inputValue] = res.data.data;
                            setOptions([...res.data.data]);
                            console.log(res.data, 'dlkfjlksadfhdsjkfhsk');
                        })
                        .catch((err) => {
                            console.log('error occured!');
                        });
                })();
            }
        }

        return () => controller.abort();
    }, [inputValue, value]);

    // api call for async dropdown without search on change
    // api call for single choice
    useEffect(() => {
        const controller = new AbortController();

        async function getData() {
            setLoading(true);
            await api(`${apiDefaultQuery}`, { signal: controller.signal })
                .then((res) => {
                    setOptions([...res.data.data]);
                })
                .catch((err) => {
                    console.log('error occured!');
                });

            setLoading(false);
        }
        if (isAsync && !searchOnType && multiple) {
            getData();
        } else if (isAsync && searchOnType && !multiple) {
            if (open) {
                (async () => {
                    setLoading(true);
                    await api(`${apiDefaultQuery}&page=1&${apiSearchKey}=${inputValue}`, { signal: controller.signal })
                        .then((res) => {
                            setOptions([...res.data.data]);
                        })
                        .catch((err) => {
                            console.log('error occured!');
                        });

                    setLoading(false);
                })();
            } else {
                setOptions([]);
            }
        } else if (isAsync && !multiple) {
            if (open) {
                getData();
            } else {
                setOptions([]);
            }
        }
        return () => controller.abort();
    }, [inputValue, open]);

    const wrapperStyles = styles.wrapper || { display: 'flex', flexDirection: 'column' };
    const inputWrapperStyles = styles.inputWrapper || { display: 'flex', flexDirection: 'column' };
    const selectedElementsStyles = styles.selectedElements || { display: 'flex', gap: '10px', flexWrap: 'wrap' };

    return (
        <Box sx={wrapperStyles}>
            <Box sx={inputWrapperStyles}>
                {label && (
                    <Typography fontWeight={600} mb="6px">
                        {label}
                    </Typography>
                )}

                <AutocompleteCustom
                    id="test"
                    multiple={multiple}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                    options={options}
                    autoComplete
                    disableCloseOnSelect={multiple}
                    value={value}
                    loading={loading}
                    renderTags={() => null}
                    noOptionsText="No locations"
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        onSelect(newValue);
                    }}
                    onInputChange={(event, newInputValue) => {
                        searchOnType && setInputValue(newInputValue);
                    }}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    renderInput={(params) => <TextField {...params} placeholder={inputPlaceholder} sx={{ fontSize: '12px' }} />}
                    isOptionEqualToValue={(option, value) => option[equalityKey] === value[equalityKey]}
                    renderOption={(props, option, { selected }) => (
                        <>
                            <Box
                                key={option.id}
                                sx={{
                                    padding: '0px 10px',
                                    bgcolor: 'white',
                                }}>
                                <Box
                                    component="li"
                                    {...props}
                                    sx={{
                                        fontSize: '13px',
                                        direction: 'rtl',
                                        bgcolor: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '9px',
                                        padding: '8px 12px !important',
                                        '&[aria-selected="true"]': {
                                            backgroundColor: 'transparent !important',
                                        },
                                    }}>
                                    {multiple && (
                                        <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} sx={{ padding: 0 }} />
                                    )}
                                    {option[optionLabelKey]}
                                </Box>
                                <Divider />
                            </Box>
                        </>
                    )}
                    style={{ width: '100%' }}
                    {...searchOnTypeProps}
                />
            </Box>

            {showSelectedOptions && (
                <Box mt="12px" sx={selectedElementsStyles}>
                    {Array.isArray(value) &&
                        value.map((item, index) => (
                            <Box
                                key={`group-${item[optionLabelKey]}`}
                                sx={{
                                    height: '34px',
                                    borderRadius: '6px',
                                    backgroundColor: theme.main.palette.primary.light,
                                    border: `1px solid ${theme.main.palette.primary.main}`,
                                    padding: '0 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '22px',
                                    minWidth: '105px',
                                }}>
                                <Typography sx={{ color: theme.main.palette.primary.main }} key={`sadsad-${item.title}`}>
                                    {item[optionLabelKey]}
                                </Typography>

                                <CloseIcon
                                    sx={{ color: theme.main.palette.primary.main, mr: 'auto' }}
                                    onClick={() => removeValue(item.id)}
                                />
                            </Box>
                        ))}
                </Box>
            )}
        </Box>
    );
};

export default DSelectionDropdown;

const AutocompleteCustom = styled(Autocomplete)(({ theme }) => ({
    '& .MuiAutocomplete-inputRoot': {
        padding: '0px 15px 0px 65px !important',
        height: '42px',

        boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.05)',
        '& .MuiAutocomplete-endAdornment': {
            right: 'auto',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%) !important',
            '& .MuiSvgIcon-root': {
                width: '1.4em',
                height: '1.4em',
            },
        },
        '& .MuiAutocomplete-popupIndicator': {
            transform: 'rotate(0) !important',
        },

        '& input::placeholder': {
            fontSize: '14px',
        },
    },

    '& .MuiFormControl-root': {
        backgroundColor: '#fff',
    },
    '& .MuiInputBase-root input': {
        padding: '0 10px !important',
        height: '24px',
    },
    '.MuiAutocomplete-paper': {
        boxShadow: 'none !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        margin: '6px 15px',
    },
    '& .MuiAutocomplete-popper': {
        boxShadow: 'none !important',
    },
}));
