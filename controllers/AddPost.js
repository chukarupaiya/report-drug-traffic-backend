const { InsertInPostTableQuery} = require("../database/model/insertTable");
  const { insert } = require("../service/insert");
  
  exports.AddPost = async (req, res) => {
    console.log("\n[+]  request", req.method, req.originalUrl);
    console.log("[+] ", req.body);
   
    try {    insert(
                InsertInPostTableQuery(),
                "post",
                [    
                    req.body.user_id,
                    req.body.like,
                    req.body.address,
                    req.body.date,
                    req.body.seen,
                    req.body.time,
                    req.body.aggregate
                        
                ],
                (err) => {
                    if (!err) {
                        console.log(`[+]  `, {
                            statusMessage: "post added successfully",
                            status: true,
                        });
                        res.send({
                            statusMessage:"post added successfully",
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
  