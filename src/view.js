var UI = require('ui');
var Vector2 = require('vector2');

// Create the Window
var window = new UI.Window();

// 144x168

// Create the Station Text
var stationText = new UI.Text({
    position: new Vector2(0, -4),
    size: new Vector2(144, 24),
    font: 'Gothic-24-bold',
    color: 'white',
    text: '',
    textAlign: 'center',
    textOverflow: 'fill'
});

// Create TimeText
var timeText = new UI.TimeText({
    position: new Vector2(0, 18),
    size: new Vector2(144, 26),
    text: "%I:%M",
    font: 'Bitham-30-black',
    color: 'white',
    textAlign: 'center'
});


// Create a trains background Rect
var trainsRect = new UI.Rect({
  position: new Vector2(0, 55),
  size: new Vector2(144, 114),
  backgroundColor: 'white'
});

var trains = [];
trains.push(new UI.Text({
    position: new Vector2(2, 54),
    size: new Vector2(142, 33),
    font: 'Gothic-28-Bold',
    color: 'black',
    text: '',
    textAlign: 'left'
}));

trains.push(new UI.Text({
    position: new Vector2(2, 87),
    size: new Vector2(142, 33),
    font: 'Gothic-28',
    color: 'black',
    text: '',
    textAlign: 'left'
}));

trains.push(new UI.Text({
    position: new Vector2(2, 120),
    size: new Vector2(142, 33),
    font: 'Gothic-28',
    color: 'black',
    text: '',
    textAlign: 'left'
}));

// Show the Window
window.add(timeText);
window.add(stationText);
window.add(trainsRect);

trains.forEach(function(element) {
    window.add(element);
});

module.exports.window = window;

module.exports.refreshView = function(model) {
    stationText.text(model.startStation);
    
    var len = model.trains.length;
    trains.forEach(function(train, index) {
        train.text(index < len ? model.trains[index] : '');
    });
};
