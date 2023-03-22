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
    }
};