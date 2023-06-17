const { update } = require("../service/update");

exports.UpdatePost = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);

  const updateQuery = {
    table: "post",
    setfield: [],
    condition: [`post_id="${req.body.post_id}"`],
  };

  //    if(req.body.Password ){

  if (req.body.like != undefined) {
    updateQuery.setfield.push(`likes="${req.body.like}"`);
  }

  if (req.body.user_id != undefined) {
    updateQuery.setfield.push(`user_id="${req.body.user_id}"`);
  }

  if (req.body.address != undefined) {
    updateQuery.setfield.push(`address="${req.body.address}"`);
  }

  if (req.body.date != undefined) {
    updateQuery.setfield.push(`date="${req.body.date}"`);
  }

  if (req.body.seen != undefined) {
    updateQuery.setfield.push(`seen="${req.body.seen}"`);
  }

  if (req.body.time != undefined) {
    updateQuery.setfield.push(`time="${req.body.time}"`);
  }

  if (req.body.aggregate != undefined) {
    updateQuery.setfield.push(`aggregate="${req.body.aggregate}"`);
  }
  
  
  await update(updateQuery, async (err, result) => {
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
      console.log(`[+]  `, {
        statusMessage: "post successfully updated",
        status: true,
      });
      res.send({
        statusMessage: "post successfully updated",
        status: true,
      });
    }
  });
};
