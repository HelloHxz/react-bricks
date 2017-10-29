

module.exports = {
  'GET /demoget': (req, rsp) => {
    let code = req.query.code||0;
    code = parseInt(code);

    let delay = req.query.delay||0;
    delay = parseInt(delay);

    if(delay>0){
      setTimeout(()=>{
         rsp.json({
          code: code,
          data: {
            mes:code===0?"success":"error"
          },
        });
      },delay)
    }else{
       rsp.json({
        code: code,
        data: {
          mes:code===0?"success":"error"
        },
      });
    }
   
  },
  'POST /demopost':(req,rsp)=>{
     let code = req.query.code||0;
      code = parseInt(code);
     let body = req.body||{};
     let postdata = body.postdata||"";

      let delay = req.query.delay||0;
      delay = parseInt(delay);

      if(delay>0){
        setTimeout(()=>{
           rsp.json({
            code: code,
            data: {
              mes:code===0?"success":"error",
              postdata:postdata
            },
          });
        },delay)
      }else{
         rsp.json({
          code: code,
          data: {
            mes:code===0?"success":"error",
            postdata:postdata
          },
        });
      }
   
  }

};


