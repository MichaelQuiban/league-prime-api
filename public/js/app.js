$(document).ready(function() {
    //This is mock data, our returned data should look like this.
    /*
    1. The user requests their summoner information by providing a name.
    */
    const SUMMONER_OVERALL = {
        "summonerOverall": [{
            // Summoner one
            "profileIconId": 1487,
            "name": "testdummy",
            "summonerLevel": 30,
            "accountId": 32639237,
            "id": 19887289,
            "revisionDate": 1492281294000
        }]
    }
    /*
    2. The user will be able to keep precise tracking on favorable information.
    */

    const TRACKING_SUMMONER = {
        "trackingSummoner": [{
            "SummonerName": "testdummy",

            // Dynamic Data
            "summonerWins": 300,
            "summonerLosses": 192,
            "favoriteLane": "Bot",
            "favoriteRole": "Support"
        }]
    }

    const TRACKING_CHAMPION = {
        "trackingChampion": [{
    		"championName": "Ashe",
            
            // Dynamic Data
            "championLane": "Bot",
            "championRole": "Attack Damage Carry",
            "championWins": 192,
            "championLosses": 239
        }]
    }

    function getSummonerData(callbackFn) {
        // we use a `setTimeout` to make this asynchronous
        // as it would be with a real AJAX call.
    	setTimeout(function(){ callbackFn(SUMMONER_OVERALL)}, 100);
    }

    // this function stays the same when we connect
    // to real API later
    function displaySummonerData(data) {
        for (index in data.summonerData) {
    	   $('body').append(
            '<p>' + data.summonerData[index].text + '</p>');
        }
    }

    // this function can stay the same even when we
    // are connecting to real API
    function getAndDisplaySummonerData() {
    	getSummonerData(displaySummonerData);
    }

    //  on page load do this
    $(function() {
    	getAndDisplaySummonerData();
    });

    $("#sign-up").submit(function(e) {
        e.preventDefault();
        var register = {};
        register.username = $("#signup-username").val();
        register.password = $("#signup-password").val();
        console.log(register)
        $.ajax({
            type: "POST",
            url : "/users/signup",
            data: JSON.stringify(register),
            dataType: "json",
            contentType: "application/json", 
            success: function(data, textStatus, jqXHR)
                {
                    //data - response from server
                    console.log(data);
                    window.location.href='/main.html';
                },
            error: function (jqXHR, textStatus, errorThrown)
                {
                    //quick and easy console log command
                    //Add client side success indicator
                    console.log('login failed');
                }
        });

        $("#ranked-form").submit(function(e) {
            e.preventDefault();
            var ranked = {};
            ranked.ranking = $("#ranked-input").val();
            ranked.elo = $("#ranked-elo").val();
            ranked.role = $("#ranked-role").val();
            ranked.progress = $("#ranked-progress").val();
            console.log(ranked)
            $.ajax({
                type: "POST",
                url: "/users/ranking",
                data: JSON.stringify(ranked),
                dataType: "json",
                contentType: "application/json",
                success: function(data, textStatus, jqXHR)
                {
                    //data - response from server
                    //Add client side Success indicator
                    let message = "Successfully logged in!";
                    $("#response").append(${message});
                },
            error: function(jqXHR, textStatus, errorThrown)
                {
                    //Add client side success indicator
                    console.log("failed!")
                }
            })
        });
    });
});
