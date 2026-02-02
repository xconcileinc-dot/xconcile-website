
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../lib/sanity/env';

const token = process.env.SANITY_API_TOKEN;

if (!token) {
    throw new Error('SANITY_API_TOKEN is missing');
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // We need fresh data for writing
    token,
});

const STATIC_IMAGES = {
    homeForeground: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    aboutBackground: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop",
    serviceFallback: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop",
    hireFallback: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop",
};

async function uploadImage(url: string) {
    console.log(`Downloading image from ${url}...`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    console.log(`Uploading to Sanity...`);
    const asset = await client.assets.upload('image', buffer, {
        filename: url.split('/').pop() || 'image.jpg',
    });
    console.log(`Uploaded asset: ${asset._id}`);
    return asset._id;
}

async function main() {
    console.log('Starting migration...');

    try {
        // 1. Home Page
        console.log('\n--- Processing Home Page ---');
        const homePage = await client.fetch('*[_type == "homePage"][0]');
        if (homePage) {
            // Logic: Move current heroImage to heroBackgroundImage if not set, OR set generic background
            // The user wants TWO images.
            // Current heroImage in Sanity (from debug) is "Expert Support" background-looking image.
            // So let's move existing heroImage -> heroBackgroundImage

            let bgAssetId = homePage.heroBackgroundImage?.asset?._ref;
            let fgAssetId = homePage.heroImage?.asset?._ref;

            if (!bgAssetId && fgAssetId) {
                console.log('Moving current heroImage to heroBackgroundImage...');
                bgAssetId = fgAssetId;
            }

            // If we don't have a foreground image (because we moved it, or it was never there distinct from background), 
            // use the hardcoded one.
            // Wait, if we moved it, fgAssetId is technically "empty" for the *new* purpose.
            // So let's upload the hardcoded foreground image.
            const newFgAssetId = await uploadImage(STATIC_IMAGES.homeForeground);

            // If we didn't have a background, and we used the old fg as bg, fine. 
            // If we didn't have existing fg, we use the hardcoded one.

            await client.patch(homePage._id)
                .set({
                    heroBackgroundImage: { _type: 'image', asset: { _type: 'reference', _ref: bgAssetId } },
                    heroImage: { _type: 'image', asset: { _type: 'reference', _ref: newFgAssetId } },
                    heroBackgroundImageAlt: homePage.heroImageAlt || "Background Image",
                    heroImageAlt: "Business professionals working together"
                })
                .commit();
            console.log('Home Page updated.');
        }

        // 2. About Page
        console.log('\n--- Processing About Page ---');
        const aboutPage = await client.fetch('*[_type == "aboutPage"][0]');
        if (aboutPage) {
            // About page had hardcoded BG. 
            if (!aboutPage.heroBackgroundImage) {
                const bgAssetId = await uploadImage(STATIC_IMAGES.aboutBackground);
                await client.patch(aboutPage._id)
                    .set({
                        heroBackgroundImage: { _type: 'image', asset: { _type: 'reference', _ref: bgAssetId } },
                        heroBackgroundImageAlt: "Background Image"
                    })
                    .commit();
                console.log('About Page updated (Background Set).');
            } else {
                console.log('About Page already has background.');
            }
        }

        // 3. Services
        console.log('\n--- Processing Services ---');
        const services = await client.fetch('*[_type == "service"]');
        const serviceBgId = await uploadImage(STATIC_IMAGES.serviceFallback); // Upload once

        for (const doc of services) {
            if (!doc.heroBackgroundImage) {
                // If they have a heroImage, move it to bg? Or just set fallback?
                // "ideally should have two images ... one for background"
                // If they already have a custom heroImage, assume that was meant to be the background (as per previous logic).
                const existingImage = doc.heroImage;

                if (existingImage) {
                    await client.patch(doc._id)
                        .set({
                            heroBackgroundImage: existingImage,
                            heroBackgroundImageAlt: doc.heroImageAlt
                        })
                        .commit();
                    console.log(`Service ${doc.title}: Moved heroImage to heroBackgroundImage.`);
                } else {
                    await client.patch(doc._id)
                        .set({
                            heroBackgroundImage: { _type: 'image', asset: { _type: 'reference', _ref: serviceBgId } },
                            heroBackgroundImageAlt: "Service Background"
                        })
                        .commit();
                    console.log(`Service ${doc.title}: Set fallback background.`);
                }
            }
        }

        // 4. Industries
        console.log('\n--- Processing Industries ---');
        const industries = await client.fetch('*[_type == "industry"]');
        // Reuse service fallback image asset for industries as they used the same one in code

        for (const doc of industries) {
            if (!doc.heroBackgroundImage) {
                const existingImage = doc.heroImage;
                if (existingImage) {
                    await client.patch(doc._id)
                        .set({
                            heroBackgroundImage: existingImage,
                            heroBackgroundImageAlt: doc.heroImageAlt
                        })
                        .commit();
                    console.log(`Industry ${doc.title}: Moved heroImage to heroBackgroundImage.`);
                } else {
                    await client.patch(doc._id)
                        .set({
                            heroBackgroundImage: { _type: 'image', asset: { _type: 'reference', _ref: serviceBgId } },
                            heroBackgroundImageAlt: "Industry Background"
                        })
                        .commit();
                    console.log(`Industry ${doc.title}: Set fallback background.`);
                }
            }
        }

        // 5. Hire Staff
        console.log('\n--- Processing Hire Staff ---');
        const staff = await client.fetch('*[_type == "hireStaff"]');
        const hireBgId = await uploadImage(STATIC_IMAGES.hireFallback);

        for (const doc of staff) {
            if (!doc.heroBackgroundImage) {
                const existingImage = doc.heroImage;
                if (existingImage) {
                    await client.patch(doc._id)
                        .set({
                            heroBackgroundImage: existingImage,
                            heroBackgroundImageAlt: doc.heroImageAlt
                        })
                        .commit();
                    console.log(`Hire Staff ${doc.title}: Moved heroImage to heroBackgroundImage.`);
                } else {
                    await client.patch(doc._id)
                        .set({
                            heroBackgroundImage: { _type: 'image', asset: { _type: 'reference', _ref: hireBgId } },
                            heroBackgroundImageAlt: "Hire Staff Background"
                        })
                        .commit();
                    console.log(`Hire Staff ${doc.title}: Set fallback background.`);
                }
            }
        }

        console.log('\nMigration complete!');

    } catch (error) {
        console.error('Migration failed:', error);
    }
}

main();
