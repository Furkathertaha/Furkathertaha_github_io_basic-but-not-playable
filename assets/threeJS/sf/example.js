var runtime = new ShaderFrogRuntime(),
    width = window.innerWidth,//800,
    height = window.innerHeight,//600,
    clock = new THREE.Clock(),
    camera, cubeCamera, scene, renderer, cubeCamera, leftSphere, rightSphere;

init();
animate();

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
    camera.position.z = 30;
    camera.position.x = 0;
    camera.position.y = 5;
    scene.add(camera);
    runtime.registerCamera( camera );

    const loader = new THREE.STLLoader();

    ///////////////////////////////////////////////////////////////////////////////
    loader.load(
        'https://bytes.usc.edu/~saty/tools/xem/x/THREE-STLLoader/models/colored.stl',
        function(geometry) {
            mesh = new THREE.Mesh(geometry); //, material)
            //mesh.scale.set(.1,.1,.1);

            runtime.load([
                'Fork_of_New_Composed_Shader.json'
                //'Fork_of_New_Composed_Shader2.json'
                //'GradientPaintingShader.json'
            ], function(shaders) {

                // `shaders` will be an array with the material data in the same order you
                // specified when calling `load
                // ShaderFrog shader 
                mtl = runtime.get(shaders[0].name);

                mesh.material = mtl;
            });
            scene.add(mesh);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    );// load()
    ///////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////
    // another
    loader.load(
        'https://bytes.usc.edu/~saty/tools/xem/x/THREE-STLLoader/models/megazord.stl',
        function(geometry) {
            mesh2 = new THREE.Mesh(geometry); //, material)
            //mesh.scale.set(.1,.1,.1);
            mesh2.scale.set(0.1,0.1,0.1);//=0.1;
            mesh2.position.y = -10;

            // Load multiple ShaderFrog shaders
            runtime.load([
                'Funny_Bunny.json'
                //'GradientPaintingShader.json'
            ], function(shaders) {

                // `shaders` will be an array with the material data in the same order you
                // specified when calling `load
                // ShaderFrog shader 
                mtl2 = runtime.get(shaders[0].name);

                mesh2.material = mtl2;
            });
            scene.add(mesh2);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    );// load()
    ///////////////////////////////////////////////////////////////////////////////

    var topGeometry = new THREE.SphereGeometry( 3, 20, 20 );
    meshTop = new THREE.Mesh( topGeometry );
    meshTop.position.y = 15;
    runtime.load([
        //'GradientPaintingShader.json'
        'Fork_of_New_Composed_Shader2.json'
        //'Fork_of_New_Composed_Shader.json'
    ], function(shaders) {
        mtlt = runtime.get(shaders[0].name);
        mtlt.uniforms.wavetexture.value = new THREE.ImageUtils.loadTexture('./test.png');
        meshTop.material = mtlt;
    });
    scene.add( meshTop );


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById('canvas').appendChild(renderer.domElement);

}

function animate() {
    requestAnimationFrame(animate);
    render();

}

function render() {
    var time = clock.getElapsedTime();
    runtime.updateShaders(time);
    camera.position.x = Math.cos(0.5*time)*30;
    camera.position.z = Math.sin(0.5*time)*30;
    camera.lookAt(new THREE.Vector3(0, 5, 0));
    renderer.render(scene, camera);
}