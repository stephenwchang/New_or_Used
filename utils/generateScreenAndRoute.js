const fs = require('fs');
const path = require('path');

const baseFile = path.join('utils/base.html')
const copiedFile = path.join(`public/html/${process.argv[2]}.html`)
const newRoute = `app.get('/${process.argv[2]}', (req, res) => res.sendFile(html_dir + \'${process.argv[2]}.html\', { root: __dirname }))\n`

fs.copyFile(baseFile, copiedFile, (err) => {
  if (err) throw err;
  console.log('Screen Generated!');
});

fs.appendFile(path.join('index.js'), newRoute, function (err) {
  if (err) throw err;
  console.log('Route Added!');
});
