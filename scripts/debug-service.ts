import { getAllServices } from '../lib/sanity/queries';

async function main() {
    try {
        console.log('Fetching Services...');
        const services = await getAllServices();
        if (services.length > 0) {
            const s = services[0];
            console.log('--- Service DEBUG ---');
            console.log('Title:', s.title);
            console.log('Hero Background Image:', s.heroBackgroundImage);
            console.log('Hero Image (Foreground):', s.heroImage);
            console.log('---------------------');
        } else {
            console.log('No services found.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
