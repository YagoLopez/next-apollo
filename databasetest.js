// const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


// async function setup() {
//   const db = await sqlite.open('./mydb.sqlite')
//   await db.migrate({force: 'last'})
// }
//
// setup()

// // this is a top-level await
(async () => {
  // open the database
  const db = await open({
    filename: './data.db',
    driver: sqlite3.Database
  })

  const items = await db.all('select * from items')
  console.log(items)
})()