import { ThemeOptions } from '@mui/material/styles';

//https://zenoo.github.io/mui-theme-creator/
export function themeOptions(isDarkMode: boolean): ThemeOptions {
    return {
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: '#ffffff',
                dark: '#c7c7c7',
                light: '#ffffff',
            },
            secondary: {
                main: '#607d8b',
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: `
                    ::-webkit-scrollbar{
                        display: auto;
                        width: 7px;
                    },
                    ::-webkit-scrollbar-thumb {
                        background-color: rgba(255,255,255,0.2);
                        border-radius: 10px;
                    },
                    ::-webkit-scrollbar-track {
                        background:rgba(0,0,0,0);
                    },
                    body {
                        overflow: overlay;
                    }
                `
            },
        },
    }
};