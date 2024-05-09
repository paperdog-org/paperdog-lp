let scene, camera, renderer;

document.addEventListener("DOMContentLoaded", function()
{
  initializeScene()

  // Load lights
  scene.add(new THREE.AmbientLight(0xfff4e6,0.5))
  const pointLightLeft = new THREE.PointLight(0xfef5e7, 1)
  pointLightLeft.position.set(1,1,1)
  scene.add(pointLightLeft)
  const pointLightRight = new THREE.PointLight(0xfdf5e6, 1)
  pointLightRight.position.set(2,2,2)
  scene.add(pointLightRight)
  const pointLightTop = new THREE.PointLight(0xfdf5e6, 1)
  pointLightTop.position.set(3,3,3)
  scene.add(pointLightTop)

  THREE.ImageUtils.crossOrigin = '';

   // Load textures
   const texture = new THREE.TextureLoader().load("pdogm3.jpg" )
   const materialTopBottom = new THREE.MeshStandardMaterial({
     map: texture,
     metalness:0.6,
     roughness:0.3,
   })
   const materialSides = new THREE.MeshStandardMaterial({
     color: 0xCAC1AB,
     metalness:0.6,
     roughness:0.3,
   })


   const canvas = document.createElement("canvas")
   const ctx = canvas.getContext("2d")
   canvas.width = 256
   canvas.height = 256
   const ftexture = new THREE.CanvasTexture(canvas)
   let ftext = "coming soon"
   let ftextInterval = setInterval(() => {
    switch(ftext) {
      case "": ftext = "Paper"; break;
      case "Paper": ftext = " "; break;
      case " ": ftext = "Dog"; break;
      default: ftext = ""; break;
    }
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#000000"
    ctx.font = "24px Menlo"
    ctx.fillText(ftext, 30, 135)
    ftexture.needsUpdate = true;
  }, 1000)

  const sideMaterial = new THREE.MeshStandardMaterial({
    map: ftexture,
    metalness: 0.6,
    roughness: 0.3
  })
   

  //const material = new THREE.MeshStandardMaterial({
  //  map: texture,
  //  metalness:0.337,
  //  roughness:1,
  //})


   // Create cylinder
   const radiusTop = 1.8;
   const radiusBottom = 1.8;
   const height = 0.18;
   const radialSegments = 100;
   const geometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments);
   const mesh = new THREE.Mesh(geometry, [materialSides, materialTopBottom, sideMaterial]);
  // Create mesh with the cylinder geometry and materials
  //const mesh = new THREE.Mesh(geometry,material)

  scene.add(mesh)
  camera.position.set(0,0,7)

  mesh.rotation.x = 1.5
  mesh.rotation.y = 1.5

  function animate()
  {
    mesh.rotation.x +=0.008
    mesh.rotation.y +=13.37
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
})

function initializeScene()
{
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({alpha: true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  scene.background = new THREE.Color( 0xeeebe2 );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize)
