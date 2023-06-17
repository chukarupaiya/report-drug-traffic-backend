const { db } = require("../database/config");

exports.innerjoin = (props) => {
  const query = `SELECT ${props.subject} FROM ${props.tables[0]} X INNER JOIN ${props.tables[1]} Y ON X.${props.keys[0]} = Y.${props.keys[1]};`;
  await db.query(query, async (err, result) => {
    if (err) {
      console.log("[-] error in fetching data ", err);
    } else {
      console.log("[+] fetched data");
      callback(err, result);
    }
  });
};
