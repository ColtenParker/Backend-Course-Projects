import { Favorite } from '../types.js';

let baseUrl: string;

export const setBaseUrl = (url: string) => {
    baseUrl = url;
};

export const getFavorites = async (): Promise<Favorite[]> => {
    const response = await fetch(`${baseUrl}/favorites`);
    const json = await response.json();
    return json.favorites;
};

export const getFavorite = async (id: number): Promise<Favorite> => {
    const response = await fetch(`${baseUrl}/favorites/${id}`);
    const json = await response.json();
    return json.favorite;
};

export const addFavorite = async (
    name: string,
    url: string
): Promise<number> => {
    const response = await fetch(`${baseUrl}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url }),
    });

    const json = await response.json();
    return json.id;
};

export const deleteFavorite = async (id: number): Promise<number> => {
    const response = await fetch(`${baseUrl}/favorites/${id}`, {
        method: 'DELETE',
    });

    return response.status;
};

export const replaceFavorite = async (
    id: number,
    newFav: Favorite
): Promise<Favorite> => {
    const response = await fetch(`${baseUrl}/favorites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFav),
    });

    const json = await response.json();
    return json.favorite;
};
