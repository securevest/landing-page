"use client";

import { useEffect, useRef } from "react";
import type { WebGLRenderer } from "three";

/**
 * Decorative 3D coin stacks for the hero.
 * - Drag to spin (it keeps its momentum, then eases back to a slow idle spin).
 * - Move the mouse over it to tilt it.
 * - A single coin floats above the main stack and flips to show the naira sign.
 * three.js is loaded only in the browser, after the page is interactive.
 */

const R = 1.5; // coin radius
const H = 0.26; // coin thickness
const BEVEL = 0.07;
const STEP = H + 0.012; // gap between stacked coins

const GOLD = 0xe8a33d;
const MINT = 0x00a858; // logo green
const FOREST = 0x105038; // logo dark green

export const HeroCoins = ({ className = "" }: { className?: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let teardown: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } =
        await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      let renderer: WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL: the hero simply shows without the shape
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;

      const canvas = renderer.domElement;
      canvas.style.cssText =
        "display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab;";
      mount.appendChild(canvas);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTexture;
      scene.environmentIntensity = 0.95;

      const sun = new THREE.DirectionalLight(0xffffff, 1.4);
      sun.position.set(3, 6, 5);
      scene.add(sun);

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 3.4, 11.5);
      camera.lookAt(0, 1.5, 0);

      /* ---------- shared geometry, materials, textures ---------- */

      const profile: InstanceType<typeof THREE.Vector2>[] = [
        new THREE.Vector2(0, -H / 2),
      ];
      const arc = 6;
      for (let i = 0; i <= arc; i++) {
        const a = -Math.PI / 2 + (Math.PI / 2) * (i / arc);
        profile.push(
          new THREE.Vector2(
            R - BEVEL + BEVEL * Math.cos(a),
            -H / 2 + BEVEL + BEVEL * Math.sin(a),
          ),
        );
      }
      for (let i = 0; i <= arc; i++) {
        const a = (Math.PI / 2) * (i / arc);
        profile.push(
          new THREE.Vector2(
            R - BEVEL + BEVEL * Math.cos(a),
            H / 2 - BEVEL + BEVEL * Math.sin(a),
          ),
        );
      }
      profile.push(new THREE.Vector2(0, H / 2));
      const coinGeo = new THREE.LatheGeometry(profile, 96);

      const faceSize = 2 * (R - BEVEL);
      const faceGeo = new THREE.PlaneGeometry(faceSize, faceSize);

      const goldMat = new THREE.MeshStandardMaterial({
        color: GOLD,
        metalness: 1,
        roughness: 0.28,
      });
      const mintMat = new THREE.MeshStandardMaterial({
        color: MINT,
        metalness: 0.55,
        roughness: 0.35,
      });
      const forestMat = new THREE.MeshStandardMaterial({
        color: FOREST,
        metalness: 0.5,
        roughness: 0.4,
      });

      // Engraved-looking naira sign, drawn once and used on the loose coin
      // and the top of the main stack
      const faceCanvas = document.createElement("canvas");
      faceCanvas.width = faceCanvas.height = 512;
      const g = faceCanvas.getContext("2d")!;
      g.lineWidth = 14;
      g.strokeStyle = "rgba(110, 64, 0, 0.5)";
      g.beginPath();
      g.arc(256, 256, 214, 0, Math.PI * 2);
      g.stroke();
      g.lineWidth = 4;
      g.strokeStyle = "rgba(110, 64, 0, 0.3)";
      g.beginPath();
      g.arc(256, 256, 192, 0, Math.PI * 2);
      g.stroke();
      g.font = "700 270px 'Space Grotesk', system-ui, sans-serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = "rgba(255, 238, 200, 0.55)";
      g.fillText("₦", 253, 268);
      g.fillStyle = "rgba(110, 64, 0, 0.62)";
      g.fillText("₦", 256, 272);
      const faceTexture = new THREE.CanvasTexture(faceCanvas);
      faceTexture.colorSpace = THREE.SRGBColorSpace;
      faceTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const faceMat = new THREE.MeshStandardMaterial({
        map: faceTexture,
        transparent: true,
        metalness: 0.5,
        roughness: 0.45,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        depthWrite: false,
      });

      // Soft contact shadow under the stacks
      const shadowCanvas = document.createElement("canvas");
      shadowCanvas.width = shadowCanvas.height = 256;
      const sg = shadowCanvas.getContext("2d")!;
      const grad = sg.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(15, 43, 34, 0.28)");
      grad.addColorStop(1, "rgba(15, 43, 34, 0)");
      sg.fillStyle = grad;
      sg.fillRect(0, 0, 256, 256);
      const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
      shadowTexture.colorSpace = THREE.SRGBColorSpace;
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
      });
      const shadowGeo = new THREE.PlaneGeometry(8, 8);
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.set(0.6, -H / 2 - 0.01, 0.1);
      scene.add(shadow);

      /* ---------- the objects ---------- */

      const world = new THREE.Group();
      world.rotation.y = -0.55;
      scene.add(world);

      type Mat = InstanceType<typeof THREE.MeshStandardMaterial>;

      const buildStack = (
        mats: Mat[],
        x: number,
        z: number,
        scale: number,
        topFace: boolean,
      ) => {
        const stack = new THREE.Group();
        const jitter = [0, 0.04, -0.05, 0.03, -0.035, 0.02];
        mats.forEach((m, i) => {
          const coin = new THREE.Mesh(coinGeo, m);
          coin.position.set(
            jitter[i % jitter.length],
            i * STEP,
            -jitter[(i + 2) % jitter.length],
          );
          coin.rotation.y = i * 0.7;
          stack.add(coin);
        });
        if (topFace) {
          const face = new THREE.Mesh(faceGeo, faceMat);
          face.rotation.x = -Math.PI / 2;
          face.position.y = (mats.length - 1) * STEP + H / 2 + 0.004;
          stack.add(face);
        }
        stack.position.set(x, 0, z);
        stack.scale.setScalar(scale);
        world.add(stack);
      };

      // Main stack: gold with two green coins, echoing the logo's striped coins
      buildStack(
        [goldMat, mintMat, goldMat, goldMat, forestMat, goldMat],
        -0.6,
        0,
        1,
        true,
      );
      // Smaller stack beside it
      buildStack([goldMat, goldMat, mintMat], 1.75, 0.5, 0.78, false);

      // Loose coin that hovers above the main stack and flips
      const floater = new THREE.Group();
      const flipper = new THREE.Group();
      flipper.rotation.x = Math.PI / 2; // stand the coin up so its face meets the camera
      flipper.add(new THREE.Mesh(coinGeo, goldMat));
      const front = new THREE.Mesh(faceGeo, faceMat);
      front.rotation.x = -Math.PI / 2;
      front.position.y = H / 2 + 0.004;
      const back = new THREE.Mesh(faceGeo, faceMat);
      back.rotation.set(Math.PI / 2, 0, Math.PI);
      back.position.y = -(H / 2 + 0.004);
      flipper.add(front, back);
      floater.add(flipper);
      floater.scale.setScalar(0.72);
      floater.position.set(-0.6, 3.1, 0);
      floater.rotation.y = 0.45;
      world.add(floater);

      /* ---------- interaction ---------- */

      const IDLE_SPIN = reduceMotion ? 0 : 0.006;
      const REST_TILT = 0.16;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let spin = IDLE_SPIN;
      let tilt = REST_TILT;
      let tiltTarget = REST_TILT;

      const clamp = (v: number, lo: number, hi: number) =>
        Math.min(hi, Math.max(lo, v));

      const onDown = (e: PointerEvent) => {
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
        kick();
      };
      const onMove = (e: PointerEvent) => {
        if (dragging) {
          const dx = e.clientX - lastX;
          const dy = e.clientY - lastY;
          lastX = e.clientX;
          lastY = e.clientY;
          world.rotation.y += dx * 0.012;
          spin = dx * 0.012;
          tiltTarget = clamp(tiltTarget + dy * 0.006, -0.1, 0.6);
        } else if (e.pointerType === "mouse") {
          const r = canvas.getBoundingClientRect();
          const ny = (e.clientY - r.top) / r.height - 0.5;
          tiltTarget = REST_TILT + ny * 0.4;
        }
      };
      const onUp = (e: PointerEvent) => {
        dragging = false;
        canvas.style.cursor = "grab";
        if (canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
        tiltTarget = REST_TILT;
      };
      const onLeave = (e: PointerEvent) => {
        if (e.pointerType === "mouse" && !dragging) tiltTarget = REST_TILT;
      };

      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
      canvas.addEventListener("pointerleave", onLeave);

      /* ---------- sizing, visibility, loop ---------- */

      const resize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        kick();
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) kick();
      });
      io.observe(mount);
      const onVisibility = () => {
        if (!document.hidden) kick();
      };
      document.addEventListener("visibilitychange", onVisibility);

      let raf = 0;
      let last = performance.now();
      const loop = (now: number) => {
        if (!visible || document.hidden) {
          raf = 0; // pause while off screen or in a background tab
          return;
        }
        const dt = Math.min((now - last) / 16.667, 3);
        last = now;

        if (!dragging) {
          world.rotation.y += spin * dt;
          spin += (IDLE_SPIN - spin) * 0.03 * dt;
        }
        tilt += (tiltTarget - tilt) * 0.08 * dt;
        world.rotation.x = tilt;

        if (!reduceMotion) {
          floater.rotation.y += 0.022 * dt;
          floater.position.y = 3.1 + Math.sin(now / 700) * 0.12;
        }

        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      function kick() {
        if (raf) return;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }

      resize();
      kick();

      teardown = () => {
        cancelAnimationFrame(raf);
        raf = 0;
        resizeObserver.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        canvas.removeEventListener("pointerdown", onDown);
        canvas.removeEventListener("pointermove", onMove);
        canvas.removeEventListener("pointerup", onUp);
        canvas.removeEventListener("pointercancel", onUp);
        canvas.removeEventListener("pointerleave", onLeave);
        coinGeo.dispose();
        faceGeo.dispose();
        shadowGeo.dispose();
        goldMat.dispose();
        mintMat.dispose();
        forestMat.dispose();
        faceMat.dispose();
        shadowMat.dispose();
        faceTexture.dispose();
        shadowTexture.dispose();
        envTexture.dispose();
        pmrem.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      teardown?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      data-cursor="Drag"
      className={className}
    />
  );
};
