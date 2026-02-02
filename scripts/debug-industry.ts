import { getAllIndustries } from '../lib/sanity/queries';

async function main() {
    try {
        console.log('Fetching Industries...');
        const industries = await getAllIndustries();
        if (industries.length > 0) {
            const ind = industries[0];
            console.log('--- Industry DEBUG ---');
            console.log('Title:', ind.title);
            console.log('Hero Background Image:', ind.heroBackgroundImage);
            console.log('Hero Image (Foreground):', ind.heroImage);
            console.log('---------------------');
        } else {
            console.log('No industries found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
