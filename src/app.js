var View = require('view');
var ajax = require('ajax');
var stations = require('stations');

// This data will come from the configuration
var config = {
    home: 'Swarthmore',
    work: 'Suburban Station'
};

// Set up the model/viewmodel
var model = {
    startStation: 'Swarthmore',
    destStation: 'Suburban Station',
    trains: []
};

function refreshView() {
    View.setStationText(model.startStation);
    View.setTrains(model.trains);
}

function parseResult(train) {
    var s = train.orig_departure_time;
    if (train.orig_delay === 'On time') {
        s += ' - OK';
    } else {
        var delay = parseInt(train.orig_delay);
        if (isNaN(delay)) {
            delay = 0;
        }
        s += ' (' + delay + ')';
    }
    
    return s;
}

function getNextToArrive() {
    var url = encodeURI('http://www3.septa.org/hackathon/NextToArrive/' + model.startStation + '/' + model.destStation + '/5');
    ajax({
        url: url,
        type: 'json'
    }, 
    function (data, status, request) {
        model.trains = [];
        data.forEach(function(train, index) {
            var s = parseResult(train);
            model.trains.push(s);
        });
        refreshView();
    }, 
    function(error, status, request) {
        console.log('Ajax request failed: ' + error);
    });
}

function swap() {
    console.log('Swapping' + model.startStation + ' with ' + model.destStation);
    var s = model.startStation;
    model.startStation = model.destStation;
    model.destStation = s;
    model.trains = [];
    refreshView();
    getNextToArrive();
}

function setStartStation(station) {
    if (station !== model.startStation) {
        model.trains = [];
        model.startStation = station;
        if (model.startStation === config.home) {
            model.destStation = config.work;
        } else {
            model.destStation = config.home;
        }
        refreshView();
        getNextToArrive();
    }
}

refreshView();
View.window.show();
View.window.on('click', 'up', swap);
View.window.on('click', 'down', swap);

getNextToArrive();

// Update every minute
setInterval(function() { getNextToArrive(); }, 60000);

// Geolocation processing
(function () {
    var prevLat = 400, prevLong = 400;
    var resolution = 0.002;
    
    navigator.geolocation.watchPosition(
        function (pos) {
            var diffLat = Math.abs(prevLat - pos.coords.latitude);
            var diffLong = Math.abs(prevLong - pos.coords.longitude);
            if (diffLat > resolution || diffLong > resolution) {
                prevLat = pos.coords.latitude;
                prevLong = pos.coords.longitude;
                var station = stations.closestStation(prevLat, prevLong);
                setStartStation(station);
            }
        }, 
        function (err) {
            console.log('GPS error: ' + err.message + '(' + err.code + ')');
        }, 
        {
            enableHighAccuracy: false,
            maximumAge: 150000,
            timeout: 10000
        });
})();