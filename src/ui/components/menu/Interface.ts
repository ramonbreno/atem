export interface Coin {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank?: number;
    thumb: string;
    large: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Nft {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
}

export interface SearchResultsInterface {
    coins: Coin[];
    exchanges: any[];
    icos: any[];
    categories: Category[];
    nfts: Nft[];
}


export interface SearchProps {
    hasResults: boolean
}

