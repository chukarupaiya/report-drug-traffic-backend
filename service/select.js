const { db } = require("../database/config");

exports.select = async (query, callback) => {
  console.log("[+] initiating find ", query);
  let selectQuery = `SELECT ${query.subject} FROM ${query.table} `;
  if (query.condition.length > 0) {
    selectQuery = selectQuery + `WHERE ${query.condition[0]} `;
    query.condition.forEach((condition) => {
      selectQuery = selectQuery + `AND ${condition} `;
    });
  }
  if (query.commands !== undefined) {
    selectQuery = selectQuery + query.commands;
  }
  selectQuery = selectQuery + ";";

  db.query(selectQuery, async (err, result) => {
    if (err) {
      console.log("[-] error in fetching data ", err);
    } else {
      console.log("[+] fetched data");
      callback(err, result);
    }
  });
};
