'use strict';

function draw_logic(){
    // Draw visible scenery.
    for(var object in world){
        canvas_buffer.fillStyle = world[object][4];
        canvas_buffer.fillRect(
          world[object][0],
          world[object][1],
          world[object][2],
          world[object][3]
        );
    }

    // Draw visible scenery.
    for(var object in scenery){
        if(scenery[object]['x'] > canvas_width){
            continue;
        }

        canvas_buffer.fillStyle = scenery[object]['stump-color'];
        canvas_buffer.fillRect(
          scenery[object]['x'] + scenery[object]['stump-width'],
          scenery[object]['y'],
          scenery[object]['stump-width'],
          scenery[object]['stump-height']
        );

        canvas_draw_path({
          'properties': {
            'fillStyle': scenery[object]['leaves'],
          },
          'vertices': [
            {
              'type': 'moveTo',
              'x': scenery[object]['x'],
              'y': scenery[object]['y'],
            },
            {
              'x': scenery[object]['x'] + scenery[object]['stump-width'] * 1.5,
              'y': scenery[object]['y'] - scenery[object]['stump-height'] * 3,
            },
            {
              'x': scenery[object]['x'] - scenery[object]['height'],
              'y': scenery[object]['y'],
            },
          ],
        });
    }
}

function logic(){
    // Update scenery.
    for(var object in scenery){
        scenery[object]['x'] -= speed;

        if(scenery[object]['x'] > scenery[object]['height']){
            continue;
        }

        scenery[object]['x'] = canvas_width + Math.random() * 200;

        scenery[object]['y'] = Math.random() * canvas_height;
        while(scenery[object]['y'] > -80 - scenery[object]['stump-width'] + canvas_y
          && scenery[object]['y'] < 80 + canvas_y){
            scenery[object]['y'] = Math.random() * canvas_height;
        }

        scenery[object]['stump-height'] = Math.random() * 20 + 20;
        scenery[object]['stump-width'] = Math.random() * 20 + 20;

        scenery[object]['height'] = -scenery[object]['stump-width'] * 3;
    }
}

function resize_logic(){
    world.length = 0;
    world = [
      [0, canvas_y - 40, canvas_width, 80, '#432'],
      [0, canvas_y + 10, canvas_width, 4, '#444'],
      [0, canvas_y - 14, canvas_width, 4, '#444'],
      [canvas_x - 310, canvas_y - 30, 200, 60, '#555'],
      [canvas_x - 100, canvas_y - 30, 200, 60, '#555'],
      [canvas_x + 110, canvas_y - 30, 200, 60, '#555'],
    ];
    scenery.length = 0;
    var loop_counter = 5;
    do{
        scenery.push({
          'height': 3,
          'leaves': '#' + random_hex(),
          'stump-color': '#543',
          'stump-height': 1,
          'stump-width': 1,
          'x': -99 + loop_counter * 420,
          'y': canvas_height,
       });
    }while(loop_counter--);
    document.body.style.background = '#141';
}

var scenery = [];
var speed = 4;
var world = [];

window.onload = canvas_init;
