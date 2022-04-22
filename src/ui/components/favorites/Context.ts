import { createContext, useContext } from "react";
import { FavoritesItem } from "./Interface";

export interface FavoritesContextInterface {
    favorites?: FavoritesItem[]
}

export type FavoritesType = {
    favoritesContext?: FavoritesItem[],
    setFavoritesContext: (favoritesContext: FavoritesItem[]) => void,
}

export const FavoritesContext = createContext<FavoritesType>({ setFavoritesContext: (_) => { } });
export const useFavoritesContext = () => useContext(FavoritesContext);