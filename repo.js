'use strict';

function repo_drawlogic(){
    for(const object in world){
        canvas_setproperties({
          'fillStyle': world[object][4],
        });
        canvas.fillRect(
          world[object][0],
          world[object][1],
          world[object][2],
          world[object][3]
        );
    }
    canvas_setproperties({
      'fillStyle': '#be6400',
    });
    for(const object in trees){
        canvas_draw_path({
          'translate': true,
          'vertices': [
            [
              'rect',
              -12,
              -25,
              24,
              50,
            ],
          ],
          'x': trees[object].x,
          'y': trees[object].y + 25,
        });
    }
    for(const object in trees){
        canvas_draw_path({
          'properties': {
            'fillStyle': trees[object].color,
          },
          'translate': true,
          'vertices': trees[object].vertices,
          'x': trees[object].x,
          'y': trees[object].y,
        });
    }
}

function repo_init(){
    core_repo_init({
      'globals': {
        'trees': [],
        'world': [],
      },
      'storage': {
        'speed': 4,
        'trees': 20,
      },
      'storage_menu': '<table><tr><td><input class=mini id=speed min=1 step=any type=number><td>Speed'
        + '<tr><td><input class=mini id=trees min=1 step=1 type=number><td>Trees</table>',
      'title': 'Trains-2D.htm',
    });
    canvas_init();

    canvas_properties.clearColor = '#141';
}

function repo_logic(){
    let sort = false;
    for(const object in trees){
        trees[object].x -= core_storage_data.speed;

        if(trees[object].x > -100
          || trees[object].color === '#be6400'){
            continue;
        }

        sort = true;
        let new_x = canvas_properties.width + core_random_integer(canvas_properties.width);
        let new_y = core_random_integer(canvas_properties.height);
        while(new_y > -80 + canvas_properties.height_half
          && new_y < 80 + canvas_properties.height_half){
            new_y = core_random_integer(canvas_properties.height);
        }
        trees[object].x = new_x;
        trees[object].y = new_y;
    }

    if(sort){
        core_sort_property({
          'array': trees,
          'clone': false,
          'property': 'y',
        });
    }
}

function repo_resizelogic(){
    world = [
      [0, canvas_properties.height_half - 40, canvas_properties.width, 80, '#432'],
      [0, canvas_properties.height_half + 10, canvas_properties.width, 4, '#444'],
      [0, canvas_properties.height_half - 14, canvas_properties.width, 4, '#444'],
      [canvas_properties.width_half - 310, canvas_properties.height_half - 30, 200, 60, '#555'],
      [canvas_properties.width_half - 100, canvas_properties.height_half - 30, 200, 60, '#555'],
      [canvas_properties.width_half + 110, canvas_properties.height_half - 30, 200, 60, '#555'],
    ];
    core_object_reset(trees);
    let loop_counter = Math.floor(core_storage_data.trees) - 1;
    do{
        trees.push(prefabs_canvas_tree_2d({
          'height-leaf': 50 + Math.random() * 50,
          'id': loop_counter,
          'x': -canvas_properties.width,
          'width-leaf': 50 + Math.random() * 50,
        })[1]);
    }while(loop_counter--);
}
