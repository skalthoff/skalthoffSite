var slider = document.getElementById('slider');
var canvasContainer = document.getElementById('canvas-container');
var leftButton = document.getElementById('left-button');
var rightButton = document.getElementById('right-button');

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create();
var sliderBody = Bodies.rectangle(150, 150, 20, 20, { inertia: 10, frictionAir: 0.2 });

World.add(engine.world, [sliderBody]);
Engine.run(engine);

function applyForce(direction) {
    var force = { x: 0.05 * direction, y: 0 };
    Matter.Body.applyForce(sliderBody, sliderBody.position, force);
}

function stopMotion() {
    Matter.Body.setVelocity(sliderBody, { x: 0, y: 0 });
}

leftButton.addEventListener('click', function() {
    applyForce(-1);
});

rightButton.addEventListener('click', function() {
    applyForce(1);
});

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            applyForce(-1);
            break;
        case 'ArrowRight':
            applyForce(1);
            break;
        case 'ArrowDown':
            stopMotion();
            break;
    }
});

function update() {
    var boxWidth = canvasContainer.offsetWidth;
    var sliderWidth = slider.offsetWidth;
    
    // Ensure the slider's x position stays within the box's bounds
    var x = Math.max(0, Math.min(sliderBody.position.x, boxWidth - sliderWidth));
    
    // Set the slider's position
    slider.style.left = x + 'px';
    
    // Calculate the slider's position as a percentage of the box's width
    var sliderPositionPercent = (x / boxWidth) * 100;
    console.log('Slider position: ' + sliderPositionPercent + '%');

    requestAnimationFrame(update);
}

window.addEventListener('resize', function() {
    // Update the canvas container's dimensions to fit the viewport
    canvasContainer.style.width = window.innerWidth + 'px';
    canvasContainer.style.height = window.innerHeight + 'px';
});

update();
