import SearchIcon from '@mui/icons-material/Search';
import {
  Box
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import menuIcon from '../../../assets/icon.png';
import api from '../../../services/api';
import { Coin, SearchResultsInterface } from './Interface';
import { DropdownSearch, DropdownSearchItem, MenuItem, Search, SearchIconWrapper, StyledInputBase, theme } from './Style';


function MenuComponent() {
  const [searchResults, setSearchResults] = useState<Coin[]>([]);
  const [term, setTerm] = useState('');
  let navigate = useNavigate();
  let timer: number;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTerm(event.target.value);
    window.clearTimeout(timer);
    timer = window.setTimeout(doRequest, 500);
  }

  const doRequest = async () => {
    console.log(`pesquisando... ${term}`);
    let { data } = await api.get<SearchResultsInterface>(`https://api.coingecko.com/api/v3/search/?query=${term}`);
    setSearchResults(data.coins);
  }

  const handleClick = (id: string) => {
    setSearchResults([]);
    setTerm('');
    navigate(`/coin-details/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" elevation={0} >
          <Toolbar >
            <img src={menuIcon} alt=''/>

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
              <Button variant="contained" color='secondary' sx={{ background: '#3C67F7', boxShadow: 0, borderRadius: '8px', textTransform: 'capitalize', marginLeft: '25px' }}>Sign up</Button>

              <Search
                hasResults={searchResults.length > 0}
              >
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: '#A7B1C2' }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Buscar"
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ fontSize: '16px', fontWeight: 600 }}
                  onChange={handleChange}
                  value={term}
                />
                <DropdownSearch
                  hasResults={searchResults.length > 0}
                >

                  {searchResults.map(item =>
                    <DropdownSearchItem onClick={() => handleClick(item.id)}>
                      <img src={item.thumb} width={15} alt=''/>
                      <h4 style={{ margin: '0 10px 0 10px' }}>{item.name}</h4>
                      #{item.market_cap_rank}
                    </DropdownSearchItem>
                  )}
                </DropdownSearch>
              </Search>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider >
  );

}

export default MenuComponent;
