function setup() {
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    initLorenzSystem();
}
        
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Lorenz System Constants
const a = 10;
const b = 28;
const c = 8/3;
let x = 0.01, y = 0, z = 0;
let points = [];

function initLorenzSystem() {
    background(0, 0, 0, 255);
    colorMode(HSB);
}

function draw() {
    translate(width / 2, height / 2, -width / 2);
    scale(width / 150); // Adjust this value to control the size
    rotateX(PI / 4);

    let dt = 0.01;
    let dx = (a * (y - x)) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;

    x += dx;
    y += dy;
    z += dz;

    points.push(createVector(x, y, z));

    strokeWeight(2);
    noFill();

    let hue = 0;

    beginShape();
    for (let v of points) {
        stroke(hue, 255, 255);
        vertex(v.x, v.y, v.z);
        hue += 0.1;
        if (hue > 255) {
            hue = 0;
        }
    }
    endShape();
}

