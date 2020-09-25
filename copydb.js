var copy = require('copy');

copy('./data.db', 'public', function(err, files) {
  if (err) throw err;
  // `files` is an array of the files that were copied
  console.log('files copied', files)
});