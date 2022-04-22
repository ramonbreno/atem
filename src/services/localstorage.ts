import { FavoritesItem } from "../ui/components/favorites/Interface";

export function setFavoriteInLocalStorage(key: string, value: FavoritesItem) {

    let favoritesLocal: [] = getFavoritesInLocalStorage(key);
    let storaged: FavoritesItem[] = [value];

    if (favoritesLocal.length > 0) {
        let favorites: FavoritesItem[] = favoritesLocal;

        storaged = [...favorites, value];
    }

    localStorage.setItem(key, JSON.stringify(storaged));
    return storaged;
}

export function getFavoritesInLocalStorage(key: string) {
    let favorites = localStorage.getItem(key);
    if (favorites != null) {
        return JSON.parse(favorites);
    }
    return [];
}

export function removeFavoriteInLocalStorage(key: string, value: FavoritesItem) {
    let storaged: FavoritesItem[] = getFavoritesInLocalStorage(key);

    let index = storaged.findIndex(((item) => item.symbol == value.symbol));
    if (index > -1) {
        storaged.splice(index, 1);
    }

    setFavoritesInLocalStorage('favorites', storaged);
    return storaged;
}

export function setFavoritesInLocalStorage(key: string, value: FavoritesItem[]) {
    localStorage.setItem(key, JSON.stringify(value));
}

