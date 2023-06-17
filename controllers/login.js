const { select } = require("../service/select");
const jwt = require("jsonwebtoken");
const { checkingStatus } = require("./middleware/checkingstatus");
require("dotenv").config();

exports.Login = async (req, res) => {
  console.log("\n[+]  request", req.method, req.originalUrl);
  console.log("[+] ", req.body);
  checkingStatus(req.body.user_name)
    .then(async () => {
      const getPassword = (position) =>
        new Promise((resolve, reject) => {
          let condition = {
            subject: "*",
            table:
              "users",
            condition: [`user_name="${req.body.user_name}"`],
          };
          select(condition, (err, result) => {
            console.log("[+] ", result);
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      try {
        if (process.env.MAIL_USERNAME == req.body.user_name) {
          if (process.env.MAIL_PASSWORD == req.body.password) {
            const data = {
              user_name: req.body.user_name,
              position: 0,
              id: 1,
            };
            jwt.sign(
              data,
              process.env.SEC_KEY,
              { expiresIn: "144000s" },
              async (err, token) => {
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
                    data: { position: 0, id: 1, user_name: req.body.user_name },
                    token: token,
                    status: true,
                  });
                  res.send({
                    data: { position: 0, id: 1, user_name: req.body.user_name },
                    token: token,
                    status: true,
                  });
                }
              }
            );
          } 
        } else {
          await select(
            {
              subject: "*",
              table: "users",
              condition: [`user_name="${req.body.user_name}"`],
            },
            (err, userResult) => {
              console.log("[+] ", userResult);
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
                if (userResult.length == 0) {
                  console.log(`[+]  `, {
                    statusMessage: "User doesn't exsist",
                    status: false,
                  });
                  res.send({
                    statusMessage: "User doesn't exsist",
                    status: false,
                  });
                  //TODO: write delete function to remove data from user table
                } else {
                  getPassword(userResult[0].position)
                    .then((result) => {
                      if (result.length === 0) {
                        console.log(`[-]  `, {
                          statusMessage: "data miss matched",
                          status: false,
                        });
                        res.send({
                          statusMessage: "data miss matched",
                          status: false,
                        });
                      } else if (result[0].password === req.body.password) {
                        const data = {
                          user_name: result[0].user_name,
                          position: userResult[0].position,
                          id: userResult[0].user_id,
                        };

                        jwt.sign(
                          data,
                          process.env.SEC_KEY,
                          { expiresIn: "144000s" },
                          async (err, token) => {
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
                                data,
                                token: token,
                                status: true,
                              });
                              res.send({
                                data,
                                token: token,
                                status: true,
                              });
                            }
                          }
                        );
                      } else {
                        console.log(`[-]  `, {
                          statusMessage: "Password miss matched",
                          status: false,
                        });
                        res.send({
                          statusMessage: "Password miss matched",
                          status: false,
                        });
                      }
                    })
                    .catch((err) => {
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
                    });
                }
              }
            }
          );
        }
      } catch (err) {
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
      }
    })
    .catch((err) => {
      res.send({
        error: err,
        statusMessage: "user not found",
        status: false,
      });
    });
};
