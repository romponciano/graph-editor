import React from 'react';

export default class Tree extends React.Component {

  componentDidMount() {
    draw();
  }

  render() {
    return(
      <canvas id="canvas" 
        onMouseUp={(e) => {
          dragTarget = null;
          isDown = false;
        }} 
        onMouseOut={(e) => {
          dragTarget = null;
          isDown = false;
        }}
        onMouseMove={(e) => {
          if(!isDown) {
            return;
          }
          let mouseX = parseInt(e.clientX-offsetX);
          let mouseY = parseInt(e.clientY-offsetY);
          let dx = mouseX - startX;
          let dy = mouseY - startY;
          startX = mouseX;
          startY = mouseY;
          dragTarget.x += dx;
          dragTarget.y += dy;
          trueDraw();
        }}
        onMouseDown={(e) => {
          startX = parseInt(e.clientX - offsetX);
          startY = parseInt(e.clientY - offsetY);
          isDown = hit();
        }}
      ></canvas>
    )
  }
}

var canvas;
var context;
var offsetX;
var offsetY;
var isDown;
var startX;
var startY;
var dragTarget;

var boxes = [];
boxes.push({x: 50, y: 25, w: 75, h: 50});
boxes.push({x: 200, y: 100, w: 75, h: 50});

var conectors = [];
conectors.push({box1: 0, box2: 1});

function draw() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  offsetX = canvas.offsetLeft;
  offsetY = canvas.offsetTop;
  isDown = false;
  trueDraw();
}

function trueDraw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(let i=0; i < boxes.length; i++) {
    let box = boxes[i];
    context.fillRect(box.x, box.y, box.w, box.h);
  };

  for(let i=0; i < conectors.length; i++) {
    let conect = conectors[i];
    let box1 = boxes[conect.box1];
    let box2 = boxes[conect.box2];
    context.beginPath();
    context.moveTo(box1.x+box1.w/2, box1.y+box1.h/2);
    context.lineTo(box2.x+box2.w/2, box2.y+box2.h/2);
    context.stroke();
  };
}

function hit() {
  for(let i=0; i < boxes.length; i++) {
    let box = boxes[i];
    if(startX >= box.x && startX <= box.x+box.w && startY >= box.y && startY <= box.y+box.h) {
      dragTarget = box;
      return true;
    }
  }
  return false;
}