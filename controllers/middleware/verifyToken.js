const jwt = require("jsonwebtoken");
const { checkingStatus } = require("./checkingstatus");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  console.log("[+] verifying token");
  console.log(req.headers);
  if (typeof req.headers["authorization"] !== undefined) {
   
    const token = req.headers["authorization"].split(" ")[1];
    await jwt.verify(token, process.env.SEC_KEY, async (err, data) => {
      if (err) {
        console.log("[-] ", {
          err: err,
          status: false,
          statusMessage: "Token Forbidden",
        });
        res.send({
          err: err,
          status: false,
          statusMessage: "Token Forbidden",
        });
      } else {
        // console.log("[+] token", data);
        req.body.tokenPosition = data.Position;
        req.body.tokenId = data.id;
        req.body.tokenEmail = data.Email;
        console.log(data);
        checkingStatus(data.Email)
          .then(() => {
            next();
          })
          .catch((err) => {
            res.send({
              error: err,
              statusMessage: "something went wrong",
              status: false,
            });
          });
      }
    });
  } else {
    console.log("[-] ", {
      err: err,
      status: false,
      statusMessage: "Token needed",
    });
    res.send({
      err: err,
      status: false,
      statusMessage: "Token needed",
    });
  }
};
