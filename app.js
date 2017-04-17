
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