const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputFilePath = path.join(__dirname, 'data.json');

const categories = [];

fs.readdir(imagesDir, (err, folders) => {
  if (err) {
    return console.error('Unable to scan directory:', err);
  }

  folders.forEach(folder => {
    const folderPath = path.join(imagesDir, folder);
    if (fs.lstatSync(folderPath).isDirectory()) {
      const images = fs.readdirSync(folderPath)
        .filter(file => path.extname(file).toLowerCase() === '.jpg')
        .map(file => path.join('images', folder, file));

      categories.push({
        name: folder,
        images: images
      });
    }
  });

  const data = { categories: categories };
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
  console.log('Data file generated successfully.');
});
