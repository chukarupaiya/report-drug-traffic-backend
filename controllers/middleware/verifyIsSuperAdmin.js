const { select } = require("../../service/select");

exports.verifyIsSuperAdmin = async (req, res, next) => {
  console.log("[+] checking position for ", req.body.user_name);
  await select(
    {
      subject: "position",
      table: "users",
      condition: [`user_name="${req.body.tokenEmail}"`],
    },
    async (err, result) => {
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
        if (result[0].Position != 3) {
          console.log(`[-]  `, {
            statusMessage: "You have no privilages",
            status: false,
          });
          res.send({
            statusMessage: "You have no privilages",
            status: false,
          });
        } else {
          console.log("[+] verified as super admin");
          next();
        }
      }
    }
  );
};
