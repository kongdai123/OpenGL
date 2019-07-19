//The rotating transition (counter clockwise)
// x' = x * cos(T) - y * sin(T)
// y' = x * sin(T) + y * cos(T) 

// Vertex shader 
var VSHADER_SOURCE4 = 
    'attribute vec4 a_Position; \n' +
    'uniform mat4 u_xformMatrix; \n' + 
    // 'uniform float u_cos, u_sin; \n' +
    'void main() {\n' +
    '    gl_Position =  u_xformMatrix * a_Position;\n' + 
    // '   gl_Position.x = a_Position.x * u_cos - a_Position.y * u_sin;\n' +
    // '   gl_Position.y = a_Position.x * u_sin + a_Position.y * u_cos;\n' +
    // '   gl_Position.z = a_Position.z;\n' + 
    // '   gl_Position.w = 1.0;\n' + 
    '}\n';

// fragment shader
var FSHADER_SCOURCE4 = 
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' +
    '}\n';


var angle = 90.0;

function rotatingTriangle() {
    canvas = document.getElementById("rotatingTriangle");
    gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE4, FSHADER_SCOURCE4)) {
        console.log('failed to initialize canvas');
        return;
    }

    // set vertex position
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("failed to get position of vertices");
        return;
    }

    // calculate sin and cos from radian value of angle

    var radian = Math.PI * angle/ 180.0;
    var cos = Math.cos(radian);
    var sin = Math.sin(radian);
    
    var xformMatrix = new Float32Array([
        cos, sin, 0.0, 0.0,
        -sin, cos, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ]);
    // fetch and pass on cos and sin values
    // var u_cos = gl.getUniformLocation(gl.program, 'u_cos');
    // var u_sin = gl.getUniformLocation(gl.program, 'u_sin');
    // gl.uniform1f(u_cos, cos);
    // gl.uniform1f(u_sin, sin);

    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

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