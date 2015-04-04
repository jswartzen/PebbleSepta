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

var train1 = new UI.Text({
    position: new Vector2(2, 50),
    size: new Vector2(142, 35),
    font: 'Gothic-28-bold',
    color: 'black',
    textAlign: 'left'
});

var train2 = new UI.Text({
    position: new Vector2(2, 85),
    size: new Vector2(142, 35),
    font: 'Gothic-28',
    color: 'black',
    textAlign: 'left'
});

var train3 = new UI.Text({
    position: new Vector2(2, 120),
    size: new Vector2(142, 35),
    font: 'Gothic-28',
    color: 'black',
    textAlign: 'left'
    
});

// Show the Window
window.add(timeText);
window.add(stationRect);
window.add(stationText);
window.add(trainsRect);
window.add(train1);
window.add(train2);
window.add(train3);

module.exports.show = function() {
  window.show();  
};

module.exports.stationText = stationText;
module.exports.train1 = train1;
module.exports.train2 = train2;
module.exports.train3 = train3;
