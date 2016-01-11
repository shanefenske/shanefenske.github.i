$(document).ready(function() {

    
    $('#vid').on('click', function () {
        $.featherlight({iframe: 'http://stats.nba.com/cvp.html?GameID=0021500550&GameEventID=14#',  iframeWidth: 850,
        iframeHeight: 360});
          
    });

    var players;
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
            // remove d3

            // add spinner to indicate something is happening
            // $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
            var index = $("#players")[0].selectedIndex;
            var player = players[index];
            var id = player[12];
            console.log(id)
              
        });
    }(jQuery));


});
