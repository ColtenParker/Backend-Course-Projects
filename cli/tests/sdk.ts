//Functions imported individually to keep track of tests

import {
    addFavorite,
    deleteFavorite,
    getFavorite,
    getFavorites,
    replaceFavorite,
    setBaseUrl,
} from '../src/lib/sdk.js';

setBaseUrl('http://localhost:3000');

const newFavId = await addFavorite('example', 'example');
console.log(newFavId);

let result = await getFavorite(newFavId);
console.log(result);

result.name = 'test-new';

const updatedFav = await replaceFavorite(result.id, result);
console.log('updatedFav:', updatedFav);

const fav = await getFavorite(result.id);
console.log('updated (GET):', fav);

await deleteFavorite(newFavId);

result = await getFavorite(newFavId);
console.log(result);
