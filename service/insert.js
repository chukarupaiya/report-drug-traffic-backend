const { db } = require("../database/config");

exports.insert = async (query, table, data, callback) => {
  try {
    db.query(query, data, (error, result) => {
      if (error) {
        console.log("[-] Data inserted not successfully in ", table, error);
      } else {
        console.log("[+] Data inserted successfully in ", table);
      }
      callback(error, result);
    });
  } catch (err) {
    console.log(err);
  }
};
