$(document).ready(function() {
    
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
  
(function ($) {
    $('button').on('click', function () {
        // remove resultset if this has already been run
        $('.content ul').remove();
        // add spinner to indicate something is happening
        $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
        
        var teams = {
            'Boston Celtics': 1610612738,
            'Brooklyn Nets': 1610612751,
            'New York Knicks':1610612752,
            'Philadelphia 76ers': 1610612755,
            'Toronto Raptors': 1610612761,
            'Chicago Bulls': 1610612741,
            'ClevelandCavaliers': 1610612739,
            'Detroit Pistons': 1610612765,
            'IndianaPacers': 1610612754,
            'Milwaukee Bucks': 1610612749,
            'Atlanta Hawks': 1610612737,
            'Charlotte Hornets': 1610612766,
            'MiamiHeat': 1610612748,
            'Orlando Magic': 1610612753,
            'Wahington Wizards': 1610612764,
            'Denver Nuggets': 1610612743,
            'Minnesota Timberwolves': 1610612750,
            'Oklahoma City Thunder': 1610612760,
            'Portland Trailblazers': 1610612757, 
            'Utah Jazz': 1610612762,
            'Golden State Warriors': 1610612744,
            'Los Angeles Clippers': 1610612746,
            'Los Angeles Lakers': 1610612747,
            'Phoenix Suns': 1610612756,
            'Sacramento Kings': 1610612758,
            'Dallas Mavericks': 1610612742,
            'Houston Rockets': 1610612745,
            'Memphis Grizzlies': 1610612763,
            'New Orleans Pelicans': 1610612740,
            'San Antonio Spurs': 1610612759
        };
        document.write("Team: " + $('#teams option:selected').text());
        team = $('#teams option:selected').text();
        document.write("TeamID: " + teams[team])
        var team = teams[$('#teams option:selected').text()]
        // make AJAX call
        $.getJSON('http://stats.nba.com/stats/commonteamroster?&Season=2014-15&TeamID=' + team, function (data) {
            
            // do all this on success       
            var items = [],
                $ul;
            
            $.each(data, function (key, val) {
                //iterate through the returned data and build a list
                items.push('<li id="' + key + '"><span class="name">' + val.entityname + '</span><br><span class="addr">' + val.principaladdress1 + '</span> <span class="city">' + val.principalcity + '</span></li>');
            });
            // if no items were returned then add a message to that effect
            if (items.length < 1) {
                items.push('<li>No results for this ZIP code, try again!</li>');
            }
            
            // remove spinner
            $('.fa-spin').remove();
            
            // append list to page
            $ul = $('<ul />').appendTo('.content');
            
            //append list items to list
            $ul.append(items);
        });
    });
}(jQuery));


});