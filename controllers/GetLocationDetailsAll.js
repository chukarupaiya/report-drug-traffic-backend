const { select } = require("../service/select");

exports.GetLocationDetailsAll = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  let condition = {
    subject:
      "`location_id`,`latitude`, `longitude`",
    table: "location",
    condition: [`location_id>"${0}"`],
  };
  await select(condition, async (err, result) => {
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
      if (result.length != 0) {
        console.log(`[+]  `, {
          result: result,
          status: true,
        });
        res.send({
          result: result,
          status: true,
        });
      } else {
        console.log(`[-]  `, {
          statusMessage: "invalid details",
          status: false,
        });
        res.send({
          statusMessage: "invalid details",
          status: false,
        });
      }
    }
  });
};
