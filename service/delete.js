const { db } = require("../database/config");

exports.deleteRow = async (query, table, callback) => {
  try {
    db.query(query, (error, result) => {
      if (error) {
        console.log("[-] Data deletion not successful in ", table, error);
      } else {
        console.log("[+] Data deletion successful in ", table);
      }
      callback(error, result);
    });
  } catch (err) {
    console.log(err);
  }
};
