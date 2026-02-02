import { getHomePage } from '../lib/sanity/queries';

async function main() {
    try {
        console.log('Fetching Home Page Data...');
        const data = await getHomePage();
        console.log('--- DEBUG START ---');
        console.log('Hero Title:', data?.heroTitle);
        console.log('Hero Background Image:', data?.heroBackgroundImage); // Should be null/undefined initially
        console.log('Hero Background Image Alt:', data?.heroBackgroundImageAlt);
        console.log('Hero Foreground Image:', data?.heroImage); // Should be the existing hero image
        console.log('Hero Foreground Image Alt:', data?.heroImageAlt);
        console.log('--- DEBUG END ---');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
