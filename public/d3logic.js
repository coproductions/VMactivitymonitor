console.log('hello from d3 js file');
// var data = require('data.json');
var memdata;
var cpudata;
var memValues = [{"label":"Active", "value":20},
              {"label":"Inactive", "value":50},
              {"label":"Free","value":10}];
setInterval(function(){

		$.get("/memtest",function(data){
      	memdata = JSON.parse(data);
        // console.log(memdata);
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

        memValues[0].value = active100;
        memValues[1].value = inactive100;
        memValues[2].value = free100;

    });
	//console.log('getDAta',JSON.parse(data))});
//console.log(data);

  // $.get("/cpuinfo",function(data){
  //   var sliced = data.slice(2,-2);
  //   // cpudata = JSON.parse(sliced);
  //   console.log('cpudata',data,sliced);
  // });
},1000);

var divs = d3.select('#enter .right')
  .selectAll('div.item')
  .data(memValues);
divs.enter()
  .append('div').classed('item',true);
divs.style({
	width:function(d){return d.value+'%';},
	height:'100%',
	margin: '0px',
	float:'left',
	'background-color': function(d){
    switch(d.label){
      case 'Active':
        return 'red';
      case 'Inactive':
        return 'blue';
      case 'Free':
        return 'green';
      default:
        return 'black';
    }
  }
})


setInterval(function(){
  divs = d3.select('#enter .right')
    .selectAll('div.item')
    .data(memValues);
  // divs.transition().delay(0).duration(500)
    divs.style({
       width:function(d){return d.value+'%';}
  })
  .text(function(d,i){return d.label+' '+d.value.toFixed(2)+'%';})
},1000)

// chart.js implementation

var ctx = $("#myChart").get(0).getContext("2d");

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,
        // Function - Will fire on animation progression.
    onAnimationProgress: function(){
      console.log('animation progress')
    },

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){
      console.log('animation complete')
    }
  };

var memPieData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
];

setInterval(function(){

  memPieData = [
      {
          value: memValues[0].value,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Red",
           labelColor : 'white',
                    labelFontSize : '16'
      },
      {
          value: memValues[1].value,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green",
           labelColor : 'white',
                    labelFontSize : '16'
      },
      {
          value: memValues[2].value,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow",
           labelColor : 'white',
                    labelFontSize : '16'
      }
  ];
  myPieChart.update();
},1000)

var options = {};

var myPieChart = new Chart(ctx).Pie(memPieData,options);
