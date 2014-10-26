function draw(){
    // Draw the world.
    buffer.clearRect(
      0,
      0,
      width,
      height
    );
    buffer.drawImage(
      document.getElementById('buffer-static'),
      0,
      0
    );

    // Draw scenery.
    loop_counter = scenery.length - 1;
    do{
        scenery[loop_counter][0] -= 4;

        if(scenery[loop_counter][0] < scenery[loop_counter][6]){
            scenery[loop_counter][0] = width + Math.random() * 200;

            scenery[loop_counter][1] = Math.random() * height - y;
            while(scenery[loop_counter][1] > -80 - scenery[loop_counter][3]
              && scenery[loop_counter][1] < 80){
                scenery[loop_counter][1] = Math.random() * height - y;
            }

            scenery[loop_counter][2] = Math.random() * 20 + 20;
            scenery[loop_counter][6] = -scenery[loop_counter][2] * 3;
            scenery[loop_counter][3] = Math.random() * 20 + 20;
        }

        // Only draw visible trees.
        if(scenery[loop_counter][0] < width){
            buffer.fillStyle = scenery[loop_counter][4];
            buffer.fillRect(
              scenery[loop_counter][0] + scenery[loop_counter][2],
              scenery[loop_counter][1] + y,
              scenery[loop_counter][2],
              scenery[loop_counter][3]
            );

            buffer.fillStyle = scenery[loop_counter][5];
            buffer.beginPath();
            buffer.moveTo(
              scenery[loop_counter][0],
              scenery[loop_counter][1] + y
            );
            buffer.lineTo(
              scenery[loop_counter][0] + scenery[loop_counter][2] * 1.5,
              scenery[loop_counter][1] + y - scenery[loop_counter][3] * 3
            );
            buffer.lineTo(
              scenery[loop_counter][0] - scenery[loop_counter][6],
              scenery[loop_counter][1] + y
            );
            buffer.closePath();
            buffer.fill();
        }
    }while(loop_counter--);

    // Draw buffer onto the canvas.
    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
}

function reset_world(){
    document.getElementById('canvas').style.background = '#141';

    // Reset static world components.
    world.length = 0;
    world = [
      [x - 310, y - 30, 200, 60, '#555'],
      [x - 100, y - 30, 200, 60, '#555'],
      [x + 110, y - 30, 200, 60, '#555'],
      [0, y + 10, width, 4, '#444'],
      [0, y - 14, width, 4, '#444'],
      [0, y - 40, width, 80, '#432'],
    ];

    // Setup world static buffer.
    buffer_static.clearRect(
      0,
      0,
      height,
      width
    );
    loop_counter = world.length - 1;
    do{
        buffer_static.fillStyle = world[loop_counter][4];
        buffer_static.fillRect(
          world[loop_counter][0],
          world[loop_counter][1],
          world[loop_counter][2],
          world[loop_counter][3]
        );
    }while(loop_counter--);

    // Reset scenery.
    scenery.length = 0;
    var loop_counter = 5;
    do{
        scenery.push([
          -99 + loop_counter * 420,
          height,
          1,
          1,
          '#543',
          random_hex(),
          3
       ]);
    }while(loop_counter--);
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('buffer-static').height = height;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('buffer-static').width = width;
    document.getElementById('canvas').width = width;
    x = width / 2;

    reset_world();
}

var buffer = document.getElementById('buffer').getContext('2d');
var buffer_static = document.getElementById('buffer-static').getContext('2d');
var canvas = document.getElementById('canvas').getContext('2d');
var height = 0;
var scenery = [];
var x = 0;
var y = 0;
var width = 0;
var world = [];

resize();
window.onresize = resize;

setInterval(
  'draw()',
  30
);
