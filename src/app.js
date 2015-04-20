var View = require('view');
var ajax = require('ajax');
var stations = require('stations');
var Config = require('Config');    // This is a constructor

// This data will come from the configuration
var config = new Config(configChanged);

// Set up the model/viewmodel
var model = {
    startStation: '',
    destStation: '',
    trains: []
};

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
    var url = encodeURI('http://www3.septa.org/hackathon/NextToArrive/' + model.startStation + '/' + model.destStation + '/4');
    
    View.refreshView(model);
    
    try {
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
            View.refreshView(model);
        }, 
        function(error, status, request) {
            console.log('Ajax request failed: ' + error);
        });
    } catch (e) {
        console.log('Caught exception in ajax call: ' + e.message);
    }
}

function swapDest() {
    if (model.destStation !== config.home && model.startStation !== config.home) {
        model.destStation = config.home;
    } else if (model.destStation !== config.work && model.startStation !== config.work) {
        model.destStation = config.work;
    } else {
        var temp = model.destStation;
        model.destStation = model.startStation;
        model.startStation = temp;
    }
    
    model.trains = [];
    getNextToArrive();
}

function setStartStation(station) {
    if (station && station !== model.startStation) {
        model.trains = [];
        model.startStation = station;
        model.destStation = model.startStation === config.home ? config.work : config.home;
    
        getNextToArrive();
    }
}

// Set the default stations before doing geolocation
setStartStation(config.home);

View.window.show();
View.window.on('click', 'up', swapDest);
View.window.on('click', 'down', swapDest);

// Start train schedule update timer
var scheduleTimer;
function startTimer()
{
    if (scheduleTimer) {
        clearInterval(scheduleTimer);
    }
    scheduleTimer = setInterval(function() { getNextToArrive(); }, config.freq * 60000);
}
startTimer();

// Geolocation processing
(function () {
    var watchId = navigator.geolocation.watchPosition(
        function (pos) {
            stations.closestStation(pos.coords.latitude, pos.coords.longitude, function (station) {
                console.log("Got Station: " + station);
                setStartStation(station);
                
                if (station && pos.coords.accuracy <= 60) {
                    navigator.geolocation.clearWatch(watchId);
                }
            });
        }, 
        function (err) {
            console.log('GPS error: ' + err.message + '(' + err.code + ')');
        }, 
        {
            enableHighAccuracy: false,
            maximumAge: 150000,
            timeout: 15000
        });
})();

function configChanged(config) {
    model.startStation = config.home;
    model.workStation = config.work;
    getNextToArrive();
    startTimer();
}
