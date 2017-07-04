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

    // Draw scenery.
    for(var object in scenery){
        // Save current buffer.
        canvas_buffer.save();

        // Translate to object location.
        canvas_buffer.translate(
          scenery[object]['x'],
          scenery[object]['y']
        );

        canvas_draw_path({
          'properties': {
            'fillStyle': scenery[object]['color'],
          },
          'vertices': scenery[object]['vertices'],
        });

        // Save current buffer.
        canvas_buffer.restore();
    }
}

function logic(){
    // Update scenery.
    for(var object in scenery){
        scenery[object]['x'] -= speed;

        if(scenery[object]['x'] > -canvas_width
          || scenery[object]['color'] === '#be6400'){
            continue;
        }

        console.log(object,scenery[object]['x'])

        var new_x = core_random_integer({
          'max': 200,
        }) + canvas_width;
        var new_y = core_random_integer({
          'max': canvas_height,
        });

        while(new_y > -80 + canvas_y
          && new_y < 80 + canvas_y){
            new_y = core_random_integer({
              'max': canvas_height,
            });
        }

        scenery[object]['x'] = new_x;
        scenery[object]['y'] = new_y;
        scenery[object - 1]['x'] = new_x;
        scenery[object - 1]['y'] = new_y;
    }
}

function repo_init(){
    core_repo_init({
      'title': 'Trains-2D.htm',
    });
    canvas_init();
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
        data_canvas_tree_2d({
          'x': -99 + loop_counter * 420,
          'y': 0,
        });
    }while(loop_counter--);
    document.body.style.background = '#141';
}

var scenery = [];
var speed = 4;
var world = [];
