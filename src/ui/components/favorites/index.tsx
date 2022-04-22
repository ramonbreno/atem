import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import StarIcon from '@mui/icons-material/Star';
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import { formatter } from '../../../utils/currency_formatter';
import { useFavoritesContext } from './Context';
import { FavoritesItem } from "./Interface";
import { Card, CardPercentage, CardPrice, CardRankNumber, CardSymbol, FavoritesTitle } from "./Style";

function FavoritesList() {
    let navigate = useNavigate();
    const { favoritesContext } = useFavoritesContext();

    const handleClick = (id: string) => {
        navigate(`/coin-details/${id}`);
    };

    const getComparator = (a: FavoritesItem, b: FavoritesItem) => {
        if (a.rating > b.rating) {
            return 1;
        }
        if (a.rating < b.rating) {
            return -1;
        }
        return 0;
    }

    function FavoritesItem(props: FavoritesItem) {
        return (
            <Box sx={{ display: 'flex', marginRight: '30px', cursor: 'pointer' }} >
                <Card onClick={() => handleClick(props.id)}>
                    < Box display={'flex'}>
                        <CardRankNumber>
                            {props.rating}
                            <StarIcon style={{ color: '#F6B87E' }} />
                        </CardRankNumber>
                        <Box>
                            <CardSymbol >
                                {props.symbol.toUpperCase()}{props.isUp ? <ArrowDropUpIcon style={{ color: '#16C784' }} /> : <ArrowDropDownIcon style={{ color: '#EA3943' }} />}
                            </CardSymbol>
                            <CardPrice >{formatter.format(props.price)}</CardPrice>
                            <CardPercentage style={{ color: props.isUp ? '#16C784' : '#EA3943' }}>
                                {props.percentage}%
                            </CardPercentage>
                        </Box>
                    </Box>
                </Card >
            </Box >
        );
    }

    return (
        <>
            {
                (favoritesContext?.length ?? 0) > 0 ? <FavoritesTitle>Favoritos</FavoritesTitle> : <></>
            }

            <List sx={{ display: 'flex', flexDirection: 'row', padding: 0, maxHeight: '100%', overflow: 'auto', scrollbarWidth: 0 }}>
                {favoritesContext?.sort(getComparator).map(item => <FavoritesItem
                    key={item.symbol}
                    isUp={item.isUp}
                    rating={item.rating}
                    symbol={item.symbol}
                    id={item.id}
                    price={item.price}
                    percentage={item.percentage}
                />)}
            </List>
        </>
    );
}

export default FavoritesList;
