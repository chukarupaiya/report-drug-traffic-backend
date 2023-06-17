const { select } = require("../../service/select");

exports.checkingStatus = (user_name) =>
  new Promise((resolve, reject) => {
    console.log("[+] checking status for ", user_name);
    select(
      {
        subject: "user_id",
        table: "users",
        condition: [`user_name="${user_name}"`],
      },
      async (err, result) => {
        if (err) {
          console.log(`[-]  `, {
            error: err,
            statusMessage: "something went wrong",
            status: false,
          });
          reject(err);
        } else {
          if (result.length == 0) {
            console.log(`[-]  `, {
              statusMessage: "User not founded",
              status: false,
            });
            reject(err);
          } else {
            resolve();
          }
        }
      }
    );
  });
