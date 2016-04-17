'use strict';

function draw_logic(){
    buffer.drawImage(
      document.getElementById('buffer-static'),
      0,
      0
    );

    // Draw visible scenery.
    for(var object in scenery){
        if(scenery[object]['x'] > width){
            continue;
        }

        buffer.fillStyle = scenery[object]['stump-color'];
        buffer.fillRect(
          scenery[object]['x'] + scenery[object]['stump-width'],
          scenery[object]['y'],
          scenery[object]['stump-width'],
          scenery[object]['stump-height']
        );

        buffer.fillStyle = scenery[object]['leaves'];
        buffer.beginPath();
        buffer.moveTo(
          scenery[object]['x'],
          scenery[object]['y']
        );
        buffer.lineTo(
          scenery[object]['x'] + scenery[object]['stump-width'] * 1.5,
          scenery[object]['y'] - scenery[object]['stump-height'] * 3
        );
        buffer.lineTo(
          scenery[object]['x'] - scenery[object]['height'],
          scenery[object]['y']
        );
        buffer.closePath();
        buffer.fill();
    }
}

function logic(){
    // Update scenery.
    for(var object in scenery){
        scenery[object]['x'] -= speed;

        if(scenery[object]['x'] > scenery[object]['height']){
            continue;
        }

        scenery[object]['x'] = width + Math.random() * 200;

        scenery[object]['y'] = Math.random() * height;
        while(scenery[object]['y'] > -80 - scenery[object]['stump-width'] + y
          && scenery[object]['y'] < 80 + y){
            scenery[object]['y'] = Math.random() * height;
        }

        scenery[object]['stump-height'] = Math.random() * 20 + 20;
        scenery[object]['stump-width'] = Math.random() * 20 + 20;

        scenery[object]['height'] = -scenery[object]['stump-width'] * 3;
    }
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
}

function resize_logic(){
    document.getElementById('buffer-static').height = height;
    document.getElementById('buffer-static').width = width;

    // Reset static world components.
    world.length = 0;
    world = [
      [0, y - 40, width, 80, '#432'],
      [0, y + 10, width, 4, '#444'],
      [0, y - 14, width, 4, '#444'],
      [x - 310, y - 30, 200, 60, '#555'],
      [x - 100, y - 30, 200, 60, '#555'],
      [x + 110, y - 30, 200, 60, '#555'],
    ];

    // Setup world static buffer.
    buffer_static.clearRect(
      0,
      0,
      height,
      width
    );
    for(var object in world){
        buffer_static.fillStyle = world[object][4];
        buffer_static.fillRect(
          world[object][0],
          world[object][1],
          world[object][2],
          world[object][3]
        );
    }

    // Reset scenery.
    scenery.length = 0;
    var loop_counter = 5;
    do{
        scenery.push({
          'height': 3,
          'leaves': random_hex(),
          'stump-color': '#543',
          'stump-height': 1,
          'stump-width': 1,
          'x': -99 + loop_counter * 420,
          'y': height,
       });
    }while(loop_counter--);
}

var buffer_static = document.getElementById('buffer-static').getContext('2d');
var scenery = [];
var speed = 4;
var world = [];

window.onload = function(){
    init_canvas();

    document.body.style.background = '#141';
};
