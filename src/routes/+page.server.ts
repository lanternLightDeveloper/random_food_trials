import { RAPIDAPI_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
  try {
    // Get query parameters
    const searchQuery = url.searchParams.get('search') || '';
    const page = Number(url.searchParams.get('page') || '0');
    const pageSize = Number(url.searchParams.get('count')) || 5; // Use `count` for the number of results

    console.log(
      `Fetching recipes for query: "${searchQuery}", page: ${page}, pageSize: ${pageSize}, offset: ${page * pageSize}`
    );

    // API Request
    const response = await fetch(
      `https://tasty.p.rapidapi.com/recipes/list?from=${page * pageSize}&size=${pageSize}&q=${encodeURIComponent(
        searchQuery
      )}`,
      {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
      }
    );

    // Check for response status
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    const data = await response.json();

    console.log('API response data:', data);

    // Validate and process the response
    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Unexpected response format from the API.');
    }

    // Randomly select unique recipes
    const randomRecipes = [];
    const usedIndices = new Set();
    while (randomRecipes.length < pageSize && usedIndices.size < data.results.length) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        randomRecipes.push(data.results[randomIndex]);
      }
    }

    // Return the data to the client
    return {
      posts: { results: randomRecipes },
      searchQuery,
      page
    };
  } catch (error: any) {
    console.error('Error in load function:', error);
    return { posts: null, error: error.message };
  }
};
