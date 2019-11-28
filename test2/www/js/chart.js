var dps = [];   //dataPoints. 
var chart;
var startTime;
var accelerometerOptions = { frequency: 2000 };  // Update every 2 seconds
var accelerationX;
var accelerationY;
var accelerationZ;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
	//store start time in unixtime 
	startTime = Date.now();
	
	//setup chart
    chart = new CanvasJS.Chart("chartContainer",{
      	title :{
      		text: "A random chart"
      	},
      	axisX: {						
      		title: "Random Values"
      	},
      	axisY: {						
      		title: "Time (seconds)"
      	},
      	data: [{
      		type: "line",
      		dataPoints : dps
      	}]
   	});
	
	//start watching sensor
	watchSensor()
}

function watchSensor() {
	var watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
}

function accelerometerSuccess(acceleration) {
	
	accelerationX = acceleration.x;
	accelerationY = acceleration.y;
	accelerationZ = acceleration.z;
	updateChart();
}

function accelerometerError() {
   alert('Error');
}

function updateChart() {
		
		//x value is time since start 
		xVal = Date.now() - startTime;
		//concert from milliseocnds to seconds (divide by a thousand)
		xVal = xVal / 1000;
      	
		//add X acceleration to the data points to draw
		dps.push({x: xVal,y: accelerationX});

		//add Y acceleration to the data points to draw
		//dps.push({x: xVal,y: accelerationY});

		//add Z acceleration to the data points to draw
		//dps.push({x: xVal,y: accelerationZ});		
      	
		//don't let the chart get too big 
		//if there are more than 100 data points then start removing older data points
      	if (dps.length >  100 )
      	{
      		dps.shift();				
      	}

		//redraw the chart
      	chart.render();		
	  }
