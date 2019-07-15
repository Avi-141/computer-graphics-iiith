var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Particle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
    }

    static random() {
        var random = function(min, max) {
            return Math.floor(min + Math.random() * (max - min));
        }

        var x = random(0.0, window.innerWidth);
        var y = random(0.0, window.innerHeight);

        var vx = random(-3.0, 4.0);
        var vy = random(-3.0, 4.0);

        return new Particle(x, y, vx, vy);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.vx *= -1;
        }
        if (this.y < 0) {
            this.vy *= -1;
        }
        if (this.x > window.innerWidth) {
            this.vx *= -1;
        }
        if (this.y > window.innerHeight) {
            this.vy *= -1;
        }
    }
}

function getFactor() {
    var isRetina = (window.devicePixelRatio > 1);

    var isIOS = ((ctx.webkitBackingStorePixelRatio < 2) || (ctx.webkitBackingStorePixelRatio == undefined));

    if (isRetina && isIOS) {
        return 2;	
    } else {
        return 1;
    }
}

function createRandomLines(numberOfLines) {
    var lines = [];

    for(var i = 0; i < numberOfLines; i++) {
        var a = Particle.random();
        var b = Particle.random();

        lines.push([a, b]);
    }

    return lines;
}
var factor = getFactor();

var lines = createRandomLines(6);

var frame_width = 200.;
var frame_height = 200.;

function loop() {
    clear();
    draw();
    update();
   queue();
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    canvas.width = window.innerWidth * factor;
    canvas.height = window.innerHeight * factor;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(factor, factor);

    var frame_left = (window.innerWidth - frame_width) * 0.5;
    var frame_right = (window.innerWidth + frame_width) * 0.5;
    var frame_top = (window.innerHeight - frame_height) * 0.5;
    var frame_bottom = (window.innerHeight + frame_height) * 0.5;

    ctx.save();
    ctx.shadowBlur=30;
    ctx.shadowColor="rgb(200,200,200)";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(frame_left, frame_top, frame_width, frame_height);
    ctx.fill();
    ctx.restore();

    var clipper = new Clipper(Point(frame_left, frame_top),
        Point(frame_right, frame_bottom));

    for (var i = 0; i < lines.length; i++) {
        var [a, b] = lines[i]

        ctx.save();
        ctx.strokeStyle="rgb(180,180,180)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();

        var [result, a, b] = clipper.clipLine(a, b);

        if (result < 0) {
            continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.restore();
    }
}

function update() {
    for (var i = 0; i < lines.length; i++) {
        var [a, b] = lines[i]
        a.update();
        b.update();
    }
}

function queue() {
    window.requestAnimationFrame(loop);
}

loop();
"use strict";

function main() {
  // Get A WebGL context
  /** @type {HTMLCanvasElement} */
  var canvas = document.getElementById("Canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // setup GLSL program
  var program = webglUtils.createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);
  gl.useProgram(program);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // lookup uniforms
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Create a buffer to put three 2d clip space points in
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(now) {
    now *= 0.001; // convert to seconds

    resize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation, size, type, normalize, stride, offset);

    // Set Geometry.
    var radius = Math.sqrt(gl.canvas.width * gl.canvas.width + gl.canvas.height * gl.canvas.height) * 0.5;
    var angle = now;
    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;
    var centerX = gl.canvas.width  / 2;
    var centerY = gl.canvas.height / 2;
    setGeometry(gl, centerX + x, centerY + y, centerX - x, centerY - y);

    // Compute the matrices
    var projectionMatrix = m3.projection(gl.canvas.width, gl.canvas.height);

    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, projectionMatrix);

    // Draw in red
    gl.uniform4fv(colorLocation, [1, 0, 0, 1]);

    // Draw the geometry.
    var primitiveType = gl.LINES;
    var offset = 0;
    var count = 2;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(drawScene);
  }

  function resize(canvas) {
    // Lookup the size the browser is displaying the canvas.
    var displayWidth  = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width  !== displayWidth ||
        canvas.height !== displayHeight) {

      // Make the canvas the same size
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
  }
}

main();
