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
    for(var object in scenery){
        // Only draw visible scenery.
        if(scenery[object][0] > width){
            continue;
        }

        buffer.fillStyle = scenery[object][4];
        buffer.fillRect(
          scenery[object][0] + scenery[object][2],
          scenery[object][1] + y,
          scenery[object][2],
          scenery[object][3]
        );

        buffer.fillStyle = scenery[object][5];
        buffer.beginPath();
        buffer.moveTo(
          scenery[object][0],
          scenery[object][1] + y
        );
        buffer.lineTo(
          scenery[object][0] + scenery[object][2] * 1.5,
          scenery[object][1] + y - scenery[object][3] * 3
        );
        buffer.lineTo(
          scenery[object][0] - scenery[object][6],
          scenery[object][1] + y
        );
        buffer.closePath();
        buffer.fill();
    }

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

    window.requestAnimationFrame(draw);
}

function logic(){
    // Update scenery.
    for(var object in scenery){
        scenery[object][0] -= 4;

        if(scenery[object][0] > scenery[object][6]){
            continue;
        }

        scenery[object][0] = width + Math.random() * 200;

        scenery[object][1] = Math.random() * height - y;
        while(scenery[object][1] > -80 - scenery[object][3]
          && scenery[object][1] < 80){
            scenery[object][1] = Math.random() * height - y;
        }

        scenery[object][2] = Math.random() * 20 + 20;
        scenery[object][6] = -scenery[object][2] * 3;
        scenery[object][3] = Math.random() * 20 + 20;
    }
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
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

    document.getElementById('canvas').style.background = '#141';

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
        scenery.push([
          -99 + loop_counter * 420,
          height,
          1,
          1,
          '#543',
          random_hex(),
          3,
       ]);
    }while(loop_counter--);
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

window.onload = function(){
    resize();

    window.requestAnimationFrame(draw);
    window.setInterval(
      'logic()',
      30
    );
};

window.onresize = resize;
