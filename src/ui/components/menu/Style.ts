import InputBase from '@mui/material/InputBase';
import { createTheme, styled } from '@mui/material/styles';
import { SearchProps } from './Interface';

export const Search = styled('div')((props: SearchProps) => ({
    position: 'relative',
    /* marginRight: theme.spacing(2), */
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    background: '#EFF2F5',
    borderRadius: props.hasResults ? '8px 8px 0px 0px' : '8px',
    border: '1px solid #ccc',
    borderBottom: props.hasResults ? '0px solid #ccc' : '1px solid #ccc'
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const MenuItem = styled('p')(({ theme }) => ({
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 600,
    marginLeft: 40
}));

export const theme = createTheme({
    palette: {
        primary: {
            dark: '#0072c7',
            contrastText: '#000',
            main: '#fff',
            light: '#6dd1ff'
        },
        secondary: {
            dark: '#0072c7',
            contrastText: '#fff',
            main: '#18A0FB',
            light: '#6dd1ff'
        }
    },
});

export const DropdownSearch = styled('div')((props: SearchProps) => ({
    display: props.hasResults ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: '#EFF2F5',
    overflow: 'auto',
    zIndex: 1,
    width: '100%',
    border: '1px solid #ccc',
    borderTop: 0,
    borderRadius: '0px 0px 8px 8px',
    //margin: -1,
    padding: 0,
}));

export const DropdownSearchItem = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',

    padding: 12,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: 600,
    "&:hover": {
        background: '#ccc'
    },
    cursor: 'pointer',
}));
