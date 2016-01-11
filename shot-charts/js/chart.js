var format = d3.time.format("%a %b %d %Y")
var amountFn = function(d) { return d.amount }
var dateFn = function(d) { return format.parse(d.created_at) }

JSONData = [
  { "id": 3, "created_at": "Sun May 05 2013", "amount": 12000},
  { "id": 1, "created_at": "Mon May 13 2013", "amount": 2000},
  { "id": 2, "created_at": "Thu Jun 06 2013", "amount": 17000},
  { "id": 4, "created_at": "Thu May 09 2013", "amount": 15000},
  { "id": 5, "created_at": "Mon Jul 01 2013", "amount": 16000}
]
var playerID = 201935;
var shotURL = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR' +
                'AMS=2014-15&ContextFilter=&ContextMeasure=FGA&DateFrom=&D' +
                'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca' +
                'tion=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&' +
                'PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID='+playerID+'&Plu' +
                'sMinus=N&Position=&Rank=N&RookieYear=&Season=2014-15&Seas' +
                'onSegment=&SeasonType=Regular+Season&TeamID=0&VsConferenc' +
                'e=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh' +
                'owZones=0'

$.ajax({
    url: shotURL,
    jsonp: "callback",
    dataType: "jsonp",
    success: function( response ) {
      console.log(response['resultSets'][0]['rowSet']);
    }
});
    var max = { x: 600, y: 550};

   var data = JSONData.slice()
   var x = d3.time.scale()
    .range([10, 280])
  var y = d3.scale.linear()
    .range([180, 10])
  var svg = d3.select("#chart").append("svg:svg")
   .attr("width", max.x)
   .attr("height", max.y)


var courtUrl = "court.jpg";
svg.append("defs")
    .append("pattern")
    .attr("id", "bg")
    .attr('patternUnits', 'userSpaceOnUse')
    .attr("width", max.x)
    .attr("height", max.y)
    .append("image")
    .attr("xlink:href", courtUrl)
    .attr("width", max.x)
    .attr("height", max.y);

svg.append("rect")
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", max.x)
    .attr("height", max.y)
    .attr("fill", "url(#bg)");

  var start = d3.min(data, dateFn)
  var end = d3.max(data, dateFn)

  var refreshGraph = function() {

    x.domain(d3.extent(data, dateFn))
    y.domain(d3.extent(data, amountFn))

    var circles = svg.selectAll("circle").data(data, dateFn)

    circles.enter()
     .append("svg:circle")
     .attr("r", 4)
     .attr("cx", function(d) { return x(dateFn(d)) })
     .attr("cy", function(d) { return y(amountFn(d)) })
     .on("click", function(d) {
        console.log("Date: " + d.created_at + " amount: " + d.amount);
        d3.select("#chart .value").text("Date: " + d.created_at + " amount: " + d.amount)
     })
   
    circles.exit()
     .remove()
  }



  refreshGraph()
  

