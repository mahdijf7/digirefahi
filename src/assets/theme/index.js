import { theme } from './default';
import { createTheme } from '@mui/material';

const overrides = {
    typography: {
        h1: {
            fontWeight: 400,
            fontSize: '2.2rem',
            lineHeight: '3.4rem',
        },
        h2: {
            fontWeight: 400,
            fontSize: '2rem',
            lineHeight: '3.1rem',
        },
        h3: {
            fontWeight: 400,
            fontSize: '1.8rem',
            lineHeight: '2.8rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.4rem',
            lineHeight: 1.435,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.2rem',
            lineHeight: 1.6,
        },
        h6: {
            fontWeight: 600,
            fontSize: '0.9rem',
            lineHeight: 1.6,
        },
        big: {
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: '4.6rem',
        },

        body1: {
            fontWeight: 300,
            fontSize: '1.4rem',
            lineHeight: '2.2rem',
        },
        body2: {
            fontWeight: 300,
            fontSize: '1.2rem',
            lineHeight: 1.8,
            fontFamily: `"IRANSans", "sans-serif", "serif" `,
        },
        body21: {
            fontWeight: 300,
            fontSize: '1rem',
            lineHeight: 2,
            fontFamily: `"IRANSans", "sans-serif", "serif" `,
        },
        body3: {
            fontWeight: 400,
            fontSize: '0.9rem',
            lineHeight: 1.8,
            fontFamily: `"IRANSans", "sans-serif", "serif" `,
        },
        body4: {
            fontWeight: 400,
            fontSize: '0.7rem',
            lineHeight: 2.5,
            fontFamily: `"IRANSans", "sans-serif", "serif" `,
        },
        fontFamily: `"IRANSans", "sans-serif", "serif" `,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        // fontWeightBold: 700,
    },

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            sg: 750,
            md: 960,
            lg: 1280,
            xl: 1700,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
        MuiFilledInput: {
            defaultProps: {
                // margin: 'dense',
            },
        },
        MuiFormControl: {
            defaultProps: {
                // margin: 'dense',
            },
        },
        MuiFormHelperText: {
            defaultProps: {
                // margin: 'dense',
            },
        },
        MuiIconButton: {
            defaultProps: {
                // size: 'small',
            },
        },
        MuiInputBase: {
            defaultProps: {
                // margin: 'dense',
            },
        },
        MuiInputLabel: {
            defaultProps: {
                // margin: 'dense',
            },
        },
        MuiListItem: {
            defaultProps: {
                // dense: true,
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                // margin: 'dense',
            },
        },
        MuiFab: {
            defaultProps: {
                // size: 'small',
            },
        },
        MuiTable: {
            defaultProps: {
                // size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                // margin: 'dense',
            },
        },
        MuiToolbar: {
            defaultProps: {
                // variant: 'dense',
            },
        },
    },
    transitions: {
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            // most basic recommended timing
            standard: 300,
            // this is to be used in complex animations
            complex: 375,
            // recommended when something is entering screen
            enteringScreen: 225,
            // recommended when something is leaving screen
            leavingScreen: 195,
        },
        easing: {
            // This is the most common easing curve.
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            // Objects enter the screen at full velocity from off-screen and
            // slowly decelerate to a resting point.
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            // Objects leave the screen at full velocity. They do not decelerate when off-screen.
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            // The sharp curve is used by objects that may return to the screen at any time.
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
    },
    direction: 'rtl',
};

export default {
    main: createTheme({ ...theme, ...overrides }),
};
