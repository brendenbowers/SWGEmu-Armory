/// <reference path="../../lib/angular-1.2.10/angular.js" />
/// <reference path="../../lib/angular-1.2.10/angular-resource.js" />
/// <reference path="../../lib/threejs/three.js" />

var module = angular.module('SWGEmuArmorySPA.Directive');

module.directive('scene3d', function ($log, $timeout, $rootScope) {

    function onRenderElmResize(staticWidth, staticHeight, renderer, camera, rendererEle) {


        if (angular.isDefined(staticWidth) && !isNaN(staticWidth) && staticWidth !== null) {
            WIDTH = staticWidth;
        }
        else {
            var WIDTH = rendererEle.width;
            if (angular.isUndefined(WIDTH) || !isNaN(WIDTH) || WIDTH !== null) {
                WIDTH = rendererEle.clientWidth;
            }
        }

        if (angular.isDefined(staticHeight) && !isNaN(staticHeight) && staticHeight !== null) {
            HEIGHT = staticHeight;
        }
        else {
            var HEIGHT = rendererEle.height;
            if (angular.isUndefined(HEIGHT) || !isNaN(HEIGHT) || HEIGHT !== null) {
                HEIGHT = rendererEle.clientHeight;
            }

        }

        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    }


    function animate(renderer, controls, scene, camera, scope) {
        requestAnimationFrame(function () { animate(renderer, controls, scene, camera, scope); });
        if (controls)
            controls.update();
        render(renderer, scene, camera);
    }

    function stopAnimate(requestAnimationFrameId) {
        //window.cancelAnimationFrame(requestAnimationFrameId);
        window.cancelAnimationFrame();
    }

    function render(renderer, scene, camera) {
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    function makeRenderer(rendererEle) {
        var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererEle.appendChild(renderer.domElement);
        renderer.setClearColor(0x778899);
        return renderer;
    }

    function makeControls(camera, renderer) {
        return new THREE.OrbitControls(camera, renderer.domElement);
    }

    function loadFromJS(item, scope) {
        scope.loader.load(item, function (geometry, materials) {

            if (scope.mesh !== null) {
                scope.scene.remove(scope.mesh);
            }

            scope.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
            scope.scene.add(scope.mesh);
            
        });
    }

    return {
        replace: false,
        restrict: 'A',
        scope : true,
        link: function (scope, elem, attr, ctrl) {
            scope.scene = new THREE.Scene();
            scope.scene.add(new THREE.AmbientLight(0xffffff));

            scope.staticWidth = angular.isDefined(attr.width) ? parseFloat(attr.width) : null;
            scope.staticHeight = angular.isDefined(attr.height) ? parseFloat(attr.height) : null;

            scope.rendererEle = elem[0];
            scope.rendererEle.addEventListener('resize', function () { onRenderElmResize(scope.staticWidth, scope.staticHeight, scope.renderer, scope.camera); }, false);

            scope.renderer = makeRenderer(scope.rendererEle);
            scope.loader = new THREE.SceneLoader();

            //API
            scope.animate = function () { animate(scope.renderer, scope.controls, scope.scene, scope.camera); }
            scope.stopAnimate = function () { stopAnimate(scope.requestAnimationFrameID); };
            scope.getControls = function () { return controls; };
            scope.getCamera = function () { return camera; };
            scope.getLoader = function () { return loader; };

            scope.$on('$destroy', function () {
                destroy();
            });

            attr.$observe('meshPath', function (newval, oldval) {
                if (angular.isDefined(newval) && newval !== '') {

                    scope.loader.load(newval, function (loadedData) {
                        scope.model = loadedData;
                        scope.scene = loadedData.scene;

                        scope.scene.add(new THREE.AmbientLight(0xffffff));

                        scope.camera = loadedData.currentCamera;

                        if (angular.isUndefined(scope.camera)) {
                            scope.camera = loadedData.cameras.Camera;
                        }
                       

                        scope.controls = new THREE.OrbitControls(scope.camera, scope.renderer.domElement);


                        onRenderElmResize(scope.staticWidth, scope.staticHeight, scope.renderer, scope.camera, scope.rendererEle);
                        animate(scope.renderer, scope.controls, scope.scene, scope.camera);

                        scope.controls.addEventListener('change', function () { render(scope.renderer); });

                    });

                }
            });

            function destroy() {
                // remove the obj added to the scene
                if (scope.scene) {

                    var obj, i;
                    for (i = scope.scene.children.length - 1; i >= 0 ; i--) {
                        obj = scope.scene.children[i];
                        scope.scene.remove(obj);
                    }
                }
                // remove obj helpers
                while (THREE.Object3DLibrary.length) {
                    var obj = THREE.Object3DLibrary[0];
                    obj.deallocate();
                    obj = null;
                }
                if (scope.scene) {
                    while (scope.scene.__objectsRemoved.length) {
                        scope.scene.__objectsRemoved.splice(0, 1);
                    }
                }

                scope.scene = null;
                scope.camera = null;
                scope.renderer = null;
                scope.controls.destroy();
                scope.controls = null;                
                scope.rendererEle.removeEventListener('resize', onRenderElmResize);
            }

        }
    }


});