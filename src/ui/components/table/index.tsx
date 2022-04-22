import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../../services/api';
import { getFavoritesInLocalStorage, removeFavoriteInLocalStorage, setFavoriteInLocalStorage } from '../../../services/localstorage';
import { formatter } from '../../../utils/currency_formatter';
import { CoinContext, useCoinContext } from '../../modules/home/Context';
import { useFavoritesContext } from '../favorites/Context';
import { FavoritesItem } from '../favorites/Interface';
import { Coin, CoinNameCellProps, Data, EnhancedTableProps, HeadCell, Order, PercentageHourProps } from './Interfaces';
import { FavoritesCell, NameCell, SymbolCell, TableCellCustom, TableCustom, TableLink, TableSortLabelCustom } from './Style';

function createData(
    id: string,
    marketCapRank: number,
    name: string,
    image: string,
    symbol: string,
    price: number,
    percentageHours: number,
    percentageDays: number,
    marketValue: number,
    isFavorite: boolean
): Data {
    return {
        id,
        marketCapRank,
        name,
        image,
        symbol,
        price,
        percentageHours,
        percentageDays,
        marketValue,
        isFavorite,
    };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string | boolean },
        b: { [key in Key]: number | string | boolean },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells: readonly HeadCell[] = [
    {
        id: 'marketCapRank',
        numeric: false,
        disablePadding: false,
        label: '#',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Nome',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Preço',
    },
    {
        id: 'percentageHours',
        numeric: true,
        disablePadding: false,
        label: '24h %',
    },
    {
        id: 'percentageDays',
        numeric: true,
        disablePadding: false,
        label: '7d %',
    },
    {
        id: 'marketValue',
        numeric: true,
        disablePadding: false,
        label: 'Valor de mercado',
    },
];

function CoinNameCell(props: CoinNameCellProps) {
    return (
        <Box sx={{ display: 'flex' }}>
            <img src={props.image} width={24} height={24} />
            <NameCell >{props.name}</NameCell>
            <SymbolCell >{props.symbol.toUpperCase()}</SymbolCell>
        </Box >
    );
}


function PercentageHour(props: PercentageHourProps) {
    let percentage = (props.percentage < 0 ? (props.percentage * (-1)) : props.percentage).toFixed(2);
    let isUp = props.percentage >= 0;
    let color = isUp ? '#16C784' : '#EA3943';

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {isUp ? <ArrowDropUpIcon
                sx={{ color }}
            /> : <ArrowDropDownIcon
                sx={{ color }}
            />}
            <Typography sx={{ color, fontFamily: 'Inter', fontWeight: 600 }}>{percentage}%</Typography>
        </Box >
    );
}


function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabelCustom
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            IconComponent={ArrowDropDownIcon}
                        >
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                            {headCell.label}
                        </TableSortLabelCustom>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default function CoinsTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('marketCapRank');
    const [rows, setRows] = React.useState<Data[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { setCoinContext } = useCoinContext();
    const { favoritesContext, setFavoritesContext } = useFavoritesContext();

    let navigate = useNavigate();

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (id: string) => {
        navigate(`/coin-details/${id}`);
    };

    const initFavorites = () => {
        let favorites: FavoritesItem[] = getFavoritesInLocalStorage('favorites');

        setFavoritesContext(favorites);
    }

    const fetchCoins = async () => {
        let favorites: FavoritesItem[] = getFavoritesInLocalStorage('favorites');
        let coinsList: Data[] = [];
        setIsLoading(true);
        const { data } = await api.get<Coin[]>('/coins/markets/?vs_currency=usd');
        setIsLoading(false);

        data.slice(0, 10).forEach((item) => {
            let isFavorite = checkFavorite(item.symbol, favorites);
            coinsList.push(createData(item.id, item.market_cap_rank, item.name, item.image, item.symbol, item.current_price, item.price_change_percentage_24h, item.market_cap_change_percentage_24h, item.market_cap, isFavorite));
        });

        setRows(coinsList);

        pushCoinDetails(coinsList);
    }

    const pushCoinDetails = (data: Data[]) => {
        let addInfo: CoinContext = { additionInfo: [] };

        data.slice(0, 2).forEach(item => {
            addInfo.additionInfo?.push({
                id: item.id,
                symbol: item.symbol,
                market_cap: item.marketValue,
                percentage: item.percentageHours
            });
        });

        setCoinContext(addInfo);
    }

    useEffect(() => {
        initFavorites();
        fetchCoins();
    }, []);

    const updateFavorites = (favoritesInLocalStorage: FavoritesItem[]) => {
        if (rows.length > 0) {
            let coinsList: Data[] = rows;

            coinsList.forEach((item, index) => {
                coinsList[index].isFavorite = checkFavorite(item.symbol, favoritesInLocalStorage);
            });
            setRows(coinsList);
        }
    }

    const checkFavorite = (symbol: string, favoritesInLocalStorage: FavoritesItem[]) => {
        let isFavorite: boolean = false;

        favoritesInLocalStorage.forEach(item => {
            if (item.symbol == symbol) {
                isFavorite = true;
            }
        });
        return isFavorite;
    }

    const handleSetFavorite = (favorite: FavoritesItem) => {
        let favorites: FavoritesItem[] = [...(favoritesContext ?? []), favorite];

        setFavoriteInLocalStorage('favorites', favorite);
        setFavoritesContext(favorites);
        updateFavorites(favorites);
    }

    const handleRemoveFavorite = (favorite: FavoritesItem) => {
        let favoritesInLocalStorage: FavoritesItem[] = removeFavoriteInLocalStorage('favorites', favorite);

        setFavoritesContext(favoritesInLocalStorage);
        updateFavorites(favoritesInLocalStorage);
    }

    return (
        <Box sx={{ marginTop: '100px', marginBottom: '100px' }}>
            {isLoading ?
                <Box sx={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress color="success" />
                </Box>
                : <TableContainer component={Paper} sx={{ boxShadow: 0 }} elevation={0}>
                    <TableCustom sx={{ minWidth: 650 }} size="medium" aria-label="a dense table" >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {rows.sort(getComparator(order, orderBy)).map((row) => (
                                <TableRow
                                    key={row.marketCapRank}
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCellCustom align="left" sx={{ fontWeight: 400 }}>
                                        <FavoritesCell>
                                            <TableLink onClick={() => row.isFavorite ? handleRemoveFavorite({
                                                isUp: row.percentageHours > 0,
                                                percentage: row.percentageHours,
                                                price: row.price,
                                                rating: row.marketCapRank,
                                                symbol: row.symbol,
                                                id: row.id,
                                            }) : handleSetFavorite({
                                                isUp: row.percentageHours > 0,
                                                percentage: row.percentageHours,
                                                price: row.price,
                                                rating: row.marketCapRank,
                                                symbol: row.symbol,
                                                id: row.id,
                                            })} key={row.marketCapRank}>

                                                {row.isFavorite ? <StarIcon style={{ color: '#F6B87E', marginRight: '23px' }} />
                                                    :
                                                    <StarBorderOutlinedIcon style={{ color: '#A7B1C2', marginRight: '23px' }} />}
                                            </TableLink>
                                            {row.marketCapRank}
                                        </FavoritesCell>
                                    </TableCellCustom>
                                    <TableCell align="left" onClick={() => handleClick(row.id)}>
                                        <TableLink>
                                            <CoinNameCell
                                                name={row.name}
                                                image={row.image}
                                                symbol={row.symbol}
                                            />
                                        </TableLink>
                                    </TableCell>
                                    <TableCellCustom align="right">{formatter.format(row.price)}</TableCellCustom>
                                    <TableCellCustom align="right">
                                        <PercentageHour
                                            percentage={row.percentageHours}
                                        />
                                    </TableCellCustom>
                                    <TableCellCustom align="right">{row.percentageDays}</TableCellCustom>
                                    <TableCellCustom align="right">{formatter.format(row.marketValue)}</TableCellCustom>
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableCustom>
                </TableContainer>}
        </Box >
    );
}