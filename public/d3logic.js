console.log('hello from d3 js file');
// var data = require('data.json');
var memdata = {Active:{size:10}};
var data = [{"label":"Active", "value":0},
              {"label":"Free", "value":0}];
setInterval(function(){
		$.get("/memtest",function(data){
	memdata = JSON.parse(data);
        console.log(memdata);
        var total = Number(memdata.MemTotal.size);
        var active = Number(memdata.Active.size);
        var inactive = Number(memdata.Inactive.size);
        var cached = Number(memdata.Cached.size);
        var available = Number(memdata.MemAvailable.size);
        var free = Number(memdata.MemFree.size);
        console.log('total',total,'remainig',active+available);
        var activepercentage = (active/total)*100;
        var availablepercentage = (available/total)*100;
        var freepercentage = (free/total)*100;
        console.log('percentages',activepercentage,availablepercentage);
        data[0].value = activepercentage;
        data[1].value = freepercentage;

    });
	//console.log('getDAta',JSON.parse(data))});
//console.log(data);
},1000);

console.log('data',memdata,memdata.Active.size,d3);
// var divs = d3.select('#enter .right')
// .selectAll('div.item')
// .data([memdata.Active.size]);
// divs.enter()
// .append('div').classed('item',true);
// divs.style({
// 	width:'20px',
// 	height:'40px',
// 	margin: '10px',
// 	float:'left',
// 	'background-color': '#25b0b0'
// })
var w = 400;
var h = 400;
var r = h/2;
var color = d3.scale.category20c();




var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){
        return color(i);
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
    });

// add the text
arcs.append("svg:text").attr("transform", function(d){
      d.innerRadius = 0;
      d.outerRadius = r;
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
    return data[i].label;}
    );