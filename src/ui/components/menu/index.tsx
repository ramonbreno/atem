import SearchIcon from '@mui/icons-material/Search';
import AppBar from "@mui/material/AppBar";
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import React from "react";
import menuIcon from '../../../assets/icon.png';
import { MenuItem, Search, SearchIconWrapper, StyledInputBase, theme } from './Style';

function MenuComponent() {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" elevation={0} >
          <Toolbar >
            <img src={menuIcon} />

            <MenuItem> Cryptocurrencies </MenuItem>

            <MenuItem> Exchanges </MenuItem>

            <MenuItem> NFT </MenuItem>

            <MenuItem> CrypTown </MenuItem>

            <MenuItem> Portfolio </MenuItem>

            <MenuItem> WacthList </MenuItem>

            <MenuItem> Products </MenuItem>

            <MenuItem > Learn </MenuItem>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <MenuItem > Log in </MenuItem>
              <Button variant="contained" color='secondary' sx={{ background: '#3C67F7', boxShadow: 0, borderRadius: '8px', textTransform: 'capitalize' }}>Sign up</Button>

              <Search sx={{ background: '#EFF2F5', borderRadius: '8px', }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                {/*  <StyledInputBase
                  placeholder="Buscar"
                  inputProps={{ 'aria-label': 'search' }}
                /> */}

                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={['teste', 'teste', 'teste']}
                  sx={{ width: 175, height: 'auto' }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscar"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />

              </Search>
            </Box>

          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider >
  );

}

export default MenuComponent;