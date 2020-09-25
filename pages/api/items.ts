const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

export default async function Items (req, res) {
  const db = await open({
    filename: './data.db',
    driver: sqlite3.Database
  })

  const items = await db.all('select * from items')
  console.log(items)
  return res.json(items)
}
