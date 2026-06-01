import { onCleanup, onMount, createEffect, type Accessor } from "solid-js";
import { Engine, Scene } from "babylonjs";

export interface UseBabylonReturn {
  engine: Engine;
  scene: Scene;
  canvasRef: (el: HTMLCanvasElement) => void;
}

/**
 * Creates a Babylon.js Engine and Scene bound to a canvas ref.
 * Takes demoId as invalidation key: when it changes, dispose old scene, create new.
 */
export function useBabylon(
  demoId: Accessor<string>,
  setupScene: Accessor<((scene: Scene, engine: Engine) => void) | undefined>
): UseBabylonReturn {
  let canvas: HTMLCanvasElement | undefined;
  let engine: Engine | undefined;
  let scene: Scene | undefined;

  const canvasRef = (el: HTMLCanvasElement) => {
    canvas = el;
  };

  function disposeEngine() {
    engine?.dispose();
    engine = undefined;
    scene = undefined;
  }

  function createEngine(fn?: (scene: Scene, engine: Engine) => void) {
    if (!canvas) return;
    disposeEngine();
    engine = new Engine(canvas, true, { preserveDrawingBuffer: true });
    scene = new Scene(engine);
    fn?.(scene, engine);
    engine.runRenderLoop(() => scene?.render());
  }

  onMount(() => {
    const handleResize = () => engine?.resize();
    window.addEventListener("resize", handleResize);

    createEffect(() => {
      // Track demoId — when it changes, this effect re-runs
      const id = demoId();
      const fn = setupScene();
      if (canvas) {
        createEngine(fn);
      }
    });

    onCleanup(() => {
      window.removeEventListener("resize", handleResize);
      disposeEngine();
    });
  });

  return {
    get engine() {
      if (!engine) throw new Error("Engine not yet initialized");
      return engine;
    },
    get scene() {
      if (!scene) throw new Error("Scene not yet initialized");
      return scene;
    },
    canvasRef,
  };
}