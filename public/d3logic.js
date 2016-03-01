console.log('hello from d3 js file');
// var data = require('data.json');
var memdata;
setInterval(function(){
	$.get("/memtest",function(data){
	memdata = JSON.parse(data);
        console.log(memdata);
});
	//console.log('getDAta',JSON.parse(data))});
//console.log(data);
},1000);
