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
    for(const tree of trees){
        canvas_draw_path({
          'properties': {
            'fillStyle': '#be6400',
          },
          'translate': true,
          'vertices': [
            [
              'moveTo',
              -12,
              tree.base_height,
            ],
            [
              'lineTo',
              12,
              tree.base_height,
            ],
            [
              'lineTo',
              12,
              0,
            ],
            [
              'lineTo',
              -12,
              0,
            ],
          ],
          'x': tree.x,
          'y': tree.y,
        });
        canvas_draw_path({
          'properties': {
            'fillStyle': tree.leaf_color,
          },
          'translate': true,
          'vertices': [
            [
              'moveTo',
              -tree.leaf_half,
              -tree.leaf_height,
            ],
            [
              'lineTo',
              tree.leaf_half,
              -tree.leaf_height,
            ],
            [
              'lineTo',
              tree.leaf_half,
              0,
            ],
            [
              'lineTo',
              -tree.leaf_half,
              0,
            ],
          ],
          'x': tree.x,
          'y': tree.y,
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
    for(const tree of trees){
        if(tree.x > -50){
            tree.x -= core_storage_data.speed;
            continue;
        }

        sort = true;
        tree_randomize(tree);
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
        trees.push(tree_grow());
    }while(loop_counter--);
}

function tree_grow(){
    return {
      'base_height': 10 + Math.random() * 25,
      'leaf_color': '#' + core_random_hex(),
      'leaf_half': (40 + Math.random() * 60) / 2,
      'leaf_height': 40 + Math.random() * 60,
      'x': -99,
      'y': core_random_integer(canvas_properties.height_half) + (Math.random() < .5
        ? -60
        : canvas_properties.height_half + 60),
    };
}

function tree_randomize(tree){
    tree.leaf_color = '#' + core_random_hex();
    tree.base_height = 10 + Math.random() * 25;
    tree.x = Math.max(
      core_random_integer(canvas_properties.width),
      50
    ) + canvas_properties.width;
}
