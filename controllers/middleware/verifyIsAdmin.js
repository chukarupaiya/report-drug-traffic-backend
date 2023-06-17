const { select } = require("../../service/select");

exports.verifyIsAdmin = (req, res, next) => {
  console.log("[+] checking position for ", req.body.Email);
  select(
    {
      subject: "Position",
      table: "users",
      condition: [`Email="${req.body.tokenEmail}"`],
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
        if (result[0].Position < 2) {
          console.log(`[-]  `, {
            statusMessage: "You have no privilages",
            status: false,
          });
          res.send({
            statusMessage: "You have no privilages",
            status: false,
          });
        } else {
          console.log(
            "[+] verified as ",
            result[0].position == 2 ? "admin" : "super admin"
          );
          next();
        }
      }
    }
  );
};
