var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var PORT = 8080;
var fs = require('fs');
var exec = require('child_process').exec;
app.use(express.static(__dirname+'/public'));
app.get('/',function(req,res){
  	//	exec(path.join(__dirname+'/testscript.sh'));
  //	bash("~/taskviewer/testscript.sh");
  		res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/memtest',function(req,res){

  exec(path.join(__dirname+'/testscript.sh'));
  fs.readFile(path.join(__dirname+'/public/data.json'),function(err,data){
    res.send(data)
  });
  //res.sendFile(path.join(__dirname+'/public/data.json'));
});

app.get('/cpuinfo',function(req,res){

  exec(path.join(__dirname+'/cpuinfoscript.sh'));
  fs.readFile(path.join(__dirname+'/public/cpuinfo.json'),function(err,data){
    res.send(data)
  });
  //res.sendFile(path.join(__dirname+'/public/data.json'));
});


app.listen(PORT, function(){
 console.log('app listening on port ',PORT);
});



