var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

/*
export default async function Items (req, res) {
  let result
  db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
    });
  });

  result = db.all('select * from lorem')

  db.close();
  return res.json(result)
}
*/

export default async function Items (req, res) {
  let result
  await db.run("CREATE TABLE lorem (info TEXT)");
  var stmt = await db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
    await stmt.run("Ipsum " + i);
  }
  stmt.finalize();
  result = await db.all('select * from lorem')

  db.close();
  return await res.json(result)
}
