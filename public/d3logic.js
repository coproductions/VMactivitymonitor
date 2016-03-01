console.log('hello from d3 js file');
// var data = require('data.json');
var memdata = {Active:{size:10}};
setInterval(function(){
		$.get("/memtest",function(data){
	memdata = JSON.parse(data);
        console.log(memdata);
});
	//console.log('getDAta',JSON.parse(data))});
//console.log(data);
},1000);

console.log('data',memdata,memdata.Active.size,d3);
var divs = d3.select('#enter .right')
.selectAll('div.item')
.data([memdata.Active.size]);
divs.enter()
.append('div').classed('item',true);
divs.style({
	width:'20px',
	height:'40px',
	margin: '10px',
	float:'left',
	'background-color': '#25b0b0'
})
