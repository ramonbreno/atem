import Box from "@mui/material/Box";
import FavoritesList from "../../components/favorites";
import CoinsTable from "../../components/table";
import { PageTitle } from "./Interface";
import { IOSSwitch, Highlights } from "./Style";

function CoinsList() {
    return (
        <Box sx={{ fontFamily: 'Inter' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '60px 0 60px 0', }}>
                <PageTitle>Preço das criptomoedas por valor de mercado</PageTitle>

                <Highlights>Highlights <IOSSwitch checked={true} /></Highlights>
            </Box>
            <FavoritesList />
            <CoinsTable />
        </Box>
    );
}

export default CoinsList;