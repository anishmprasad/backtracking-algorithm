/* eslint-disable */

'use strict'

import './import_assets';
import { pattern } from './pattern'


// Game Variables
let lives = 3;
let score = 0;

// canvas variables
let canvas;
let ctx;
let boardWidth;
let boardHeight;


var SQUARE_SIZE;
const NUMBER_OF_ROWS = 19;
const NUMBER_OF_COLS = 19;
var NUMBER_OF_SQUARES;

var xValue = 0;
var yValue = 0;

var cellSize = 16;
var cellSpacing = 8; 

// event signals
let rightPressed = false;
let leftPressed = false;
let anyKeyPressed = false;

var layout = []

//Loads up the game
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];

var x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;

var width = x - 16,
    height = y - 16;

var position = {
  x: 15,
  y: 15
};
var previousPostiton = {}

function keyDownHandler(e) {
  anyKeyPressed = true;
  if (e.keyCode === 39) {
    rightPressed = true;
  } else if (e.keyCode === 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  anyKeyPressed = false;
  if (e.keyCode === 39) {
    rightPressed = false;
  } else if (e.keyCode === 37) {
    leftPressed = false;
  }
}
// Event Listeners
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
/**
* Initialisations
*
*
*/

function initializeCanvas() {
  canvas = document.getElementById('canvasEL');
  ctx = canvas.getContext('2d');
  if (window.innerWidth > window.innerHeight) {
    boardHeight = window.innerHeight * 0.95;
    boardWidth = boardHeight / 1.2;
  } else {
    boardWidth = window.innerWidth * 0.95;
    boardHeight = boardWidth / 1.2;
  }
  canvas.height = boardHeight;
  canvas.width = boardWidth;
  drawPattern(canvas,pattern)

  SQUARE_SIZE = canvas.height / NUMBER_OF_ROWS;
  NUMBER_OF_SQUARES = NUMBER_OF_ROWS * NUMBER_OF_COLS;

  console.log('NUMBER_OF_SQUARES', NUMBER_OF_SQUARES)
  console.log("Size of each square = " + SQUARE_SIZE + "px");

  // drawBoard(canvas, NUMBER_OF_ROWS, NUMBER_OF_COLS,pattern);
}

function dialog(text) {
  ctx.fillStyle = "#FFFF00";
  ctx.font = "14px BDCartoonShoutRegular";
  var width = ctx.measureText(text).width,
    x = ((map.width * map.blockSize) - width) / 2;
  ctx.fillText(text, x, (map.height * 10) + 8);
}

function drawPattern(canvas,n){
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var istep = 15;
  var jstep = 15;
  var o = 0
  for (var i = 0; i < n.length; i++) {
    for (var j = 0; j < n[i].length; j++) {
      // ctx.strokeRect(i * istep, j * jstep, 10, 20)
      
      // ctx.fillText(o += 1, j * jstep , i * istep + 10 , 10, 20);
      ctx.fillText(n[i][j], j * jstep, i * istep + 10, 10, 20);      
      // console.log(n[i][j], i * istep + 10, j * jstep)      
      layout.push({
        pattern: n[i][j],
        x: i * istep,
        y: j * jstep
      })
      // ctx.strokeRect(0, 0, 10, 20)      
      // console.log(pattern[0].length,pattern.length)
      if(j == n[i].length - 1){
        console.log("array")
        continue
      }



      // ctx.fillText(n[i][j],i * step, j * step, 20, 20);
      // ctx.rect(20,20,w, h);
      // ctx.fillText(n[i][j], 20, 20);
    }
  }
  console.log(layout);  
  // ctx.fill();

  // for (let i = 0; i < n.length; i++) {
    // console.log(n[i])

    // const size = Math.random() * (maxWH * 0.15);
    // //minus half the size from x,y
    // //so they can overlap left and top of screen, not just bottom and right.
    // const x = Math.random() * width - size / 2;
    // const y = Math.random() * height - size / 2;
    // //random rgba colour
    // ctx.fillStyle = `rgba(${randomInteger()},${randomInteger()},${randomInteger()},${Math.random() * 0.4})`;
    // ctx.fillRect(x, y, size, size);
  // }
}

// function drawBoard(can, nRow, nCol,pattern) {
//   var ctx = can.getContext("2d");
//   var w = can.width;
//   var h = can.height;

//   nRow = nRow || 8;    // default number of rows
//   nCol = nCol || 8;    // default number of columns

//   w /= nCol;            // width of a block
//   h /= nRow;            // height of a block
//   console.log(pattern)
//   for (var i = 0,l = 0; i < nRow, l < pattern.length; ++i,l++) {
//     for (var j = 0,m = 0, col = nCol / 2; j < col,m < pattern[i].length; ++j,m++) {
//       // console.log(pattern[i][j])      
//       // ctx.fillRect(2 * j * w + (i % 2 ? 0 : w), i * h, w, h);
//       ctx.fillText(pattern[l][m], j * w , i * h);
//     }
//   }
//   ctx.fill();
// }

function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] == 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else if (i == key && obj[key] == val) {
      objects.push(obj);
    }
  }
  return objects;
}

//Changing the color and size of the balls
function drawPlayer() {
  ctx.beginPath();
  ctx.arc(255, 30, cellSize / 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = "green";
  ctx.fill();
}

function pointer(x,y) { 
  ctx.beginPath();  
  ctx.arc(previousPostiton.x, previousPostiton.y, cellSize / 4, 0, 2 * Math.PI, false);  
  ctx.fillStyle = "white";  
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, cellSize / 4, 0, 2 * Math.PI, false);
  ctx.fillStyle = "black";
  ctx.fill();
}

function findFromArray(x,y) {
  for (var i = 0; i < layout.length; i++) {
    if ((layout[i].x == x) && (layout[i].y == y ) ){
        return layout[i]
      }
  }
}

window.addEventListener("keydown", function (e) {

  var value = e.which;

  if (value === 37) moveWest(), e.preventDefault();
  if (value === 38) moveNorth(), e.preventDefault();
  if (value === 39) moveEast(), e.preventDefault();
  if (value === 40) moveSouth(), e.preventDefault();

  return false;

});

function moveWest() {
  previousPostiton["x"] = position.x
  previousPostiton["y"] = position.y

  console.log(findFromArray(position.y,position.x))

  if (findFromArray(position.y, position.x - 15) && findFromArray(position.y, position.x - 15).pattern !== 0){
    pointer(position.x -= 15, position.y)
  }else{
    console.log('findFromArray pattern',findFromArray(position.y, position.x).pattern)
  }

  if (position.x == 255 && position.y == 30){
    alert("gotcha")
  }
  console.log('position',position)
}

function moveNorth() {

  previousPostiton["x"] = position.x
  previousPostiton["y"] = position.y

  console.log(findFromArray(position.y, position.x))
  
  if (findFromArray(position.y - 15, position.x) && findFromArray(position.y - 15, position.x).pattern !== 0) {
    pointer(position.x, position.y -= 15) 
  } else {
    console.log('findFromArray pattern', findFromArray(position.y, position.x).pattern)
  }

  if (position.x == 255 && position.y == 30) {
    alert("gotcha")
  }
  console.log('position', position)  
  
}

function moveEast() {
  previousPostiton["x"] = position.x
  previousPostiton["y"] = position.y

  console.log(findFromArray(position.y, position.x))
  
  if (findFromArray(position.y, position.x + 15) && findFromArray(position.y, position.x + 15).pattern !== 0) {
    pointer(position.x += 15, position.y)  
  } else {
    console.log('findFromArray pattern', findFromArray(position.y, position.x).pattern)
  }

  if (position.x == 255 && position.y == 30) {
    alert("gotcha")
  }
  console.log('position', position)  

}

function moveSouth() {

  previousPostiton["x"] = position.x
  previousPostiton["y"] = position.y

  console.log(findFromArray(position.y, position.x))
  if (findFromArray(position.y + 15, position.x) && findFromArray(position.y + 15, position.x).pattern !== 0) {
    pointer(position.x, position.y += 15)  
  } else {
    console.log('findFromArray pattern', findFromArray(position.y, position.x).pattern)
  }


  if (position.x == 255 && position.y == 30) {
    alert("gotcha")
  }
  console.log('position', position)  

}

function InitializeGame() {
  initializeCanvas();
  drawPlayer();
  pointer(position.x, position.y)  
}

window.onload = function () {
  InitializeGame();
};


// Notice there is no 'import' statement. 'tf' is available on the index-page
// because of the script tag above.

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

// Generate some synthetic data for training.
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Train the model using the data.
model.fit(xs, ys, { epochs: 10 }).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  // Open the browser devtools to see the output
  model.predict(tf.tensor2d([5], [1, 1])).print();
});

// var img = new Image();
// img.src = "https://static1.squarespace.com/static/560b436ce4b0a5bb18fa1a3f/t/59015d4729687fd0ac16688d/1493261656535/";
// img.onload = function () {
//   var matrix = detect(this, img.width, img.height);
//   console.log(matrix);
// };

// function detect(img, width, height) {

//   var matrix = [],
//     canvas = document.getElementById('canvasEL'),
//     ctx = canvas.getContext('2d');

//   ctx.drawImage(img, 0, 0, width, height);

//   for (var i = 0; i < width; i++) {
//     matrix[i] = [];
//     for (var j = 0; j < height; j++) {
//       var imageData = ctx.getImageData(i, j, 1, 1);
//       var data = imageData.data;
//       matrix[i][j] = (data[0] == 255 && data[1] == 0 && data[2] == 0 && data[3] == 255) ? 1 : 0;
//     }
//   }
//   return matrix;
// }