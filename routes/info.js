var express = require('express');
var router = express.Router();
var query  = require('../util/mysql');
var bodyParser = require('body-parser');

//创建application/json解析
var jsonParser = bodyParser.json();
function getDate(){
  let date = new Date();
  let month = (date.getMonth() + 1).toString().padStart(2,'0');
  let strDate = date.getDate().toString().padStart(2,'0');
  //时间格式yyyy-MM-dd HH:MM:SS
  return `${date.getFullYear()}-${month}-${strDate} ${getCurrentTime()}`;
}
function getCurrentTime() {
  let date = new Date();
  //时间格式HH:MM:SS
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
/* GET users listing. */
router.post('/insert', jsonParser,function(req, res, next) {
  let data = req.body;
  let result={
    code:0,
    message:""
  };
  let[username,phone,cardnumber,address,temperature] = [data.username,data.phone,data.cardnumber,data.address,data.temperature]
  query("INSERT INTO information_dengji(`name`,`phone`,`cardnumber`,`address`,`temperature`,`createtime`) VALUES ('"+username+"'"+",'"+phone+"',"+"'"+cardnumber+"'"+",'"+address+"',"+temperature+",'"+getDate()+"')",function(err,b,c){
    
    if(err===null){
      result.code=200,
      result.message="";
      res.send(JSON.stringify(result))
    }
    else{
      result.code=500,
      result.message="";
      res.send(JSON.stringify(result))
    }
    
  })
});
router.get('/get', function(req, res, next) {
  let result = {
    code:0,
    message:"",
    data:[]
  }
  let data = req.query
  let currrecord=0;
  let[btime,etime,username,currnum=0,pagenums=20] = [data.btime,data.etime,data.username,data.currnum,data.pagenums]
  var str = 'SELECT * from information_dengji where 1=1'
  if(btime!==undefined && etime!==undefined){
    str+=` and createtime between '${req.query.btime}' and '${req.query.etime}'`
  }
  else if(btime!==undefined)
  {
    str+=` and createtime >='${btime}'`
  }
  else if(etime!==undefined)
  {
    str+=` and createtime <'${etime}'`
  }
  if(username!==undefined){
    str+=` and name like '%${username}%'`
  }
  if(currnum==1){
    currrecord=0;
  }
  else{
    currrecord = (currnum-1)*pagenums
  }
  str+=` order by createtime desc`
  str+=` limit ${currrecord},${pagenums}`
  console.log(str.toString());
  query(str,function(err,vals,fields){
    if(err===null){
      result.code=200,
      result.message="";
      result.data = vals
    }
    else{
      result.code=500,
      result.message="";
    }
    res.send(JSON.stringify(result));
  })
});
module.exports = router;