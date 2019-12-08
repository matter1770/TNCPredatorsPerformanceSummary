const tournaments= ['ESL One Hamburg 2018 powered by Intel','Asia Pro League','The Kuala Lumpur Major',
'ESL One Katowice 2019 powered by Intel','World Electronic Sport Games Southeast Asia','The Chongqing Major',
'DreamLeague Season 11','World Electronic Sports Games 2018-2019',
'MDL Disneyland® Paris Major','AMD SAPPHIRE DOTA PIT Minor 2019','ESL One Mumbai 2019 powered by Intel',
'ESL One Birmingham 2019 powered by Intel','EPICENTER Major 2019','The International 2019','ESL One Hamburg 2019 powered by Intel',
'MDL Chengdu Major','DreamLeague Season 13']

const JSONFileName = '/data.json';


['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
    document.getElementById('line').addEventListener(
        eventType,
        function (e) {
            var chart,
                point,
                i,
                event;
            for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                
                chart = Highcharts.charts[i];
                // Find coordinates within the chart
                event = chart.pointer.normalize(e);
                // Get the hovered point
                point = chart.series[0].searchPoint(event, true);

                if (point) {
                    point.highlight(e);
                }
            }
        }
    );
});





Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};


Highcharts.Point.prototype.highlight = function (event) {
    event = this.series.chart.pointer.normalize(event);
    this.onMouseOver();
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};


function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(
                        e.min,
                        e.max,
                        undefined,
                        false,
                        { trigger: 'syncExtremes' }
                    );
                }
            }
        });
    }
}




var popchart = AmCharts.makeChart("popchart", {
    "type": "serial",
    "rotate": true,
    "marginBottom": 50,
    "dataProvider": [],
    "startDuration": 1,
    "graphs": [{
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "tnc",
      "title": "TNC",
      "lineColor": "#4f81bc",
      "clustered": false,
      "labelText": "[[value]]",
      "labelFunction": function(item) {
        return Math.abs(item.values.value);
      },
      "balloonFunction": function(item) {
        return  "TNC: " + Math.abs(item.values.value);
      }
    }, {
      "fillAlphas": 0.8,
      "lineAlpha": 0.2,
      "type": "column",
      "valueField": "other",
      "title": "Other",
      "lineColor": "#c0504e",
      "clustered": false,
      "labelText": "[[value]]",
      "labelFunction": function(item) {
        return Math.abs(item.values.value);
      },
      "balloonFunction": function(item) {
        return item.category + ": " + Math.abs(item.values.value) ;
      }
    }],
    "categoryField": "team",
    "categoryAxis": {
      "gridPosition": "start",
      "gridAlpha": 0.2,
      "axisAlpha": 0
    },
    "valueAxes": [{
      "gridAlpha": 0,
      "ignoreAxisWidth": true,
      "labelFunction": function(value) {
        return Math.abs(value);
      },
      "guides": [{
        "value": 0,
        "lineAlpha": 0.2
      }]
    }],
    "allLabels": [{
      "text": "TNC",
      "x": "28%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }, {
      "text": "Other",
      "x": "75%",
      "y": "97%",
      "bold": true,
      "align": "middle"
    }]
  
  });
  
  



stackedchart = new Highcharts.chart({
    chart: {
        renderTo: 'stack',
        type: 'bar',
        backgroundColor: 'transparent',
    },
    title: {
      text: 'Time to take objectives'
    },
    xAxis:{
        visible : false,
        crosshair : false
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Point in game'
      }
    },
    legend: {
      reversed: true
    },
    tooltip:{
        enabled : false

    },
    plotOptions: {
      series: {
        stacking: 'normal',
        states: {
            hover: {
                enabled: false
                }
            }
        }
    },
    series: [{
      name: 'Barracks',
      data: []
    }, {
      name: 'Tower 3',
      data: []
    }, {
      name: 'Tower 2',
      data: []
    },{
        name: 'Tower 1',
        data: []
    }],
    exporting: {
        buttons: {
            contextButton: {
                enabled: false
            }    
        }
    }
  });

var ctx1 = document.getElementById('radar1').getContext('2d');
var ctx2 = document.getElementById('radar2').getContext('2d');
var ctx3 = document.getElementById('radar3').getContext('2d');
var ctx4 = document.getElementById('radar4').getContext('2d');
var ctx5 = document.getElementById('radar5').getContext('2d');
var radarChart1 = new Chart(ctx1, {
    type: 'radar',
    data: {
        labels: ["Gold Per Minute", "XP Per Minute", "Last Hits Per Minute", "Kills Per Minute", "Deaths Per Minute", "Assists Per Minute"],
        datasets: [{
          label: "Temp",
          fill: false,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: [0, 1, 2, 3, 4, 5]
        }]
    },
    options: {
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }
        }
    }
});
var radarChart2 = new Chart(ctx2, {
    type: 'radar',
    data: {
        labels: ["Gold Per Minute", "XP Per Minute", "Last Hits Per Minute", "Kills Per Minute", "Deaths Per Minute", "Assists Per Minute"],
        datasets: [{
          label: "Temp",
          fill: false,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: [0, 1, 2, 3, 4, 5]
        }]
    },
    options: {
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }
        }
    }
});
var radarChart3 = new Chart(ctx3, {
    type: 'radar',
    data: {
        labels: ["Gold Per Minute", "XP Per Minute", "Last Hits Per Minute", "Kills Per Minute", "Deaths Per Minute", "Assists Per Minute"],
        datasets: [{
          label: "Temp",
          fill: false,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: [0, 1, 2, 3, 4, 5]
        }]
    },
    options: {
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }
        }
    }
});
var radarChart4 = new Chart(ctx4, {
    type: 'radar',
    data: {
        labels: ["Gold Per Minute", "XP Per Minute", "Last Hits Per Minute", "Kills Per Minute", "Deaths Per Minute", "Assists Per Minute"],
        datasets: [{
          label: "Temp",
          fill: false,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: [0, 1, 2, 3, 4, 5]
        }]
    },
    options: {
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }
        }
    }
});
var radarChart5 = new Chart(ctx5, {
    type: 'radar',
    data: {
        labels: ["Gold Per Minute", "XP Per Minute", "Last Hits Per Minute", "Kills Per Minute", "Deaths Per Minute", "Assists Per Minute"],
        datasets: [{
          label: "Temp",
          fill: false,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: [0, 1, 2, 3, 4, 5]
        }]
    },
    options: {
        tooltips: {
            enabled: true,
            callbacks: {
                label: function(tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                }
            }
        }
    }
});



Highcharts.ajax({
    url: JSONFileName,
    dataType: 'text',
    success: function (activity) {

        activity = JSON.parse(activity);

        winrate_data = []
        duration_win = []
        duration_loss = []
        kills = []
        for(i = 0; i<activity.length; i++){
            dataset = activity[i]
            winrate_data.push(dataset['winrate'])
            duration_win.push(dataset['duration_win'])
            duration_loss.push(dataset['duration_loss'])
            kills.push(dataset['kills'])
        }

        var chartDiv2 = document.createElement('div');
        chartDiv2.className = 'chart';
        document.getElementById('line').appendChild(chartDiv2);  

        let chart2 = Highcharts.chart(chartDiv2, {
            chart: {
                height: 200,
                marginLeft:48,
                spacingTop: 20,
                spacingBottom: 20,
                backgroundColor: 'transparent'
            },
            title: {
                text: 'Winrates',
                align: 'left',
                margin: 0,
                x: 30,
                style:{
                    fontFamily:"Playfair Display,Georgia,Times New Roman,Times,serif;"
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: tournaments,
                crosshair: true,
                events: {
                    setExtremes: syncExtremes
                },
                gridLineWidth : 1,
                crosshair: {
                    width: 2,
                    color: 'red'
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor : "grey",
                gridLineDashStyle: "Dash"
                
            },
            plotOptions: {
                series: {
                    lineWidth: 0,
                    point: {
                        events: {
                            mouseOver: function () {
                                var nodeId = (this.x)
                                renderStackedChart(nodeId)
                                renderRadarChart(nodeId)
                                renderPopChart(nodeId)

                            }
                        
                        }
                    }
                },
              line: {
                marker: {
                    states:{
                        hover:{
                            enabled:false
                        }
                    },
                  lineWidth: 1,
                  lineColor: '#666666'
                 }
                }
               },
            series: [{
                data: winrate_data,
                name: "Overall Winrate",
                type: "line",
                color: "red",
                fillOpacity: 0.3
            }],
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }    
                }
            }
        });


        var chartDiv3 = document.createElement('div');
        chartDiv3.className = 'chart';
        document.getElementById('line').appendChild(chartDiv3);  

        let chart3 = Highcharts.chart(chartDiv3, {
            chart: {
                height: 200,
                marginLeft:48,
                spacingTop: 20,
                spacingBottom: 20,
                backgroundColor: 'transparent'
            },
            title: {
                text: 'Game Duration (Win)',
                align: 'left',
                margin: 0,
                x: 30,
                style:{
                    fontFamily:"Playfair Display,Georgia,Times New Roman,Times,serif;"
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                labels:{
                    enabled : false
                },
                categories: tournaments,
                crosshair: true,
                gridLineWidth : 1,
                crosshair: {
                    width: 2,
                    color: 'blue'
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor : "grey",
                gridLineDashStyle: "Dash"
                
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    point: {
                        events: {
                            mouseOver: function () {
                                var nodeId = (this.x)
                                renderStackedChart(nodeId)
                                renderRadarChart(nodeId)
                                renderPopChart(nodeId)

                            }
                        
                        }   
                    }
                },
              line: {
                marker: {
                    states:{
                        hover:{
                            enabled:false
                        }
                    },
                  lineWidth: 1,
                  lineColor: '#666666'
                 }
                }
               },
            series: [
            {
                data: duration_win,
                name: "Game duration (Win)",
                type: "line",
                fillOpacity: 0.5
            }
        ],
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }    
                }
            }
        });
          var chartDiv4 = document.createElement('div');
        chartDiv4.className = 'chart';
        document.getElementById('line').appendChild(chartDiv4);  

        let chart4 = Highcharts.chart(chartDiv4, {
            chart: {
                height: 200,
                marginLeft:48,
                spacingTop: 20,
                spacingBottom: 20,
                backgroundColor: 'transparent'
            },
            title: {
                text: 'Kills Per Minute',
                align: 'left',
                margin: 0,
                x: 30,
                style:{
                    fontFamily:"Playfair Display,Georgia,Times New Roman,Times,serif;"
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                labels:{
                    enabled : false
                },
                categories: tournaments,
                crosshair: true,
                gridLineWidth : 1,
                crosshair: {
                    width: 2,
                    color: 'blue'
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor : "grey",
                gridLineDashStyle: "Dash"
                
            },
            plotOptions: {
                series: {
                    lineWidth: 1,
                    point: {
                        events: {
                            mouseOver: function () {
                                var nodeId = (this.x)
                                renderStackedChart(nodeId)
                                renderRadarChart(nodeId)
                                renderPopChart(nodeId)

                            }
                        
                        }   
                    }
                },
              line: {
                marker: {
                    states:{
                        hover:{
                            enabled:false
                        }
                    },
                  lineWidth: 1,
                  lineColor: '#666666'
                 }
                }
               },
            series: [
            {
                data: kills,
                name: "KPM",
                type: "line",
                fillOpacity: 0.5
            }
        ],
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }    
                }
            }
        });

    }
    
    });


var timer = []
var player_stats = []
var records=[]



function fetchJSONFile(filePath, callbackFunc) {
    console.debug("Fetching file:", filePath);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                console.info("Loaded file:", filePath);
                var data = JSON.parse(httpRequest.responseText);
                console.debug("Data parsed into valid JSON!");
                console.debug(data)
                if (callbackFunc) callbackFunc(data);
            } else {
                console.error("Error while fetching file", filePath, 
                    "with error:", httpRequest.statusText);
            }
        }
    };
    httpRequest.open('GET', filePath);
    httpRequest.send();
}

function onSuccessCb(jsonData) {
    var exclude = ['rooftop_solar']
    for(i = 0; i<jsonData.length; i++){
        timer.push(jsonData[i]['timer'])
        player_stats.push(jsonData[i]['player_stats'])
        records.push(jsonData[i]['records'])
    }
    renderStackedChart(0)
    renderRadarChart(0)
    renderPopChart(0)
}


function renderStackedChart(nodeId) {
    dataset = timer[nodeId]
    keys = Object.keys(dataset)

    for(i= 0; i < keys.length; i++){
        stackedchart.series[3-i].setData([dataset[keys[i]]]);

    }
  }

function renderRadarChart(nodeId) {
    dataset = player_stats[nodeId]
    keys = Object.keys(dataset)
    charts = [radarChart1,radarChart2,radarChart3,radarChart4,radarChart5]
    for(i= 0; i < charts.length; i++){
        stats = dataset[keys[i]]
        stats_keys = Object.keys(stats)
        for(j=0;j<stats_keys.length;j++){
            charts[i].data.datasets[0].data[j] = stats[stats_keys[j]]
            charts[i].data.datasets[0].label = keys[i]
            charts[i].update();
        }   
    }
  }

function renderPopChart(nodeId) {
    record = records[nodeId]
    newData = []
    for(i=0;i < Object.keys(record).length;i++){
        key = Object.keys(record)[i]
        rec = record[key]
        name = key
        tnc = -rec[0]
        other = rec[1]
        newData.push({"team":name,"tnc":tnc,"other":other})
    }
    popchart.dataProvider = newData;
    popchart.validateData();
}

   

function onMouseoverChart(e) {
    if (e['target'] === 'node') {
        var nodeSplit = e['targetid'].split('-');
        var nodeId = nodeSplit[nodeSplit.length - 1];
        if (Number.isInteger(parseInt(nodeId)) && parseInt(nodeId) < timer.length) {
        renderStackedChart(parseInt(nodeId));
        }
    } 
}



fetchJSONFile(JSONFileName,onSuccessCb)
