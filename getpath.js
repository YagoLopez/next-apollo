// const { PHASE_PRODUCTION_BUILD } = require('next/constants')
// var db = new sqlite3.Database( path.resolve(__dirname, 'db.sqlite') );
const path = require('path')
const fullDbpath = path.resolve('data.db')

let filename
console.log('dirname', __dirname)
console.log('filename', __filename)
console.log('fullDbPath', fullDbpath)
console.log('process.cwd()', process.cwd())
console.log('resolve', path.resolve('.'))


if (process.env.NODE_ENV === 'production') {
  filename = './_next/static/data.db'
}

if (process.env.NODE_ENV === 'development') {
  filename = './data.db'
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)


const fullDbPath2 = path.join(process.cwd(), path.sep + 'data.db')
console.log('fullDbPath2', fullDbPath2)