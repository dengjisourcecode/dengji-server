//导入所需模块  
var mysql=require("mysql");
var pool = mysql.createPool({    
    host:      'rm-2zeicyr5js84u391gto.mysql.rds.aliyuncs.com',  
    user:      'information_root',   
    password:  'information_root@163',    
    database:  'information'
});    
//导出查询相关  
var query=function(sql,callback){    
    pool.getConnection(function(err,conn){    
        if(err){    
            callback(err,null,null);    
        }else{    
            conn.query(sql,function(qerr,vals,fields){    
                //释放连接    
                conn.release();    
                //事件驱动回调    
                callback(qerr,vals,fields);    
            });    
        }    
    });    
};    

module.exports=query; 