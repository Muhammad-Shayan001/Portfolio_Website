const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const path = require('path');

const inputVideo = path.join(__dirname, 'public/introVideo.mp4');
const posterOutput = path.join(__dirname, 'public/hero-poster.jpg');
const videoOutput = path.join(__dirname, 'public/introVideo-optimized.mp4');

console.log('Ffmpeg path:', ffmpeg);
console.log('Extracting poster frame...');
try {
  execSync(`"${ffmpeg}" -y -i "${inputVideo}" -vframes 1 -q:v 2 "${posterOutput}"`, { stdio: 'inherit' });
  console.log('Poster frame created successfully!');
} catch (e) {
  console.error('Poster extraction failed:', e);
}

console.log('Compressing video...');
try {
  execSync(`"${ffmpeg}" -y -i "${inputVideo}" -vcodec libx264 -crf 26 -preset faster -pix_fmt yuv420p -movflags +faststart "${videoOutput}"`, { stdio: 'inherit' });
  console.log('Video compression completed successfully!');
} catch (e) {
  console.error('Video compression failed:', e);
}
