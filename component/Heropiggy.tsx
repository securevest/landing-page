"use client";

import { useEffect, useRef } from "react";
import type { WebGLRenderer } from "three";

/**
 * Decorative 3D piggy bank for the hero.
 * - A gold coin drops into the slot every few seconds and the pig gives a small gulp.
 * - The pig sways gently on its own. Drag to spin it all the way round; it
 *   keeps its momentum, then eases back to the front-facing view.
 * - Move the mouse over it to tilt it.
 * three.js is loaded only in the browser, after the page is interactive.
 */

const BODY = 0x00a858; // logo green
const SNOUT = 0x5bc493;
const DARK = 0x0f2b22;
const GOLD = 0xe8a33d;

const FALL_FROM = 1.6; // coin start height
const SLOT_Y = 0.82; // top of the body at the slot
const COIN_SCALE = 0.16; // coin size, so its width fits the slot
const CYCLE = 3.6; // seconds per coin
const FALL = 1.1; // seconds the coin takes to drop

export const HeroPiggy = ({ className = "" }: { className?: string }) => {
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

      const sun = new THREE.DirectionalLight(0xffffff, 1.3);
      sun.position.set(3, 6, 5);
      scene.add(sun);

      const camera = new THREE.PerspectiveCamera(30, 1.25, 0.1, 100);
      camera.position.set(0, 1.55, 7.4);
      camera.lookAt(0.1, 0.3, 0);

      /* ---------- materials ---------- */

      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: BODY,
        roughness: 0.3,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      });
      const snoutMat = new THREE.MeshPhysicalMaterial({
        color: SNOUT,
        roughness: 0.3,
        clearcoat: 1,
        clearcoatRoughness: 0.2,
      });
      const darkMat = new THREE.MeshStandardMaterial({
        color: DARK,
        roughness: 0.35,
        metalness: 0.1,
      });
      const goldMat = new THREE.MeshStandardMaterial({
        color: GOLD,
        metalness: 1,
        roughness: 0.28,
      });

      const geos: InstanceType<typeof THREE.BufferGeometry>[] = [];
      const track = <T extends InstanceType<typeof THREE.BufferGeometry>>(
        g: T,
      ): T => {
        geos.push(g);
        return g;
      };

      /* ---------- the pig ---------- */

      const world = new THREE.Group();
      world.rotation.y = -0.55;
      scene.add(world);

      const pig = new THREE.Group(); // squashes a little when the coin lands
      world.add(pig);

      // body: a squashed sphere
      const body = new THREE.Mesh(
        track(new THREE.SphereGeometry(1, 64, 48)),
        bodyMat,
      );
      body.scale.set(1.05, 0.82, 0.84);
      pig.add(body);

      // snout, pointing along +x, with two nostrils
      const snout = new THREE.Mesh(
        track(new THREE.CylinderGeometry(0.26, 0.3, 0.3, 40)),
        snoutMat,
      );
      snout.rotation.z = -Math.PI / 2;
      snout.position.set(1.0, -0.08, 0);
      pig.add(snout);

      const nostrilGeo = track(new THREE.SphereGeometry(0.05, 16, 12));
      for (const z of [-0.09, 0.09]) {
        const n = new THREE.Mesh(nostrilGeo, darkMat);
        n.position.set(1.15, -0.08, z);
        n.scale.set(0.6, 1.2, 1);
        pig.add(n);
      }

      // eyes
      const eyeGeo = track(new THREE.SphereGeometry(0.075, 20, 16));
      for (const z of [-0.5, 0.5]) {
        const eye = new THREE.Mesh(eyeGeo, darkMat);
        eye.position.set(0.7, 0.3, z * 0.96);
        pig.add(eye);
      }

      // ears
      const earGeo = track(new THREE.SphereGeometry(0.2, 32, 24));
      for (const side of [-1, 1]) {
        const ear = new THREE.Mesh(earGeo, bodyMat);
        ear.position.set(0.5, 0.72, side * 0.36);
        ear.scale.set(0.9, 1.15, 0.35);
        ear.rotation.set(side * 0.55, 0, -0.3);
        pig.add(ear);
      }

      // legs
      const legGeo = track(new THREE.CapsuleGeometry(0.2, 0.22, 8, 20));
      for (const x of [-0.5, 0.5]) {
        for (const z of [-0.4, 0.4]) {
          const leg = new THREE.Mesh(legGeo, bodyMat);
          leg.position.set(x, -0.82, z);
          pig.add(leg);
        }
      }

      // curly tail
      const tail = new THREE.Mesh(
        track(new THREE.TorusGeometry(0.15, 0.038, 12, 32, Math.PI * 1.5)),
        bodyMat,
      );
      tail.position.set(-1.04, 0.2, 0);
      tail.rotation.z = 0.5;
      pig.add(tail);

      // coin slot
      const slot = new THREE.Mesh(
        track(new THREE.BoxGeometry(0.5, 0.04, 0.1)),
        darkMat,
      );
      slot.position.set(-0.1, 0.797, 0);
      pig.add(slot);

      // soft shadow on the ground
      const shadowCanvas = document.createElement("canvas");
      shadowCanvas.width = shadowCanvas.height = 256;
      const sg = shadowCanvas.getContext("2d")!;
      const grad = sg.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(15, 43, 34, 0.34)");
      grad.addColorStop(0.55, "rgba(15, 43, 34, 0.12)");
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
      const shadow = new THREE.Mesh(
        track(new THREE.PlaneGeometry(4.8, 4.8)),
        shadowMat,
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.scale.set(1, 0.6, 1); // flatten into an oval along the ground
      shadow.position.set(0.1, -1.16, 0);
      scene.add(shadow);

      // the coin that drops in
      const profile: InstanceType<typeof THREE.Vector2>[] = [
        new THREE.Vector2(0, -0.13),
      ];
      const arc = 5;
      const R = 1.5;
      const H = 0.26;
      const B = 0.07;
      for (let i = 0; i <= arc; i++) {
        const a = -Math.PI / 2 + (Math.PI / 2) * (i / arc);
        profile.push(
          new THREE.Vector2(
            R - B + B * Math.cos(a),
            -H / 2 + B + B * Math.sin(a),
          ),
        );
      }
      for (let i = 0; i <= arc; i++) {
        const a = (Math.PI / 2) * (i / arc);
        profile.push(
          new THREE.Vector2(
            R - B + B * Math.cos(a),
            H / 2 - B + B * Math.sin(a),
          ),
        );
      }
      profile.push(new THREE.Vector2(0, 0.13));
      const coin = new THREE.Mesh(
        track(new THREE.LatheGeometry(profile, 64)),
        goldMat,
      );
      coin.rotation.x = Math.PI / 2; // stand on edge, faces toward +-z
      const coinHolder = new THREE.Group();
      coinHolder.add(coin);
      coinHolder.scale.setScalar(COIN_SCALE);
      coinHolder.position.set(-0.1, FALL_FROM, 0);
      world.add(coinHolder);

      /* ---------- interaction ---------- */

      const FRONT = -0.55; // resting angle: a three-quarter view of the face
      const REST_TILT = 0.1;
      let dragging = false;
      let lastX = 0;
      let lastY = 0;
      let spin = 0;
      let tilt = REST_TILT;
      let tiltTarget = REST_TILT;

      const clamp = (v: number, lo: number, hi: number) =>
        Math.min(hi, Math.max(lo, v));
      const wrap = (a: number) =>
        ((((a + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) -
        Math.PI;

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
          tiltTarget = clamp(tiltTarget + dy * 0.006, -0.1, 0.5);
        } else if (e.pointerType === "mouse") {
          const r = canvas.getBoundingClientRect();
          const ny = (e.clientY - r.top) / r.height - 0.5;
          tiltTarget = REST_TILT + ny * 0.35;
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
        const t = now / 1000;

        // rotation: sway around the front view, unless the visitor is dragging
        if (!dragging) {
          world.rotation.y += spin * dt;
          spin *= Math.pow(0.94, dt);
          const ideal = FRONT + (reduceMotion ? 0 : Math.sin(t * 0.6) * 0.35);
          const settle = 0.03 * (1 - clamp(Math.abs(spin) / 0.03, 0, 1));
          world.rotation.y += wrap(ideal - world.rotation.y) * settle * dt;
        }
        tilt += (tiltTarget - tilt) * 0.08 * dt;
        world.rotation.x = tilt;

        // coin: drop, gulp, repeat
        if (reduceMotion) {
          coinHolder.position.y = 1.5;
          coinHolder.scale.setScalar(COIN_SCALE);
          pig.scale.set(1, 1, 1);
        } else {
          const c = t % CYCLE;
          if (c < FALL) {
            const k = c / FALL;
            coinHolder.position.y = FALL_FROM + (0.4 - FALL_FROM) * k * k;
            coinHolder.scale.setScalar(COIN_SCALE * clamp(c / 0.25, 0, 1));
            pig.scale.set(1, 1, 1);
          } else {
            coinHolder.position.y = 0.4; // hidden inside the pig
            const s = c - FALL;
            const gulp = Math.exp(-s * 7) * Math.sin(s * 26) * 0.045;
            pig.scale.set(1 + gulp * 0.6, 1 - gulp, 1 + gulp * 0.6);
          }
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
        geos.forEach((g) => g.dispose());
        bodyMat.dispose();
        snoutMat.dispose();
        darkMat.dispose();
        goldMat.dispose();
        shadowMat.dispose();
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
