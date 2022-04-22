import { Favorite } from "@mui/icons-material";
import { Table, TableCell, TableSortLabel } from "@mui/material";

import { styled } from '@mui/material/styles';

export const TableCustom = styled(Table)(() => ({
    background: '#EFF2F5',
    width: '100%',
}));

export const NameCell = styled('p')(() => ({
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 600,
    margin: '0 8px 0 8px',
}));

export const SymbolCell = styled('p')(() => ({
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 400,
    color: '#A7B1C2',
}));

export const TableCellCustom = styled(TableCell)(() => ({
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 600,
}));

export const TableSortLabelCustom = styled(TableSortLabel)(() => ({
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: 700,
}))

export const FavoritesCell = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
}))

export const TableLink = styled('a')(() => ({
    cursor: 'pointer',
    textDecoration: 'none',
}))
