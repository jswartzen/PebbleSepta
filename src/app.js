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
    startStation: '',
    destStation: '',
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
    var url = encodeURI('http://www3.septa.org/hackathon/NextToArrive/' + model.startStation + '/' + model.destStation + '/4');
    
    refreshView();
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

// Update every minute
setInterval(function() { getNextToArrive(); }, 60000);

// Geolocation processing
(function () {
    var watchId = navigator.geolocation.watchPosition(
        function (pos) {
            console.log('accuracy: ', pos.coords.accuracy, 'coords: ' + pos.coords.latitude + '/' + pos.coords.longitude);
            var station = stations.closestStation(pos.coords.latitude, pos.coords.longitude);
            setStartStation(station);
            
            if (station && pos.coords.accuracy <= 50) {
                navigator.geolocation.clearWatch(watchId);
            }
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

Pebble.addEventListener('showConfiguration', function() {
    console.log('!!Settings requested!');
    Pebble.openURL('http://pebble.johnswartzentruber.com/Septa.html');
});
    
Pebble.addEventListener("webviewclosed", function(e) {
    console.log("configuration closed");
    
    // webview closed
    if (e.response) {
        var options = JSON.parse(decodeURIComponent(e.response));
        console.log("Options = " + JSON.stringify(options));
    }
}); 
