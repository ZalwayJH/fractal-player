import * as THREE from 'three'
import { throttle } from 'lodash'
import { FRAGMENT_SHADER } from '../fragmentShader'

let uniforms
let aspect = window.innerWidth / window.innerHeight
let zoom = 4.0
let offset = new THREE.Vector2(-2.0 * aspect, -2.0)
let scene
let camera
let renderer

const createMesh = () => {
  const geometry = new THREE.PlaneGeometry(2, 2)
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: FRAGMENT_SHADER
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}

const setupScene = () => {
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  createMesh()
}

const attachToDOM = () => {
  const element = document.getElementById('canvas')
  if (element) {
    element.appendChild(renderer.domElement)
  } else {
    console.log('uh oh')
  }
}

// const scroll = (event) => {
//   const zoom_0 = zoom
//   if (navigator.userAgent.indexOf('Firefox') != -1) {
//     zoom *= 1 + event.deltaY * 0.003
//   } else {
//     zoom *= 1 + event.deltaY * 0.001
//   }
//   const space = zoom - zoom_0
//   const mouseX = event.clientX / window.innerWidth
//   const mouseY = 1 - event.clientY / window.innerHeight
//   offset = offset.add(new THREE.Vector2(-mouseX * space * aspect, -mouseY * space))
//   uniforms.zoom.value = zoom
//   uniforms.offset.value = offset
//   render()
// }

const subscribeEvents = () => {
  document.addEventListener('wheel', scroll)
}

const update = (params) => {
  uniforms.a.value = 0
  uniforms.b.value = 0
  uniforms.c.value = 0
  uniforms.d.value = 0
  uniforms.e.value = 0
  uniforms.f.value = 0
}

const updateColors = (color_scheme) => {
  uniforms.color_scheme.value = color_scheme
}

const render = () => {
  renderer.render(scene, camera)
}

const Main = (props) => {
  uniforms = {
    res: { type: 'vec2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    aspect: { type: 'float', value: aspect },
    zoom: { type: 'float', value: zoom },
    offset: { type: 'vec2', value: offset },
    color_scheme: { type: 'int', value: props.color_scheme },
    a: { type: 'float', value: 0 },
    b: { type: 'float', value: 0 },
    c: { type: 'float', value: 0 },
    d: { type: 'float', value: 0 },
    e: { type: 'float', value: 0 },
    f: { type: 'float', value: 0 }
  }
  setupScene()
  // subscribeEvents()
  attachToDOM()
  render()
}

export default Main
