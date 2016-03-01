console.log('hello from d3 js file');
// var data = require('data.json');
var memdata = {Active:{size:10}};
var myData = [{"label":"Active", "value":20},
              {"label":"Inactive", "value":50}];
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
        // console.log('total',total,'remainig',active+available);
        var active100 = (active/total)*100;
        var available100 = (available/total)*100;
        var free100 = (free/total)*100;
        var inactive100 = (inactive/total)*100;

        console.log('100s',active100,inactive100);
        myData[0].value = active100;
        myData[1].value = inactive100;

    });
	//console.log('getDAta',JSON.parse(data))});
//console.log(data);
},1000);

var divs = d3.select('#enter .right')
  .selectAll('div.item')
  .data(myData);
divs.enter()
  .append('div').classed('item',true);
divs.style({
	width:function(d){return d.value +'%';},
	height:'100%',
	margin: '0px',
	float:'left',
	'background-color': function(d){
    switch(d.label){
      case 'Active':
        return 'red';
      case 'Inactive':
        return 'blue';
      default:
        return 'black';
    }
  }
});

divs = d3.select('#enter .right')
  .selectAll('div.item')
  .data(myData);
divs.transition().delay(50).duration(950)
  .style({
      width:function(d){return d.value +'%';}

  })






// var w = 400;
// var h = 400;
// var r = h/2;
// var color = d3.scale.category20c();



// var vis = d3.select('#chart').append("svg:svg").data([myData]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
// var pie = d3.layout.pie().value(function(d){return d.value;});

// // declare an arc generator function
// var arc = d3.svg.arc().outerRadius(r);

// // select paths, use arc generator to draw
// var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
// arcs.append("svg:path")
//     .attr("fill", function(d, i){
//         return color(i);
//     })
//     .attr("d", function (d) {
//         // log the result of the arc generator to show how cool it is :)
//         console.log(arc(d));
//         return arc(d);
//     });

// // add the text
// arcs.append("svg:text").attr("transform", function(d){
//       d.innerRadius = 0;
//       d.outerRadius = r;
//     return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
//     return myData[i].label;}
//     );

// vis.selectAll("g.slice").data(pie).transition().delay(500).duration(500).append("svg:g").attr("class", "slice")
// .append("svg:path")
//     .attr("fill", function(d, i){
//         return color(i);
//     })
//     .attr("d", function (d) {
//         // log the result of the arc generator to show how cool it is :)
//         console.log(arc(d));
//         return arc(d);
//     });



