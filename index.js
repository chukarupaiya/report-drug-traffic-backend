const express = require("express");
const { createInitialTable } = require("./controllers/createInitialTable");
const app = express();
const { db } = require("./database/config");
const registerRouter = require("./routers/authentication");
const postRouter = require("./routers/post");
const locationRouter = require("./routers/location");

app.use(express.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","*");
  next();
});



app.listen( process.env.PORT || 3001, () => {
  db.connect(function (err) {
    if (err) {
      return console.error("[-] error: " + err.message);
    }
    console.log("[+] Connected to the MySQL server.");
    createInitialTable();
    app.use("/post", postRouter);
    app.use("/authentication", registerRouter);
    app.use("/location", locationRouter);
    
  });
  console.log("[+] Server listening");
});



//* position
// 1-admin
// 0-superadmin
// 2-repoter



