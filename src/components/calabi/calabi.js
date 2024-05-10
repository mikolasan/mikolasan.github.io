import * as d3 from 'd3';
import * as math from 'mathjs';
import * as THREE from 'three';
import { Face } from 'three/addons/math/ConvexHull.js';

const rect = function(v1, v2, v3, v4, material) {
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  // add vertices
  [v1, v2, v3, v4].forEach(v => planeGeometry.vertices.push(v));
  // add faces
  planeGeometry.faces.push(new Face.create(0, 1, 2));
  planeGeometry.faces.push(new Face.create(2, 3, 0));
  planeGeometry.computeFaceNormals();
  // mesh
  const plane = new THREE.Mesh( planeGeometry, material );
  return plane;
}

const normalRect = function(v1, v2, v3, v4) {
  // material
  const normalMaterial = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
  })
  // mesh
  return rect(v1, v2, v3, v4, normalMaterial);
}

const addCalabiYau = function(n, a) {
  function coordinate(x, y, n, k1, k2, a) {
    const z1 = math.multiply(
      math.exp(math.complex(0, 2 * math.pi * k1 / n)),
      math.pow(math.cos(math.complex(x, y)), 2 / n)
    );
    const z2 = math.multiply(
      math.exp(math.complex(0, 2 * math.pi * k2 / n)),
      math.pow(math.sin(math.complex(x, y)), 2 / n)
    );
    return new THREE.Vector3(
      z1.re, 
      z2.re, 
      z1.im * math.cos(a) + z2.im * math.sin(a));
  }
  const PI_2 = Math.PI / 2;
  const dx = math.pi / 10;
  const dy = math.pi / 10;
  const meshes = [];
  for (let k1 = 0; k1 < n; ++k1) {
    for (let k2 = 0; k2 < n; ++k2) {
      for (let x = 0; x <= PI_2; x += dx) {
        for (let y = -PI_2; y < PI_2; y += dy) {
          meshes.push(normalRect(
            coordinate(x, y, n, k1, k2, a),
            coordinate(x + dx, y, n, k1, k2, a),
            coordinate(x + dx, y + dy, n, k1, k2, a),
            coordinate(x, y + dy, n, k1, k2, a)
          ));
        }
      }
    }
  }
};

export { addCalabiYau };