var points = [];
var sigma = 10, rho = 28, beta = 8/3;

var scaler = 8;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Initialize points with random positions
  for (var i = 0; i < 100; i++) {
    points[i] = {
      position: createVector(random(-20, 20), random(-20, 20), random(-20, 20)),
      trail: []
    };
  }
}

function draw() {
  background(0); // Clear the background
  rotateY(frameCount * 0);
  rotateX(frameCount * 0);

  // Update and draw points
  for (var i = 0; i < points.length; i++) {
    updatePoint(points[i], 0.01);
    drawPoint(points[i]);
  }
}

function updatePoint(point, dt) {
  var dx = sigma * (point.position.y - point.position.x);
  var dy = point.position.x * (rho - point.position.z) - point.position.y;
  var dz = point.position.x * point.position.y - beta * point.position.z;

  point.position.x += dx * dt;
  point.position.y += dy * dt;
  point.position.z += dz * dt;

  point.trail.push(point.position.copy());
  if (point.trail.length > 50) {
    point.trail.shift();
  }
}

function drawPoint(point) {
  push();
  translate(point.position.x* scaler, point.position.y* scaler, point.position.z* scaler);
  fill(255);
  noStroke();
  sphere(1); // Draw a sphere at the point's location
  pop();

  for (var i = 0; i < point.trail.length; i++) {
    var pos = point.trail[i];
    var alpha = map(i, 0, point.trail.length, 0, 255);
    push();
    translate(pos.x* scaler, pos.y* scaler, pos.z* scaler);
    fill(255, alpha);
    noStroke();
    sphere(0.5); // Draw a smaller, semi-transparent sphere at each previous position
    pop();
  }
}

