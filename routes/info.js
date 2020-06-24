var express = require('express');
var router = express.Router();
var mysql  = require('mysql');

var connection = mysql.createConnection({
  host     : 'rm-2zeicyr5js84u391gto.mysql.rds.aliyuncs.com',
  user     : 'information_root',
  password : 'information_root@163',
  database : 'information'
});
/* GET users listing. */
router.post('/insert', function(req, res, next) {
  res.send('insert');
});
router.get('/get', function(req, res, next) {
  connection.connect();
 
  connection.query('SELECT * from information_dengji', function(err, data, fields) {
    if (err) {
      // console.log(err);
      res.send('error');
      return;
    };
    res.send(JSON.stringify(data));
    // console.log(data);
    connection.end();
  });
   
});
module.exports = router;