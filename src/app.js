var Layout = require('layout');

// Set up the model/viewmodel
var model = {
    home: 'Swarthmore',
    dest: 'Suburban',
    currentStation: 'Swarthmore',
    trains: ['82:34 (On time)', '81:23 (1)', '82:34 (12)']
};

Layout.show();

function refresh() {
    Layout.stationText.text(model.currentStation);
    Layout.train1.text(model.trains[0]);
    Layout.train2.text(model.trains[1]);
    Layout.train3.text(model.trains[2]);
}

refresh();