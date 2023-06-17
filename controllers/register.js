const {
  InsertInUserTableQuery,
  InsertInPostTableQuery
} = require("../database/model/insertTable");
const { select } = require("../service/select");
const { insert } = require("../service/insert");
const { deleteRow } = require("../service/delete");
const { deleteFromTable } = require("../database/model/deleteTable");

exports.register = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  //maybe include try catch in select.js file
  let userExists = false;
  if (req.body.position === undefined) {
    console.log(`[-]  `, {
      statusMessage: "All field are required",
      status: false,
    });
    res.send({
      statusMessage: "All field are required",
      status: false,
    });
  } else if (
    req.body.position === 1 &&
    (req.body.user_name === undefined ||
      req.body.password === undefined
    )
  ) {
    console.log(`[-]  `, {
      statusMessage: "All field are required",
      status: false,
    });
    res.send({
      statusMessage: "All field are required",
      status: false,
    });
  } else if (
    req.body.position === 2 &&
    (req.body.user_name === undefined ||
      req.body.password === undefined)
  ) {
    console.log(`[-]  `, {
      statusMessage: "All field are required",
      status: false,
    });
    res.send({
      statusMessage: "All field are required",
      status: false,
    });
  } else {
    try {
      select(
        {
          subject: "*",
          table: "users",
          condition: [`user_name="${req.body.user_name}"`],
        },
        (err, result) => {
          console.log("[+] ", result);
          if (err) {
            console.log(`[-]  `, {
              error: err,
              statusMessage: "something went wrong",
              status: false,
            });
            res.send({
              error: err,
              statusMessage: "something went wrong",
              status: false,
            });
          } else {
            if (result.length > 0) {
              console.log(`[+]  `, {
                statusMessage: "User already exsist",
                status: false,
              });
              res.send({
                statusMessage: "User already exsist",
                status: false,
              });
              userExists = true;
            }

            if (userExists === false) {
              insert(
                InsertInUserTableQuery(),
                "users",
                [req.body.user_name, req.body.password ,req.body.position],
                (err, userResult) => {
                  if (!err) {
                    console.log("[+] user Inserted");
                  } else {
                    console.log("[-] user not Inserted");
                  }
              }
              );
            }
          }
        }
      );
    } catch (err) {
      console.log(`[-]  `, {
        error: err,
        statusMessage: "something went wrong in function",
        status: false,
      });
      res.send({
        error: err,
        statusMessage: "something went wrong",
        status: false,
      });
    }
  }
};
