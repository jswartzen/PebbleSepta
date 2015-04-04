var View = require('view');

// This data will come from the configuration
var config = {
    home: 'Swarthmore',
    work: 'Suburban'
};

// Set up the model/viewmodel
var model = {
    startStation: 'Swarthmore',
    destStation: 'Suburban',
    trains: ['82:34 (On time)', '81:23 (1)', '82:34 (12)']
};

View.window.show();

function refresh() {
    View.setStationText(model.startStation);
    View.setTrains(model.trains);
}

refresh();

function swap() {
    var s = model.startStation;
    model.startStation = model.destStation;
    model.destStation = s;
    refresh();
}

View.window.on('click', 'up', swap);
View.window.on('click', 'down', swap);