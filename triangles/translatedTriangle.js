//Shape translation
//newX = Px + Tx, newY = Py + Ty, newZ = Pz + Tz, newW = Pw + Tw

// Vertex shader 
var VSHADER_SOURCE3 = 
    'attribute vec4 a_Position; \n' +
    'uniform vec4 u_Translation; \n' +
    'void main() {\n' +
    '   gl_Position = a_Position + u_Translation;\n' +
    '}\n';

// fragment shader
var FSHADER_SCOURCE3 = 
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
    '}\n';

// The translation distance for x, y, and z direction
var Tx = 0.5, Ty = 0.5, Tz = 0.0;

function translatedTriangle() {
    canvas = document.getElementById("translatedTriangle");
    gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE3, FSHADER_SCOURCE3)) {
        console.log('failed to initialize canvas');
        return;
    }

    // set vertex position
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("failed to get position of vertices");
        return;
    }

    //Pass the translation distance to the vertex shader
    var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation')
    gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
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