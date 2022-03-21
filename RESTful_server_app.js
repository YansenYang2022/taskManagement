/***********************************
Author by: Yansen Z Q Yang
Date: 19 March 2022 

Abstract:
     This is an exercise to use a tech of new trending named "NodeJs" to 
	 develop a typical RESTful API web service.
	 
*************************************/

//introducing express framework
var express = require('express');
var app = express();
var mysql  = require('mysql');  
var url = require("url");
var bodyParser  = require("body-parser");  

app.use(bodyParser.urlencoded({ extended: false })); 

var connection = mysql.createConnection({     
  host     : '111.231.31.105',     //replace with your db host   
  user     : 'demo',        //replace with your db user        
  password : 'lEk4fSDFgbfk5',  //replace with your db password               
  port: '3306',                   
  database: 'taskdb'             //replace with your db name        
}); 

//create db connection and keep it alive until graceful shutdown
 console.log("About to connect db"  );
 connection.connect((err)=>{
	if(err){
         throw err;
        }
    console.log("Connected to Db succssfully" );		
 });
 
/***************************************************************
RESTful API, action GET to retrieve all task,sort by id asc

invoked by:
curl http://your_server/task

invoking sample: 
curl http://111.231.31.105/task

output: 
    All data in array JSON format.

*****************************************************************/ 

app.get('/task',  function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("received request for " + pathname );
  	console.log("About to get all tasks  "  );
	
	var  sql = 'SELECT * FROM tasks  ';
	 
//search all
	connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
		////do not close connection because there is more request coming in, this thread is still server other requests
	    //  connection.end();  
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   res.end( JSON.stringify(result));
	 
	 ////do not close connection because there is more request coming in, this thread is still server other requests
	 // connection.end();
	});
  
})  
 
/***************************************************************
RESTful API, action GET to retrieve a task by id

param @id : (mandatory) type integer, the record id of the task

invoked by:
curl http://your_server/task/@id

invoking sample: 
curl http://111.231.31.105/task/1

output: 
    All matching data in array JSON format.

*****************************************************************/ 

app.get('/task/:id',  function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("received request for " + pathname );
  	console.log("About to get  for " + req.params.id);
	
	var  sql = 'SELECT * FROM tasks where id=?';
	var  addSqlParams = [req.params.id];
//search by id
	connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
		////do not close connection because there is more request coming in, this thread is still server other requests
	    //  connection.end();  
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	  
	   res.end( JSON.stringify(result));
	 
	 ////do not close connection because there is more request coming in, this thread is still server other requests
	 // connection.end();
	});
  
}) 

/***************************************************************
RESTful API, action GET to retrieve a task by due Date

param @due_date : (mandatory) type date, the record due date of the task. e.g.: 2022-03-29

invoked by:
curl http://your_server/task/due_date/@due_date

invoking sample: 
curl http://111.231.31.105/task/due_date/2022-03-29

output: 
    All matching data in array JSON format.

*****************************************************************/ 

app.get('/task/due_date/:due_date',  function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("received request for " + pathname );
  	console.log("About to get for " + req.params.due_date);
	
	var  sql = 'SELECT * FROM tasks where due_date=?';
	var  addSqlParams = [req.params.due_date];
//search by id
	connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
		////do not close connection because there is more request coming in, this thread is still server other requests
	    //  connection.end();  
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	  
	   res.end( JSON.stringify(result));
	 
	 ////do not close connection because there is more request coming in, this thread is still server other requests
	 // connection.end();
	});
  
}) 

/***************************************************************
RESTful API, action post to add new task data

param @title : (mandatory)type string, the title of the task
param @due_date : (mandatory)type string, the due date of the task due. e.g. 2022-05-06

invoked by:
curl -X POST -d "title=@title&due_date=@due_date" http://your_server/task

called by sample:
curl -X POST -d "title=This is an inital task of day.&due_date=2022-5-19" http://111.231.31.105/task

output: 
      Message of result.
*****************************************************************/ 

app.post('/task', function (req, res) {
  var pathname = url.parse(req.url).pathname;
    console.log("received post request for " + pathname + JSON.stringify(req.body) );
	//check if mandatory fields are valid
	if(typeof(req.body.title)=='undefined'){
		msg="input title invalid, please check title";
		console.log(msg);
	    res.end( msg);
		return;
	}
	
	if(typeof(req.body.due_date)=='undefined'){
		msg="input due_date invalid, please check title";
		console.log(msg);
	    res.end( msg);
		return;
	}
	
  	console.log("About to add new for " + req.body.title);
	var  sql = 'insert into tasks (title,due_date) values (?,?)';
	var  addSqlParams = [req.body.title,req.body.due_date];
    
	connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[Insert ERROR] - ',err.message);
		////do not close connection because there is more request coming in, this thread is still server other requests
	    //  connection.end();  
          return;
        }
	   
       console.log('-------------------------Inserted----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   writeLog(result.insertId, "Create","default User",req.body.title);
	   res.end( JSON.stringify("Successfully created record with id "+result.insertId));
	   
	 ////do not close connection because there is more request coming in, this thread is still server other requests
	 // connection.end();
	})
})

/***************************************************************
RESTful API, action put to modify an existing task data

param @title : (mandatory)type string, the title of the task
param @due_date : (mandatory)type string, the due date of the task due. e.g. 2022-05-06
param @id : (mandatory)type integer, the id of the task. Must be an existing task id

invoked by:
curl -X PUT -d "title=@title&due_date=@due_date&id=@id" http://your_server/task

called by sample: 
curl -X PUT -d "title=This is an initial task of day.&due_date=2022-5-19&id=6" http://111.231.31.105/task
*****************************************************************/ 

app.put('/task', function (req, res) {
  var pathname = url.parse(req.url).pathname;
    console.log("received put request for " + pathname + JSON.stringify(req.body) );
	//check if mandatory fields are valid
	if(typeof(req.body.id)=='undefined'){
		msg="input id invalid, please check id";
		console.log(msg);
	    res.end( msg);
		return;
	}
	
	if(typeof(req.body.title)=='undefined'){
		msg="input title invalid, please check title";
		console.log(msg);
	    res.end( msg);
		return;
	}
	
	if(typeof(req.body.due_date)=='undefined'){
		msg="input due_date invalid, please check title";
		console.log(msg);
	    res.end( msg);
		return;
	}
	
  	console.log("About to update data for id " + req.body.id);
	var  sql = 'update tasks set title=? , due_date=? where id=?';
	var  addSqlParams = [req.body.title,req.body.due_date,req.body.id];
    
	connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[UPDATE ERROR] - ',err.message);
		////do not close connection because there is more request coming in, this thread is still server other requests
	    //  connection.end();  
          return;
        }
 
       console.log('-------------------------UPDATED----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   var returnMsg="Not found such record for id "+req.body.id;
	   if (result.affectedRows >0 ){
		   writeLog(req.body.id, "Modify","default User",req.body.title);
	       returnMsg="Successfully modify record with id "+req.body.id
	   }
	   res.end( JSON.stringify(returnMsg));
	 
	 ////do not close connection because there is more request coming in, this thread is still server other requests
	 // connection.end();
	})
})

/***********************************************************
RESTful API, action DELETE to delete a task by id

param @id : (mandatory)type integer, the id of the task. Must be an existing task id

invoked by:
curl -X DELETE http://your_server/task/@id

called by sample: 
curl -X DELETE http://111.231.31.105/task/1
*************************************************************/ 

app.delete('/task/:id',  function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("received delete request for " + pathname );
  	console.log("About to delete for " + req.params.id);
	
	var  sql = 'delete FROM tasks where id=?';
	var  addSqlParams = [req.params.id];
//search by id
	connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
		////do not close connection because there is more request coming in, this thread is still server other requests
	    //  connection.end();  
          return;
        }
 
       console.log('-------------------------Deleted----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   var returnMsg="Not found such record for id "+req.params.id;
	   if (result.affectedRows>0 ){
		   writeLog(req.params.id, "Delete","default User");
	       returnMsg="Successfully deleted record with id "+req.params.id;
	   }
	   res.end( JSON.stringify(returnMsg));
	 
	 ////do not close connection because there is more request coming in, this thread is still server other requests
	 // connection.end();
	});
  

})

// function to write operation log, remark is the after image of title
function writeLog(taskId,operationType,operator,remark) {
	console.log("Write Log for operation ["+ operationType + "] on id " + taskId);
	var  sql = 'insert into operate_log (task_id ,operate_type,operator,remark) values (?,?,?,?)';
	var  addSqlParams = [taskId,operationType,operator,remark];
    
	connection.query(sql,addSqlParams,function (err, result) {
        if(err){
          console.log('[Insert LOG ERROR] - ',err.message);
          return;
        }
	})
	
}


/***********************************************************
API, stop server ,Graceful shutdown, close db connections

invoked by:
curl http://your_server/shutdown

called by sample: 
curl http://111.231.31.105/shutdown

*************************************************************/ 
 
app.get('/shutdown', function (req, res) {
  
  console.log("About to close db connection before exit"  );
  connection.end();
  console.log( "Graceful shutdown, Bye" );
  res.end( "Graceful shutdown, Bye");
  process.exit(0);  
})

var server = app.listen(80, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("RESTful API Server Started" )

})