import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener, Autocomplete, FormControl, Box, Button, Typography } from '@mui/material';
import { Field, ErrorMessage, useField } from 'formik';

// Utils
import sharedService from 'service/api/shared.service';

// Components
import DAutoCompleteOption from './DAutoCompleteOption';
import DAutoCompleteButton from './DAutoCompleteButton';
import CustomLable from 'components/Common/Form/CustomLable';

// Assets
import { StyledPopper, StyledInput, StyledAutocompletePopper } from './styles';

function PopperComponent(props) {
    const { disablePortal, anchorEl, open, ...other } = props;
    return <StyledAutocompletePopper {...other} />;
}

PopperComponent.propTypes = {
    anchorEl: PropTypes.any,
    disablePortal: PropTypes.bool,
    open: PropTypes.bool.isRequired,
};
 
const DAutoComplete = forwardRef(
    (
        {
            name,
            buttonProps = {},
            optionLabelKey = 'name',
            optionValueKey = 'id',
            placeholder,
            defaultOptions = [],
            defaultValue = false,
            showError,
            multiple = false,
            isDisabled = false,
            isAsync = false,
            singleCall,
            callOnOpen = false,
            searchOnType = false,
            apiPath = '',
            apiResponseExtraKey = '',
            apiSearchKey = 'name',
            apiStaticParams = {},
            onSelect,
            formControlStyle,
            weight = false,
            label,
        },
        ref
    ) => {
        const [options, setOptions] = useState(defaultOptions);
        const [anchorEl, setAnchorEl] = useState(null);
        // const [value, setValue] = useState(defaultValue ? defaultValue : multiple ? [] : null);
        const [inputValue, setInputValue] = useState('');
        const [firstApiCallHappened, setFirstApiCallHappened] = useState(false);
        const [loading, setLoading] = useState(isAsync);
        const [reFetchKey, setReFetchKey] = useState(1);
        const [field, meta, helpers] = useField({ name });

        const attrs = {};
        if (multiple) {
            attrs.multiple = true;
        }
        if (searchOnType) {
            attrs.filterOptions = (x) => x;
            attrs.onInputChange = (event, newInputValue) => {
                setOptions([]);
                setLoading(true);
                setInputValue(newInputValue);
            };
        }

        useImperativeHandle(
            ref,
            () => ({
                reset: () => {
                    setFirstApiCallHappened(false);
                    setOptions([]);
                    reset();
                },
                setValue: (newValue) => {
                    helpers.setValue(newValue);
                    console.log('newValue', newValue);
                    onSelect && onSelect(newValue);
                },
            }),
            []
        );

        const isSelected = multiple ? (field.value ? field.value.length > 0 : false) : !!field.value;

        const handleClick = (event) => {
            // prevent autoComplete from opening if we have disabled the component by isDisabled prop
            if (isDisabled) return;

            setAnchorEl(event.currentTarget);
        };
        const closeOnSingleSelect = (newValue) => {
            helpers.setValue(newValue);
            onSelect && onSelect(newValue);
            close();
        };
        const close = () => {
            if (anchorEl) {
                anchorEl.focus();
            }
            setAnchorEl(null);

            if (isAsync && callOnOpen && !singleCall) {
                setOptions([]);
                setLoading(true);
            }
        };

        const handleClose = (newValue) => {
            // setValue(newValue);
            if (anchorEl) {
                anchorEl.focus();
            }
            setAnchorEl(null);
        };
        const reset = () => {
            helpers.setValue(multiple ? [] : null);
            onSelect && onSelect(multiple ? [] : null);

            close();
            console.log('reset');
        };
        const reFetch = () => {
            setReFetchKey(reFetchKey + 1);
        };

        const open = Boolean(anchorEl);
        const id = open ? 'github-label' : undefined;

        useEffect(() => {
            const controller = new AbortController();

            if (isAsync) {
                if (singleCall && firstApiCallHappened) return;

                if (callOnOpen && !open) return;

                // prevent api call if we have disabled the component by isDisabled prop
                if (isDisabled) return;

                (async () => {
                    const params = new URLSearchParams();
                    if (searchOnType && inputValue) params.append(apiSearchKey, inputValue);
                    Object.keys(apiStaticParams).forEach((staticParams) => {
                        if (Array.isArray(staticParams)) {
                            apiStaticParams[staticParams].forEach((staticParamsItem, index) =>
                                params.append(staticParams[index], staticParamsItem)
                            );
                        } else {
                            params.append(staticParams, apiStaticParams[staticParams]);
                        }
                    });

                    await sharedService
                        .autoComple(`${apiPath}?${params.toString()}`, { signal: controller.signal })
                        .then((res) => {
                            // cache[inputValue === '' ? 'cacheEmptyString' : inputValue] = res.data.data;
                            setOptions(!!apiResponseExtraKey ? [...res.data.data[apiResponseExtraKey]] : [...res.data.data]);

                            setFirstApiCallHappened(true);
                            setLoading(false);
                        })
                        .catch((err) => {
                            console.log('error occured!');
                        });
                })();
            }

            return () => controller.abort();
        }, [open, apiPath, inputValue, reFetchKey]);

        return (
            <Box className="column"> 
                <Field name={name}>
                    {({
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                    }) => (
                        <Box sx={{ width: '100%', position: 'relative' }}>
                            {label && <Typography sx={{ fontSize: '13px', fontWeight: 600, mb: '5px' }}>{label}</Typography>}
                            <FormControl fullWidth sx={{ position: 'relative', height: '36px', ...formControlStyle }}>
                                <DAutoCompleteButton
                                    formControlStyle={formControlStyle}
                                    label={!multiple && field.value ? field.value[optionLabelKey] : buttonProps.label}
                                    isSelected={isSelected}
                                    isDisabled={isDisabled}
                                    isOpen={anchorEl}
                                    hasError={meta.touched && meta.error && showError}
                                    multiple={multiple}
                                    value={field.value}
                                    onOpen={handleClick}
                                />

                                <StyledPopper id={id} open={open} anchorEl={anchorEl}>
                                    <ClickAwayListener onClickAway={close}>
                                        <div>
                                            <Autocomplete
                                                {...field}
                                                open
                                                autoComplete
                                                loading={loading}
                                                onClose={(event, reason) => {
                                                    if (reason === 'escape') {
                                                        close();
                                                    }
                                                }}
                                                value={field.value}
                                                onChange={(event, newValue, reason) => {
                                                    console.log(reason, 123);

                                                    if (
                                                        event.type === 'keydown' &&
                                                        event.key === 'Backspace' &&
                                                        reason === 'removeOption'
                                                    ) {
                                                        return;
                                                    }

                                                    if (multiple) {
                                                        onSelect && onSelect(newValue);
                                                        setFieldValue(name, newValue);
                                                    } else {
                                                        if (reason === 'clear') return;
                                                 
                                                        setFieldValue(name, newValue);
                                                 
                                                        closeOnSingleSelect(newValue);
                                                    }
                                                }}
                                                disableCloseOnSelect
                                                PopperComponent={PopperComponent}
                                                // PaperComponent={(props) => {
                                                //     const { disablePortal, anchorEl, open, ...other } = props;
                                                //     return (
                                                //         <StyledAutocompletePopper {...other}>
                                                //             {props.children}
                                                //             <Box sx={{ borderTop: '1px solid #D9D9D9', padding: '10px' }}>
                                                //                 <Button color="primary" variant="outlined" sx={{ fontSize: '12px' }} onClick={reset}>
                                                //                     حذف فیلتر
                                                //                 </Button>
                                                //             </Box>
                                                //         </StyledAutocompletePopper>
                                                //     );
                                                // }}
                                                renderTags={() => null}
                                                noOptionsText="نتیجه‌ای یافت نشد."
                                                renderOption={(props, option, { selected }) => (
                                                    <DAutoCompleteOption
                                                        option={option}
                                                        optionLabelKey={optionLabelKey}
                                                        selected={selected}
                                                        multiple={multiple}
                                                        {...props}
                                                        key={option[optionValueKey]}
                                                    />
                                                )}
                                                options={options}
                                                getOptionLabel={(option) => option && option[optionLabelKey]}
                                                isOptionEqualToValue={(option, value) =>
                                                    option[optionValueKey] === value[optionValueKey]
                                                }
                                                renderInput={(params) => (
                                                    <StyledInput
                                                        ref={params.InputProps.ref}
                                                        inputProps={params.inputProps}
                                                        autoFocus
                                                        placeholder={placeholder}
                                                        error={meta.touched && Boolean(meta.error) && showError}
                                                    />
                                                )}
                                                sx={{
                                                    width: anchorEl ? `${anchorEl.clientWidth}px !important` : '200px !important',
                                                }}
                                                {...attrs}
                                            />
                                            <Box sx={{ borderTop: '1px solid #D9D9D9', padding: '10px', display: 'flex' }}>
                                                <Button
                                                    color="primary"
                                                    variant="outlined"
                                                    disabled={loading}
                                                    sx={{ fontSize: '12px' }}
                                                    onClick={() => {
                                                        setFieldValue(name, null);
                                                        setInputValue('');
                                                        reset();
                                                    }}>
                                                    حذف فیلتر
                                                </Button>
                                            </Box>
                                        </div>
                                    </ClickAwayListener>
                                </StyledPopper>
                            </FormControl> 
                            {meta.touched && meta.error && showError && (
                                <Typography
                                    component="span"
                                    sx={{
                                        position: 'absolute',
                                        bottom: '-22px',
                                        left: 0,
                                        color: '#d32f2f',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}>
                                    {meta.error}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Field>
            </Box>
        );
    }
);
DAutoComplete.defaultProps = {
    showError: true
}
export default DAutoComplete;
