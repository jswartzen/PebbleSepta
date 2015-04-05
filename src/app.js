var View = require('view');
var ajax = require('ajax');

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

View.window.show();

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
    console.log('url: ' + url);
    ajax({
        url: url,
        type: 'json'
    }, 
    function (data, status, request) {
        model.trains = [];
        data.forEach(function(train, index) {
            var s = parseResult(train);
            console.log(s);
            model.trains.push(s);
        });
        refreshView();
    }, 
    function(error, status, request) {
        console.log('Ajax request failed: ' + error);
    });
}

function swap() {
    var s = model.startStation;
    model.startStation = model.destStation;
    model.destStation = s;
    getNextToArrive();
}

View.window.on('click', 'up', swap);
View.window.on('click', 'down', swap);

getNextToArrive();

// Update every minute
setInterval(function() { getNextToArrive(); }, 60000);