

module.exports = {
  'GET /demoget': (req, rsp) => {
    let code = req.query.code||0;
    code = parseInt(code);

    let timeout = req.query.timeout||0;
    timeout = parseInt(timeout);

    if(timeout>0){
      setTimeout(()=>{
         rsp.json({
          code: code,
          data: {
            mes:code===0?"success":"error"
          },
        });
      },timeout)
    }else{
       rsp.json({
        code: code,
        data: {
          mes:code===0?"success":"error"
        },
      });
    }
   
  },
};


