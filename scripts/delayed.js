// eslint-disable-next-line import/no-cycle
import { sampleRUM, decorateYouTube } from './scripts.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here
// const main = document.querySelector('main');
// decorateYouTube(main);