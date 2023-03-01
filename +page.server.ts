import {
    API_KEY,
} from "$env/static/private";
import type { PageServerLoad } from './$types'


export const load: PageServerLoad = async ({
    fetch
}) => {
    const getRandomRecipe = async () => {
        const min = 0;
        const max = 2000;
        const rando = Math.floor(Math.random() * (max - min + 1)) + min;
        const res = await fetch(`https://tasty.p.rapidapi.com/recipes/list?from=${rando}&size=1`, {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            },
        });
        const data = await res.json();
        return data;
    };
    return {
        posts: getRandomRecipe()
    };
};


/*  posts: get_random_drink() */

  /*
    const get_random_drink = async () => {

        const dri = await fetch(`https://the-cocktail-db.p.rapidapi.com/random.php`, {
            headers: {
                'X-RapidAPI-Key': DRINKS_API_KEY,
                'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
            },
        });
 
const get_posts = async () => {
        const res = await fetch(`https://dummyjson.com/products/1`);*/