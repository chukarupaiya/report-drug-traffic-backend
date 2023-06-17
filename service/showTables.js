const { db } = require("../database/config");

exports.showTables = async (callback) => {
  console.log("[+] initiating show table");
  db.query("SHOW TABLES", async (err, result) => {
    if (err) {
      console.log("[-] error in checking table", err);
    } else {
      console.log("[+] fetched tables");
      callback(result);
    }
  });
};
