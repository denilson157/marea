import { createTheme } from '@material-ui/core';

const theme = createTheme({
    palette: {
        background: {
            default: '#f4f6f8',
            paper: '#ffffff'
        },
        primary: {
            contrastText: '#ffffff',
            main: '#5664d2'
        },
        text: {
            primary: '#172b4d',
            secondary: '#6b778c'
        }
    }
});

export default theme;
