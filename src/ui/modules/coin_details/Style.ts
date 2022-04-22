import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const CoinImage = styled('img')(({ theme }) => ({
    width: 32,
    height: 32,
    marginRight: 12,
}));

export const Name = styled('div')(({ theme }) => ({
    fontWeight: 700,
    fontSize: '40px',
    marginRight: 12,
}));

export const Symbol = styled('div')(({ theme }) => ({
    fontWeight: 400,
    fontSize: '12px',
    background: '#CCC',//EFF2F5
    padding: '8px 10px',
    borderRadius: '8px',
    color: '#A7B1C2'
}));

export const Rating = styled('div')(({ theme }) => ({
    background: '#80899C',
    padding: '8px',
    borderRadius: '8px',
    color: '#FFF',
    fontWeight: 500,
    fontSize: '16px',
    marginTop: '8px'
}));

export const PriceTitle = styled('h6')(({ theme }) => ({
    fontWeight: 600,
    fontSize: '16px',
    color: '#A7B1C2',
}));

export const Price = styled('h6')(({ theme }) => ({
    fontWeight: 700,
    fontSize: '40px',
    color: '#000',
    marginRight: '16px'
}));

export const PricePercentage = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    fontSize: '12px',
    padding: '3px 10px',
    borderRadius: '8px',
    color: '#F8FAFD',

}));

export const MarketCap = styled('p')(({ theme }) => ({
    fontWeight: 400,
    fontSize: '16px',
    color: '#A7B1C2',
}));

export const CoinOtherPercentage = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '16px',
}));

export const LinkCustom = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '16px',
    color: '#A7B1C2',

}));

export const Card = styled('div')(({ theme }) => ({
    padding: '24px 160px 24px 24px',
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    boxSizing: 'border-box',
    borderRadius: '8px',
}));

export const CardTitle = styled('div')(({ theme }) => ({
    fontWeight: 600,
    fontSize: '16px',
    color: '#A7B1C2',
}));

export const CardSubtitle = styled('div')(({ theme }) => ({
    fontWeight: 700,
    fontSize: '40px',
    color: '#1E3146',
}));

