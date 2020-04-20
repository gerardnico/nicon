let envPath = '.env';
if (typeof process.env.NODE_ENV !== 'undefined') {
    envPath += '.' + process.env.NODE_ENV
}

var dotenv = require('dotenv')
const result = dotenv.config({ path: envPath })
if (result.error) {
    throw result.error
}
console.log("Environment parsed for the env file ("+envPath+") are : "+result.parsed);
const galleryUrl = process.env.GALLERY_URL;
console.log("Generation of the stories ... with the gallery URL (" + galleryUrl+")");
story = require('../src/lib/story_generator');
story.traverseGallery('gallery/', galleryUrl);

