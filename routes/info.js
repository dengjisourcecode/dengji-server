var express = require("express");
var router = express.Router();
var path = require('path')
var query = require("../util/mysql");
var bodyParser = require("body-parser");
//引入fs模块
const fs = require("fs");
//引入excel模块
var excelPort = require("excel-export");
//创建application/json解析
var jsonParser = bodyParser.json();
function getDate() {
  let date = new Date();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let strDate = date.getDate().toString().padStart(2, "0");
  //时间格式yyyy-MM-dd HH:MM:SS
  return `${date.getFullYear()}-${month}-${strDate} ${getCurrentTime()}`;
}
function getCurrentTime() {
  let date = new Date();
  //时间格式HH:MM:SS
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
/* GET users listing. */
router.post("/insert", jsonParser, function (req, res, next) {
  let data = req.body;
  let result = {
    code: 0,
    message: "",
  };
  let [username, phone, cardnumber, address, temperature] = [
    data.username,
    data.phone,
    data.cardnumber,
    data.address,
    data.temperature,
  ];
  query(
    "INSERT INTO information_dengji(`name`,`phone`,`cardnumber`,`address`,`temperature`,`createtime`) VALUES ('" +
      username +
      "'" +
      ",'" +
      phone +
      "'," +
      "'" +
      cardnumber +
      "'" +
      ",'" +
      address +
      "'," +
      temperature +
      ",'" +
      getDate() +
      "')",
    function (err, b, c) {
      if (err === null) {
        (result.code = 200), (result.message = "");
        res.send(JSON.stringify(result));
      } else {
        (result.code = 500), (result.message = "");
        res.send(JSON.stringify(result));
      }
    }
  );
});
router.get("/get", function (req, res, next) {
  let result = {
    code: 0,
    message: "",
    data: [],
  };
  let data = req.query;
  let currrecord = 0;
  let [btime, etime, username, currnum = 1, pagenums = 20] = [
    data.btime,
    data.etime,
    data.username,
    data.currnum,
    data.pagenums,
  ];
  var str = "SELECT * from information_dengji where 1=1";
  if (btime !== undefined && etime !== undefined) {
    str += ` and createtime between '${req.query.btime}' and '${req.query.etime}'`;
  } else if (btime !== undefined) {
    str += ` and createtime >='${btime}'`;
  } else if (etime !== undefined) {
    str += ` and createtime <'${etime}'`;
  }
  if (username !== undefined) {
    str += ` and name like '%${username}%'`;
  }
  if (currnum == 1) {
    currrecord = 0;
  } else {
    currrecord = (currnum - 1) * pagenums;
  }
  str += ` order by createtime desc`;
  str += ` limit ${currrecord},${pagenums}`;
  console.log(str);
  query(str, function (err, vals, fields) {
    if (err === null) {
      (result.code = 200), (result.message = "",result.data = vals);
      
    } else {
      (result.code = 500), (result.message = "",result.data = vals);
    }
    res.send(JSON.stringify(result));
  });
});
router.get("/export", function (req, res, next) {
  let result = {
    code: 0,
    message: "",
    data: "",
  };
  let data = req.query;
  let currrecord = 0;
  let [btime, etime, username, currnum = 0, pagenums = 20] = [
    data.btime,
    data.etime,
    data.username,
    data.currnum,
    data.pagenums,
  ];
  var str = "SELECT * from information_dengji where 1=1";
  if (btime !== undefined && etime !== undefined) {
    str += ` and createtime between '${req.query.btime}' and '${req.query.etime}'`;
  } else if (btime !== undefined) {
    str += ` and createtime >='${btime}'`;
  } else if (etime !== undefined) {
    str += ` and createtime <'${etime}'`;
  }
  if (username !== undefined) {
    str += ` and name like '%${username}%'`;
  }
  if (currnum == 1) {
    currrecord = 0;
  } else {
    currrecord = (currnum - 1) * pagenums;
  }
  str += ` order by createtime desc`;
  str += ` limit ${currrecord},${pagenums}`;
  console.log(str.toString());
  query(str, function (err, vals, fields) {
    if(err===null){
    write(vals,function(path){
      res.download(path,'file.xlsx',err=>{
        if(err){
          res.send("失败");
        }else{
          console.log("成功！");
        }
      });
    })
  }
  else{
    res.send("error")
  }
  });
});
const write = function (datas,callback) {
  //定义一个对象，存放内容
  var conf = {};
  //定义表头
  conf.cols = [
    { caption: "人名", type: "string", width: 20 },
    { caption: "电话", type: "string", width: 40 },
    { caption: "身份证号", type: "string", width: 20 },
    { caption: "地址", type: "string", width: 40 },
    { caption: "体温", type: "string", width: 30 },
    { caption: "登记时间", type: "string", width: 30 },
  ];
  //创建一个数组用来多次遍历行数据
  var array = [];
  // 循环导入从数据库中获取的表内容
  for (var i = 0; i < datas.length; i++) {
    //依次写入
    array[i] = [
      datas[i].name,
      datas[i].phone,
      datas[i].cardnumber,
      datas[i].address,
      datas[i].temperature,
      datas[i].createtime,
    ];
  }
  //写入道conf对象中
  conf.rows = array;
  //生成表格
  var result = excelPort.execute(conf);
  var path = `./temp/file${getDate()}.xlsx`;
  // 定义表格存放路径
  fs.writeFile(path, result, "binary", function (err) {
    if (err) {
      console.log(err);
    }
    callback(path)
  });

  return path;
};

module.exports = router;
