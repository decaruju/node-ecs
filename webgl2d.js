const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;
    uniform vec2 u_resolution;

    varying vec2 v_texcoord;

  void main() {
    gl_Position = vec4(2.0*a_position/u_resolution-1.0, 0, 1);
    v_texcoord = a_texcoord;
  }
`

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_texcoord;
  uniform sampler2D u_texture;

  void main() {
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }

`

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}


function quadTrianglesPositions(position, size) {
    return [
        position[0] - size[0]/2, position[1] - size[1]/2,
        position[0] + size[0]/2, position[1] - size[1]/2,
        position[0] - size[0]/2, position[1] + size[1]/2,
        position[0] + size[0]/2, position[1] - size[1]/2,
        position[0] + size[0]/2, position[1] + size[1]/2,
        position[0] - size[0]/2, position[1] + size[1]/2,
    ];
}

window.initWebGL2D = function(canvasId) {
    const canvas = document.querySelector(canvasId);
    const gl = canvas.getContext("webgl");
    if (!gl) {
        console.log("could not initialize webgl context on canvas")
        return;
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    const program = createProgram(gl, vertexShader, fragmentShader);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.useProgram(program);
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const texcoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord");
    const textureUniformLocation = gl.getUniformLocation(program, "u_texture");

    return {
        gl,
        program,
        positionAttributeLocation,
        drawQuad(position, size, textureInfo) {
            gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture)
            gl.uniform1i(textureUniformLocation, 0);

            const positions = quadTrianglesPositions(position, size);

            const positionBuffer = gl.createBuffer();
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

            const texcoordBuffer = gl.createBuffer();
            gl.enableVertexAttribArray(texcoordAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
            gl.vertexAttribPointer(texcoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

            gl.drawArrays(gl.TRIANGLES, 0, positions.length/2);
        },
        clearCanvas() {
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        createTexture(src) {
            var tex = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, tex);

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            var textureInfo = {
                width: 0,
                height: 0,
                texture: tex,
            };
            var img = new Image();
            img.addEventListener('load', function() {
                textureInfo.width = img.width;
                textureInfo.height = img.height;

                gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            });
            img.src = src;
            return textureInfo;
        }
    }

}
