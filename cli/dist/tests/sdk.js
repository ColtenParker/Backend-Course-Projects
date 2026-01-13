//Functions imported individually to keep track of tests
import { addFavorite, deleteFavorite, getFavorite, replaceFavorite, } from '../src/lib/sdk.js';
const newFavId = await addFavorite('example', 'example');
console.log(newFavId);
let result = await getFavorite(newFavId);
console.log(result);
result.name = 'test-new';
await replaceFavorite(result.id, result);
const fav = await getFavorite(result.id);
console.log('updated:', fav);
await deleteFavorite(newFavId);
result = await getFavorite(newFavId);
console.log(result);
