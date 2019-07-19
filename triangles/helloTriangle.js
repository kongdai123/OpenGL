// Vertex shader 
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'void main() {\n' +
    '   gl_Position = a_Position;\n' +
    '}\n';

// fragment shader
var FSHADER_SCOURCE = 
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
    '}\n';

function helloTriangle() {
    canvas = document.getElementById("helloTriangle");
    gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SCOURCE)) {
        console.log('failed to initialize canvas');
        return;
    }

    // set vertex position
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("failed to get position of vertices");
        return;
    }

    gl.drawArrays(gl.TRIANGLES, 0 ,n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("failed to create buffer");
        return - 1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;


}