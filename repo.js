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
          'vertices': tree.base.vertices,
          'x': tree.x,
          'y': tree.y,
        });
        canvas_draw_path({
          'properties': {
            'fillStyle': tree.leaf.color,
          },
          'translate': true,
          'vertices': tree.leaf.vertices,
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
        tree.x -= core_storage_data.speed;

        if(tree.x > -50){
            continue;
        }

        sort = true;
        let new_x = Math.max(
          core_random_integer(canvas_properties.width),
          50
        ) + canvas_properties.width;
        let new_y = core_random_integer(canvas_properties.height);
        while(new_y > -80 + canvas_properties.height_half
          && new_y < 80 + canvas_properties.height_half){
            new_y = core_random_integer(canvas_properties.height);
        }
        tree.x = new_x;
        tree.y = new_y;
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
        trees.push(tree_grow({
          'height_base': 10 + Math.random() * 25,
          'height_leaf': 40 + Math.random() * 60,
          'width_leaf': 40 + Math.random() * 60,
        }));
    }while(loop_counter--);
}

// Required args: height_base, height_leaf, id, width_leaf, x
function tree_grow(args){
    const half_leaf = args.width_leaf / 2;
    return {
      'base': {
        'color': args.color_base,
        'vertices': [
          [
            'moveTo',
            -12,
            args.height_base,
          ],
          [
            'lineTo',
            12,
            args.height_base,
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
      },
      'leaf': {
        'color': '#' + core_random_hex(),
        'vertices': [
          [
            'moveTo',
            -half_leaf,
            -args.height_leaf,
          ],
          [
            'lineTo',
            half_leaf,
            -args.height_leaf,
          ],
          [
            'lineTo',
            half_leaf,
            0,
          ],
          [
            'lineTo',
            -half_leaf,
            0,
          ],
        ],
      },
      'x': -50,
      'y': -args.height_base,
    };
}
