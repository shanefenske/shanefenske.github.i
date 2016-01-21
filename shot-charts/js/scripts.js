$(document).ready(function() {   
    var data;
    var players;
    var index;
    var player;
    var id;
    var shotURL;
    var color = ['#FF4136','#2ECC40']
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

    loadPlayers(true);



    $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');
    });

    function loadPlayers(first) {
        var team = teams[$('#teams option:selected').text()];

        $.ajax({
            url: 'http://stats.nba.com/stats/commonteamroster?&Season=2015-16&TeamID=' + team,
            jsonp: "callback",
            dataType: "jsonp",

            // Work with the response
            success: function( response ) {
                players = response['resultSets'][0]['rowSet'];
                // remove old set of players 
                $('#players').empty();
                for (index = 0, len = players.length; index < len; ++index) {
                    // console.log(players[index]);
                    $('#players').append('<option value='+ index + '>'+players[index][3]+'</option>');
                }

                if(first) {
                    joeJohnsonIndex = 3
                    JoeJohnsonid = 2207;
                    player = players[joeJohnsonIndex];
                    loadVisual(joeJohnsonIndex,JoeJohnsonid)
                }
            }
        });
}

$( '#teams').change(function() {
    loadPlayers();
}); 



function loadVisual(index,id,_callback) {
    $("#players ").val(index);
    var season = $("#year option:selected").text();
    var locationText = $("#location option:selected").text();
    if("Home and Road Games" == locationText) {
        var location = "";
    }
    else {
        var location = locationText.substring(0, 4);
    } 

    var periodText = $("#period option:selected").text();
    if("All Periods" == periodText) {
        var period = 0;
    }
    else {
        var period = periodText.substring(0, 1);
    }

    var conferenceText = $("#conference option:selected").text();
    if("vs. East and vs. West" == conferenceText) {
        var conference = "";
    }
    else {
        var conference = $("#conference option:selected").val();
    }
    

    var outcome = $("#outcome option:selected").val();      

    // TODO: just realized all of the previous code should be done like this
    var seasontype = $("#seasontype option:selected").val();
    
    var month = $("#month option:selected").val();


    shotURL = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR' +
    'AMS='+season+'&ContextFilter=&ContextMeasure=FGA&DateFrom=&D' +
    'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca' +
    'tion='+location+'&MeasureType=Base&Month='+month+'&OpponentTeamID=0&Outcome='+outcome +'&' +
    'PaceAdjust=N&PerMode=PerGame&period='+period+'&PlayerID='+id+'&Plu' +
    'sMinus=N&Position=&Rank=N&RookieYear=&Season='+season+'&Seas' +
    'onSegment=&SeasonType='+seasontype+'&TeamID=0&VsConferenc' +
    'e='+conference+'&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh' +
    'owZones=0';
    console.log(shotURL);
    $("#headPic").remove();
    $("#basicInfo").remove();
    $("#sideInfo").append("<img id=\"headPic\" src=\"http://stats.nba.com/media/players/230x185/" + id + ".png \" >");
    $("#sideInfo").append("<p id=\"basicInfo\">" + player[3] + "<br/>#" + player[4] + " | " +  player[5] + 
       " | "  + player[6] + " | " + player[7] + "lbs" + " | " +
       player[11] + "<br/>" + "Born: " + player[8] + " (" + player[9] + " years old)<br/>" + 
       "Experience: " + player[10] + " years </p>");
    refreshGraph(); 

}



(function ($) {
    $('button').on('click', function () {  
        $(".tooltip").remove();   
        index = $("#players")[0].selectedIndex;
        console.log("selected player" + index)
        player = players[index];
        id = player[12];
        loadVisual(index,id);

    });
}(jQuery)); 

var x = d3.time.scale()
.range([10, 280])
var y = d3.scale.linear()
.range([180, 10])



var max = { x: 780, y: 650};
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
    $.ajax({
        url: shotURL,
        jsonp: "callback",
        dataType: "jsonp",
        success: function( response ) {
            data = response['resultSets'][0]['rowSet'];
            console.log(data);
            // refreshGraph();

        //found correct range by hand..varies with svg
        var xScale = d3.scale.linear()
            .domain([-250, 250])
            .range([42, 738]);
        var yScale = d3.scale.linear()
            .domain([-1,0, -150])
            .range([590,589, 371]);

        var xValue = function(d) { 
            return xScale(-d[17]);}
        var yValue = function(d) { 
            return (d[16] > 45 ? 0 : yScale(-d[18]));}

        d3.selectAll('circle').remove();
        var circles = svg.selectAll("circle").data(data)
        circles.enter()
        .append("svg:circle")
        .attr("r", 4)
        .attr("cx", function(d) { return  xValue(d);})
        .attr("cy", function(d) { return yValue(d);})
        .style("fill", function(d) { return color[d[20]];})
        .on("mouseout", function(d) {
            d3.select(this).style("opacity", 1);
        })
        .on("mouseover", function(d) {
                    $(".tooltip").remove();
            // add the tooltip area to the webpage
            var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

            d3.select(this).style("opacity", 0.5);

            $("#vid").remove();
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);

            tooltip.html((d[20] ? "Made " : "Missed ") + d[11] +  "<br/>" + 
                "Quarter: " + d[7] + " Time: " + d[8] + ":" + (d[9] < 10 ? "0" : "") + d[9] +  "<br/>" + 
                "Shot Distance: " + d[16] + " feet"  + "<br/>" +  
                "<a href=\"#\" id=\"vid\">View Shot</a>")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
            $('#vid').on('click', function () {
                $.featherlight({iframe: 'http://stats.nba.com/cvp.html?GameID='+ d[1] + '&GameEventID=' + d[2] + '#',  iframeWidth: 850,
                    iframeHeight: 360});          
            }); 
        });


circles.exit();
        }
    }); 
}

});
