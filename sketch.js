var fps = 24;
var startButton;
var mode = 'Preparation';
var time = 0;
var rtDur = 1;

var saveFishSlider;

var birdPreset = [{
    num: 10,
    img: null,
  },
  {
    num: 1,
    img: null
  }
]

var fishPreset = [{
  num: 100,
  img: null
}]

var birdState = [{
    x: [],
    y: [],
    dir: []
  },
  {
    x: [],
    y: [],
    dir: []
  }
];

var fishState = [{
  x: [],
  y: [],
  dir: []
}];

function preload() {
  birdPreset[0].img = loadImage('images/Bird01.png');
  birdPreset[1].img = loadImage('images/Bird02.png');
  fishPreset[0].img = loadImage('images/Fish01.png');
}

function setup() {
  createCanvas(600, 600);
  (birdPreset[0].img).loadPixels();
  (birdPreset[1].img).loadPixels();
  (fishPreset[0].img).loadPixels();

  startButton = createButton('START!');
  startButton.position(10, 10);
  startButton.size(75, 75);
  startButton.mousePressed(startNow);
  
  saveFishSlider = createSlider(0, 100, 10, 1);
  saveFishSlider.position(100, 10);
  saveFishSlider.style('width', (width - 120) + 'px');
}

function startNow() {
  mode = 'Growing'
  time = 0;
  fishPreset[0].num = 100;
  birdState = [{
      x: [],
      y: [],
      dir: []
    },
    {
      x: [],
      y: [],
      dir: []
    }
  ];
  fishState = [{
    x: [],
    y: [],
    dir: []
  }];
}

function draw() {
  background(220);
  frameRate(fps);

  translate(width / 2, height / 2);
  
  birdPreset[0].num = fishPreset[0].num;
  birdPreset[1].num = int(fishPreset[0].num * 0.1);

  for (var n = 0; n < fishPreset.length; n++) {
    for (var m = 0; m < fishPreset[n].num; m++) {
      if (fishState[n].x[m] == null) {
        fishState[n].x[m] = random() * width - width / 2;
        fishState[n].y[m] = random() * height - height / 2;
        fishState[n].dir[m] = int(random() * 2) * 2 - 1;
      }

      if (mode == 'Growing' || mode == 'Harvest Time!') {
        push();
        scale(fishState[n].dir[m], 1);
        image(fishPreset[n].img, fishState[n].x[m], fishState[n].y[m], fishPreset[n].img.width / 5, fishPreset[n].img.height / 5);
        pop();
      }
    }
  }

  for (var i = 0; i < birdPreset.length; i++) {
    for (var j = 0; j < birdPreset[i].num; j++) {
      if (birdState[i].x[j] == null) {
        birdState[i].x[j] = random() * width - width / 2;
        birdState[i].y[j] = random() * height - height / 2;
        birdState[i].dir[j] = int(random() * 2) * 2 - 1;
      }
      //print(birdState[i].x[j]);

      if (mode == 'Harvest Time!') {
        push();
        scale(birdState[i].dir[j], 1);
        image(birdPreset[i].img, birdState[i].x[j], birdState[i].y[j], birdPreset[i].img.width / 5, birdPreset[i].img.height / 5);
        pop();
      }
    }
  }

  //print(birdState)

  noStroke();
  fill(255);
  rect(-width / 2, height / 2 - 20, width, 20);
  fill(128);
  rect(-width / 2, height / 2 - 20, time % width, 20);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(mode, 0, height / 2 - 10);
  
  textAlign(LEFT, TOP);
  text('留下的魚：' + saveFishSlider.value() + '%', 100 - width/2, 40 - height/2);

  if (time > width) {
    
    fishPreset[0].num = int(fishPreset[0].num * saveFishSlider.value()/100);
    mode = 'Harvest Time!';
    time = 0;
  }

  if (mode == 'Growing') {
    time = time + int(width / rtDur / fps);
  }
}