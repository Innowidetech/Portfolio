import React, { useEffect, useRef } from 'react';

const FluidEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl2');

    if (!gl) {
      console.error('WebGL2 is not supported in this browser.');
      return;
    }

    // Shader code
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
    const fragmentShaderSource = `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0);  // Set a simple color for testing
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`ERROR compiling shader: ${gl.getShaderInfoLog(shader)}`);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error(`ERROR linking program: ${gl.getProgramInfoLog(shaderProgram)}`);
      return;
    }

    gl.useProgram(shaderProgram);

    // Define the vertices for a full-screen quad
    const vertices = new Float32Array([
      1.0, 1.0,  // Bottom left
       1.0, 1.0,  // Bottom right
      1.0,  1.0,  // Top left
       1.0,  1.0   // Top right
    ]);

    // Create a buffer for the vertices
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(shaderProgram, 'position');
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear with black color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the full-screen quad
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  }, []);


  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // To ensure it stays behind content
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
};

export default FluidEffect;
