const { db } = require("../database/config");

exports.update = async (query, callback) => {
  console.log("[+] initiating update ", query);
  let updateQuery = `UPDATE ${query.table} SET ${[...query.setfield]}`;

  if (query.condition.length > 0) {
    updateQuery = updateQuery + ` WHERE ${query.condition[0]} `;
    query.condition.forEach((condition) => {
      updateQuery = updateQuery + ` AND ${condition} `;
    });
  }
  

  db.query(updateQuery, async (err, result) => {
    if (err) {
      console.log("[-] error in updating", err);
    } else {
      console.log("[+]  data updated");
    }
    callback(err, result);
  });
};
