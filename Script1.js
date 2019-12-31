// JavaScript source code
html, body {
    height: 100 %;
}

html {
    background: #eee;
}

body {
    display: flex;
    justify - content: center;
    align - items: center;
}

.box {
    width: 300px;
    height: 300px;
    border - radius: 5px;
    box - shadow: 0 2px 30px rgba(black, .2);
    background: lighten(#f0f4c3, 10 %);
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
}



var image = document.querySelector('img');
var imageCanvas = document.createElement('canvas');
var imageCanvasContext = imageCanvas.getContext('2d');
var lineCanvas = document.createElement('canvas');
var lineCanvasContext = lineCanvas.getContext('2d');
var pointLifetime = 1000;
var points = [];

if (image.complete) {
    start();
} else {
    image.onload = start;
}

/**
 * Attaches event listeners and starts the effect.
 */
function start() {
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resizeCanvases);
    document.body.appendChild(imageCanvas);
    resizeCanvases();
    tick();
}

/**
 * Records the user's cursor position.
 *
 * @param {!MouseEvent} event
 */
function onMouseMove(event) {
    points.push({
        time: Date.now(),
        x: event.clientX,
        y: event.clientY
    });
}

/**
 * Resizes both canvases to fill the window.
 */
function resizeCanvases() {
    imageCanvas.width = lineCanvas.width = window.innerWidth;
    imageCanvas.height = lineCanvas.height = window.innerHeight;
}

/**
 * The main loop, called at ~60hz.
 */
function tick() {
    // Remove old points
    points = points.filter(function (point) {
        var age = Date.now() - point.time;
        return age < pointLifetime;
    });

    drawLineCanvas();
    drawImageCanvas();
    requestAnimationFrame(tick);
}

/**
 * Draws a line using the recorded cursor positions.
 *
 * This line is used to mask the original image.
 */
function drawLineCanvas() {
    var minimumLineWidth = 25;
    var maximumLineWidth = 100;
    var lineWidthRange = maximumLineWidth - minimumLineWidth;
    var maximumSpeed = 50;

    lineCanvasContext.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
    lineCanvasContext.lineCap = 'round';
    lineCanvasContext.shadowBlur = 30;
    lineCanvasContext.shadowColor = '#000';

    for (var i = 1; i < points.length; i++) {
        var point = points[i];
        var previousPoint = points[i - 1];

        // Change line width based on speed
        var distance = getDistanceBetween(point, previousPoint);
        var speed = Math.max(0, Math.min(maximumSpeed, distance));
        var percentageLineWidth = (maximumSpeed - speed) / maximumSpeed;
        lineCanvasContext.lineWidth = minimumLineWidth + percentageLineWidth * lineWidthRange;

        // Fade points as they age
        var age = Date.now() - point.time;
        var opacity = (pointLifetime - age) / pointLifetime;
        lineCanvasContext.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';

        lineCanvasContext.beginPath();
        lineCanvasContext.moveTo(previousPoint.x, previousPoint.y);
        lineCanvasContext.lineTo(point.x, point.y);
        lineCanvasContext.stroke();
    }
}

/**
 * @param {{x: number, y: number}} a
 * @param {{x: number, y: number}} b
 * @return {number} The distance between points a and b
 */
function getDistanceBetween(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

/**
 * Draws the original image, masked by the line drawn in drawLineToCanvas.
 */
function drawImageCanvas() {
    // Emulate background-size: cover
    var width = imageCanvas.width;
    var height = imageCanvas.width / image.naturalWidth * image.naturalHeight;

    if (height < imageCanvas.height) {
        width = imageCanvas.height / image.naturalHeight * image.naturalWidth;
        height = imageCanvas.height;
    }

    imageCanvasContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    imageCanvasContext.globalCompositeOperation = 'source-over';
    imageCanvasContext.drawImage(image, 0, 0, width, height);
    imageCanvasContext.globalCompositeOperation = 'destination-in';
    imageCanvasContext.drawImage(lineCanvas, 0, 0);
}


.wave {
    opacity: .4;
    position: absolute;
    top: 3 %;
    left: 50 %;
    background: #0af;
    width: 500px;
    height: 500px;
    margin - left: -250px;
    margin - top: -250px;
    transform - origin: 50 % 48 %;
    border - radius: 43 %;
    animation: drift 3000ms infinite linear;
}

.wave.- three {
    animation: drift 5000ms infinite linear;
}

.wave.- two {
    animation: drift 7000ms infinite linear;
    opacity: .1;
    background: yellow;
}

.box: after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    width: 100 %;
    height: 100 %;
    background: linear - gradient(to bottom, rgba(#e8a, 1), rgba(#def, 0) 80 %, rgba(white, .5));
    z - index: 11;
    transform: translate3d(0, 0, 0);
}

.title {
    position: absolute;
    left: 0;
    top: 0;
    width: 100 %;
    z - index: 1;
    line - height: 300px;
    text - align: center;
    transform: translate3d(0, 0, 0);
    color: white;
    text - transform: uppercase;
    font - family: 'Playfair Display', serif;
    letter - spacing: .4em;
    font - size: 24px;
    text - shadow: 0 1px 0 rgba(black, .1);
    text - indent: .3em;
}
@keyframes drift {
    from { transform: rotate(0deg); }
    from { transform: rotate(360deg); }
}
