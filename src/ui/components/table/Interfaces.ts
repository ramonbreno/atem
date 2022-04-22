export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: number;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    last_up: string;
}

export interface Data {
    id: string;
    marketCapRank: number;
    name: string;
    image: string,
    symbol: string,
    price: number;
    percentageHours: number;
    percentageDays: number;
    marketValue: number;
    isFavorite: boolean;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

export interface CoinNameCellProps {
    image: string;
    name: string;
    symbol: string;
}

export interface PercentageHourProps {
    percentage: number
}