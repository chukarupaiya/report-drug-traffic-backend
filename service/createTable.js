const { db } = require("../database/config");

exports.createTable = async (query, callback) => {
  console.log("\n [+] initiating create table ", query);
  db.query(query, async (err, result) => {
    if (err) {
      console.log("[-] error in creating table", err);
    } else {
      callback(result);
      console.log("[+] table created");
    }
  });
};
