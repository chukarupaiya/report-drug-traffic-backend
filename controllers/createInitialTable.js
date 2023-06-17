const { createTable } = require("../service/createTable");
const { showTables } = require("../service/showTables");
const {
  InsertInUserTableQuery,
} = require("../database/model/insertTable");
const { insert } = require("../service/insert");

const {
  UserTableCreateQuery,
  PostTableCreateQuery,
  LocationTableCreateQuery,
} = require("../database/model/createTable");


exports.createInitialTable = async () => {
  console.log("[+] initialling initial table check ");
  let presentTable = [];
  await showTables(async (result) => {
    presentTable.push(...result);
    presentTable.map((table, index) => {
      presentTable[index] = table[`Tables_in_${process.env.DB_NAME}`];
    });

    if (presentTable.includes("users") != true) {
      createTable(UserTableCreateQuery(), (result) => {
        console.log("[+] User Table Created");
        insert(
          InsertInUserTableQuery(),
          "users",
          [process.env.MAIL_USERNAME,process.env.MAIL_PASSWORD, 0],
          (err, result) => {
            if (!err) {
              console.log("[+] SuperAdmin Inserted");
            } else {
              console.log("[-] SuperAdmin not Inserted");
            }
          }
        );
      });
    }
    
    if (presentTable.includes("post") != true) {
      createTable(PostTableCreateQuery(), (result) => {
        console.log("[+] Post Table Created");
      });
    }

    if (presentTable.includes("location") != true) {
      createTable(LocationTableCreateQuery(), (result) => {
        console.log("[+] Location Table Created");
      });
    }


  });
  
};
