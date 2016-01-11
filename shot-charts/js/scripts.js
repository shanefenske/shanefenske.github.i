$(document).ready(function() {   
    var data;
    var players;
    var color = ['red','green']
    var teams = {
        'Atlanta Hawks': 1610612737,
        'Boston Celtics': 1610612738,
        'Brooklyn Nets': 1610612751,
        'Charlotte Hornets': 1610612766,
        'Chicago Bulls': 1610612741,
        'Cleveland Cavaliers': 1610612739,
        'Dallas Mavericks': 1610612742,
        'Denver Nuggets': 1610612743,
        'Detroit Pistons': 1610612765,
        'Golden State Warriors': 1610612744,
        'Houston Rockets': 1610612745,
        'Indiana Pacers': 1610612754,
        'LA Clippers': 1610612746,
        'LA Lakers': 1610612747,
        'Memphis Grizzlies': 1610612763,
        'Miami Heat': 1610612748,
        'Milwaukee Bucks': 1610612749,
        'Minnesota Timberwolves': 1610612750,
        'New Orleans Pelicans': 1610612740,
        'New York Knicks':1610612752,
        'Oklahoma City Thunder': 1610612760,
        'Orlando Magic': 1610612753,
        'Philadelphia 76ers': 1610612755,
        'Phoenix Suns': 1610612756,
        'Portland Trail Blazers': 1610612757,
        'Sacramento Kings': 1610612758,
        'San Antonio Spurs': 1610612759,
        'Toronto Raptors': 1610612761,
        'Utah Jazz': 1610612762,
        'Washington Wizards': 1610612764
    };

    loadPlayers();

    $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
    });

    function loadPlayers() {
        var team = teams[$('#teams option:selected').text()];
            
        $.ajax({
            url: 'http://stats.nba.com/stats/commonteamroster?&Season=2014-15&TeamID=' + team,
            jsonp: "callback",
            dataType: "jsonp",

            // Work with the response
            success: function( response ) {
                players = response['resultSets'][0]['rowSet'];
                // remove old set of players 
                $('#players').empty();
                for (index = 0, len = players.length; index < len; ++index) {
                    // console.log(players[index]);
                    $('#players').append('<option value="foo">'+players[index][3]+'</option>');
                }
            }
        });
    }

    $( '#teams').change(function() {
        loadPlayers();
    }); 

    (function ($) {
        $('button').on('click', function () {        
            var index = $("#players")[0].selectedIndex;
            var player = players[index];
            var id = player[12];
            console.log(id)
              


            var shotURL = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR' +
                            'AMS=2014-15&ContextFilter=&ContextMeasure=FGA&DateFrom=&D' +
                            'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca' +
                            'tion=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&' +
                            'PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID='+id+'&Plu' +
                            'sMinus=N&Position=&Rank=N&RookieYear=&Season=2014-15&Seas' +
                            'onSegment=&SeasonType=Regular+Season&TeamID=0&VsConferenc' +
                            'e=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh' +
                            'owZones=0'
            $.ajax({
                url: shotURL,
                jsonp: "callback",
                dataType: "jsonp",
                success: function( response ) {
                  console.log(response['resultSets'][0]['rowSet']); // ['rowSet']
                  data = response['resultSets'][0]['rowSet'];
                  console.log(data); 
                  refreshGraph();
                }
            });                

        });
    }(jQuery)); 
                   
    var x = d3.time.scale()
      .range([10, 280])
    var y = d3.scale.linear()
      .range([180, 10])
    


    var max = { x: 600, y: 550};
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

    var refreshGraph = function() {
    d3.selectAll('circle').remove();
      var circles = svg.selectAll("circle").data(data)
      circles.enter()
      .append("svg:circle")
      .attr("r", 4)
      .attr("cx", function(d) { return d[17] })
      .attr("cy", function(d) { return d[18] })
      .style("fill", function(d) { return color[d[20]];})
      .on("click", function(d) {
                d3.select("#shotinfo").text("Shooter: " + d[4] + "\nShot Type: " + d[11] + 
                     "\nQuarter: " + d[7] + " Time: " + d[8] + ":" + d[9] +
                      "\nShot Distance: " + d[16] + " feet\nShot Made:" + d[20])
                $("#vid").remove();
                $("#sideInfo").append("<a href=\"#\" id=\"vid\">View Shot</a>");

                $('#vid').on('click', function () {
                    $.featherlight({iframe: 'http://stats.nba.com/cvp.html?GameID='+ d[1] + '&GameEventID=' + d[2] + '#',  iframeWidth: 850,
                    iframeHeight: 360});          
    }); 
      })

      circles.exit()
      .remove()
    }

    // refreshGraph()

});
