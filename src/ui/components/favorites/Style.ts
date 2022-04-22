import styled from "@emotion/styled";

export const Card = styled('div')(() => ({
    background: '#fff',
    border: '1px solid #E5E5E5',
    padding: '16px 44px 16px 24px',
    borderRadius: '8px'
}));

export const CardRankNumber = styled('h6')(() => ({
    fontWeight: 700,
    fontSize: '40px',
    color: '#1E3146',
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',


}));

export const CardSymbol = styled('h6')(() => ({
    fontWeight: 700,
    fontSize: '28px',
    color: '#1E3146',
}));

export const CardPrice = styled('h6')(() => ({
    fontWeight: 400,
    fontSize: '16px',
    color: '#A7B1C2',
    margin: '4px 0 8px 0',
}));

export const CardPercentage = styled('h6')(() => ({
    fontWeight: 400,
    fontSize: '16px',
    color: '#16C784',
}));

export const FavoritesTitle = styled('h6')(() => ({
    fontWeight: 700,
    fontSize: '16px',
    color: '#000',
    marginBottom: '16px'
}));




