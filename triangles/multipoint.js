// Vertex shader 
var VSHADER_SOURCE = 
    'attribute vec4 a_Position; \n' +
    'void main() {\n' +
    '   gl_Position = a_Position;\n' +
    '   gl_PointSize = 10.0;\n' +
    '}\n';

// fragment shader
var FSHADER_SCOURCE = 
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
    '}\n';

function main() {
    var canvas = document.getElementById("multipoint");

    var gl = getWebGLContext(canvas);

    if(!(initShaders(gl, VSHADER_SOURCE, FSHADER_SCOURCE))) {
        console.log("failed to initialize shaders");
        return;
    }

    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to get position of vertices');
        return;
    }

    gl.drawArrays(gl.POINTS, 0, n);

}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3;
    
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // bind buffer to target 
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // write buffer data into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    // assign the buffer object to a_position
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // enable the assignment to a_position variable
    gl.enableVertexAttribArray(a_Position);
    return n;
}