var UI = require('ui');
var Vector2 = require('vector2');

// Create the Window
var window = new UI.Window();

// 144x168

// Create TimeText
var timeText = new UI.TimeText({
  position: new Vector2(0, 0),
  size: new Vector2(144, 22),
  text: "%H:%M",
  font: 'Gothic-18-Bold',
  color: 'white',
  textAlign: 'center'
});


// Create a background Rect
var stationRect = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(144, 24),
  backgroundColor: 'white'
});


// Create the Station Text
var stationText = new UI.Text({
  position: new Vector2(0, -4),
  size: new Vector2(144, 24),
  font: 'Gothic-24-bold',
  color: 'black',
  textAlign: 'center'
});

// Create TimeText
var timeText = new UI.TimeText({
  position: new Vector2(0, 20),
  size: new Vector2(144, 22),
  text: "%H:%M",
  font: 'Gothic-24-Bold',
  color: 'white',
  textAlign: 'center'
});


// Create a background Rect
var trainsRect = new UI.Rect({
  position: new Vector2(0, 50),
  size: new Vector2(144, 122),
  backgroundColor: 'white'
});

var trains = [];
trains.push(new UI.Text({
    position: new Vector2(2, 50),
    size: new Vector2(142, 35),
    font: 'Gothic-28-bold',
    color: 'black',
    textAlign: 'left'
}));

trains.push(new UI.Text({
    position: new Vector2(2, 85),
    size: new Vector2(142, 35),
    font: 'Gothic-28',
    color: 'black',
    textAlign: 'left'
}));

trains.push(new UI.Text({
    position: new Vector2(2, 120),
    size: new Vector2(142, 35),
    font: 'Gothic-28',
    color: 'black',
    textAlign: 'left'
}));

// Show the Window
window.add(timeText);
window.add(stationRect);
window.add(stationText);
window.add(trainsRect);

trains.forEach(function(element) {
    window.add(element);
});

module.exports.window = window;

module.exports.setStationText = function (station) {
    stationText.text(station);
};

module.exports.setTrains = function(schedule) {
    var len = schedule.length;
    trains.forEach(function(train, index) {
        train.text(index < len ? schedule[index] : '');
    });
};
