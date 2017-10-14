'use strict';

function draw_logic(){
    for(var object in world){
        canvas_setproperties({
          'properties': {
            'fillStyle': world[object][4],
          },
        });
        canvas_buffer.fillRect(
          world[object][0],
          world[object][1],
          world[object][2],
          world[object][3]
        );
    }
    for(var object in scenery){
        canvas_draw_path({
          'properties': {
            'fillStyle': scenery[object]['color'],
          },
          'translate': true,
          'vertices': scenery[object]['vertices'],
          'x': scenery[object]['x'],
          'y': scenery[object]['y'],
        });
    }
}

function logic(){
    // Update scenery.
    for(var object in scenery){
        scenery[object]['x'] -= core_storage_data['speed'];

        if(scenery[object]['x'] > -100
          || scenery[object]['color'] === '#be6400'){
            continue;
        }

        var new_x = canvas_properties['width'] + core_random_integer({
          'max': canvas_properties['width'],
        });
        var new_y = core_random_integer({
          'max': canvas_properties['height'],
        });

        while(new_y > -80 + canvas_properties['height-half']
          && new_y < 80 + canvas_properties['height-half']){
            new_y = core_random_integer({
              'max': canvas_properties['height'],
            });
        }

        scenery[object]['x'] = new_x;
        scenery[object]['y'] = new_y;
        scenery[object - 1]['x'] = new_x;
        scenery[object - 1]['y'] = new_y + 25;
    }
}

function repo_init(){
    core_repo_init({
      'storage': {
        'speed': 4,
        'trees': 6,
      },
      'storage-menu': '<table><tr><td><input id=speed><td>Speed<tr><td><input id=trees><td>Trees</table>',
      'title': 'Trains-2D.htm',
    });
    canvas_init();
}

function resize_logic(){
    world.length = 0;
    world = [
      [0, canvas_properties['height-half'] - 40, canvas_properties['width'], 80, '#432'],
      [0, canvas_properties['height-half'] + 10, canvas_properties['width'], 4, '#444'],
      [0, canvas_properties['height-half'] - 14, canvas_properties['width'], 4, '#444'],
      [canvas_properties['width-half'] - 310, canvas_properties['height-half'] - 30, 200, 60, '#555'],
      [canvas_properties['width-half'] - 100, canvas_properties['height-half'] - 30, 200, 60, '#555'],
      [canvas_properties['width-half'] + 110, canvas_properties['height-half'] - 30, 200, 60, '#555'],
    ];
    scenery.length = 0;
    var loop_counter = core_storage_data['trees'] - 1;
    do{
        data_canvas_tree_2d({
          'x': -canvas_properties['width'],
        });
    }while(loop_counter--);
    document.body.style.background = '#141';
}

var scenery = [];
var world = [];
