const { InsertInLocationTableQuery} = require("../database/model/insertTable");
  const { insert } = require("../service/insert");
  
  exports.AddLocation = async (req, res) => {
    console.log("\n[+]  request", req.method, req.originalUrl);
    console.log("[+] ", req.body);
   
    try {    insert(
                InsertInLocationTableQuery(),
                "post",
                [    
                    req.body.latitude,
                    req.body.longitude,   
                ],
                (err) => {
                    if (!err) {
                        console.log(`[+]  `, {
                            statusMessage: "location added successfully",
                            status: true,
                        });
                        res.send({
                            statusMessage:"location added successfully",
                            status: true,
                        });
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
    
  };
  