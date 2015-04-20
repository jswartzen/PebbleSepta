var ajax = require('ajax');

this.exports = {
    closestStation: function(lat, lng, callback) {
        var url = 'http://www3.septa.org/hackathon/locations/get_locations.php?lon=' + lng + '&lat=' + lat + '&radius=5&type=rail_stations';
        try {
            ajax({
                url: url,
                type: 'json'
            }, 
            function (data, status, request) {
                if (data.length > 0) {
                    var station = data[0];
                    callback(station.location_name);
                } else {
                    console.log('Found no stations within 5 miles of current location: ' + lat + '/' + lng);
                }
            }, 
            function(error, status, request) {
                console.log('Station Ajax request failed: ' + error);
            });
        } catch (e) {
            console.log('Caught exception in station ajax call: ' + e.message);
        }
    }
};