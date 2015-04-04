var UI = require('ui');
var Vector2 = require('vector2');

// Set up the model/viewmodel
var model = {
    home: 'Swarthmore',
    dest: 'Suburban',
    currentStation: 'Swarthmore',
    trains: ['82:34 (On time)', '81:23 (1)', '82:34 (12)']
};

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

// Add the TimeText
window.add(timeText);

// Create a background Rect
var stationRect = new UI.Rect({
  position: new Vector2(0, 0),
  size: new Vector2(144, 24),
  backgroundColor: 'white'
});

// Add Rect to Window
window.add(stationRect);

// Create the Station Text
var stationText = new UI.Text({
  position: new Vector2(0, -4),
  size: new Vector2(144, 24),
  font: 'Gothic-24-bold',
  color: 'black',
  textAlign: 'center'
});

window.add(stationText);

// Create TimeText
var timeText = new UI.TimeText({
  position: new Vector2(0, 20),
  size: new Vector2(144, 22),
  text: "%H:%M",
  font: 'Gothic-24-Bold',
  color: 'white',
  textAlign: 'center'
});

// Add the TimeText
window.add(timeText);

// Create a background Rect
var trainsRect = new UI.Rect({
  position: new Vector2(0, 50),
  size: new Vector2(144, 122),
  backgroundColor: 'white'
});
window.add(trainsRect);

var train1 = new UI.Text({
    position: new Vector2(2, 50),
    size: new Vector2(142, 35),
    font: 'Gothic-28-bold',
    color: 'black',
    textAlign: 'left'
});
window.add(train1);

var train2 = new UI.Text({
    position: new Vector2(2, 85),
    size: new Vector2(142, 35),
    font: 'Gothic-28',
    color: 'black',
    textAlign: 'left'
});
window.add(train2);

var train3 = new UI.Text({
    position: new Vector2(2, 120),
    size: new Vector2(142, 35),
    font: 'Gothic-28',
    color: 'black',
    textAlign: 'left'
    
});
window.add(train3);

// Show the Window
window.show();

function updateTrainText() {
    train1.text(model.trains[0]);
    train2.text(model.trains[1]);
    train3.text(model.trains[2]);
}

stationText.text(model.currentStation);
updateTrainText();