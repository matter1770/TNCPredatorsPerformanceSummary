const tournaments= ['ESL One Hamburg 2018 powered by Intel','Asia Pro League','The Kuala Lumpur Major',
'ESL One Katowice 2019 powered by Intel','World Electronic Sport Games Southeast Asia','The Chongqing Major',
'DreamLeague Season 11','World Electronic Sports Games 2018-2019',
'MDL Disneyland® Paris Major','AMD SAPPHIRE DOTA PIT Minor 2019','ESL One Mumbai 2019 powered by Intel',
'ESL One Birmingham 2019 powered by Intel','EPICENTER Major 2019','The International 2019','ESL One Hamburg 2019 powered by Intel',
'MDL Chengdu Major','DreamLeague Season 13']

const JSONFileName = '/data.json';


['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
    document.getElementById('wrapper').addEventListener(
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



stackedchart = new Highcharts.chart('container', {
    chart: {
        renderTo: 'stack',
        type: 'bar',
        backgroundColor: 'transparent',
    },
    title: {
      text: 'Time to take objectives'
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
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Tower 1',
      data: []
    }, {
      name: 'Tower 2',
      data: []
    }, {
      name: 'Tower 3',
      data: []
    },{
        name: 'Barracks',
        data: []
    }]
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
}


function renderStackedChart(nodeId) {
    dataset = timer[nodeId]
    keys = Object.keys(dataset)

    for(i= 0; i < keys.length; i++){
        stackedchart.series[i].setData([dataset[keys[i]]]);

    }
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
