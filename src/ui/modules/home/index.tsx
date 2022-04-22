import Box from "@mui/material/Box";
import React from "react";
import { Outlet } from "react-router-dom";
import { FavoritesContext } from "../../components/favorites/Context";
import { FavoritesItem } from "../../components/favorites/Interface";
import MenuComponent from "../../components/menu";
import { CoinContext } from "./Context";
import { CustomDiv } from "./Style";


function HomePage() {
    const [coinContext, setCoinContext] = React.useState({});
    const [favoritesContext, setFavoritesContext] = React.useState<FavoritesItem[]>();

    return (
        <CustomDiv>
            <CoinContext.Provider value={{ coinContext, setCoinContext }}>
                <FavoritesContext.Provider value={{ favoritesContext, setFavoritesContext }}>

                    <MenuComponent />
                    <Box sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'Inter' }} >
                        <Box sx={{ width: '90%' }}>
                            <Outlet />
                        </Box>
                    </Box>
                </FavoritesContext.Provider>
            </CoinContext.Provider >
        </CustomDiv>
    );
}

export default HomePage;