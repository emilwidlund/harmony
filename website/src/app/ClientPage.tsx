"use client";

/* eslint-disable */
import { ColorWheel, harmonies } from "@newfrgmnt/harmony";
/* @ts-ignore */
import { Gradient } from "../components/GradientMesh/GradientMesh";
import { useEffect, useMemo, useCallback, useState } from "react";
import { HTMLMotionProps, Variants, motion } from "framer-motion";

function HSVtoRGB(h: number, s: number, v: number) {
  var r, g, b, i, f, p, q, t;
  h = h / 360;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r,
    g,
    b,
  };
}

export default function App() {
  const [selectedHarmony, setSelectedHarmony] =
    useState<keyof typeof harmonies>("analogous");
  const gradient = useMemo(() => new Gradient(), []);

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--gradient-color-1", "#aaa");
    root.style.setProperty("--gradient-color-2", "#ccc");
    root.style.setProperty("--gradient-color-3", "#ddd");
    root.style.setProperty("--gradient-color-4", "#fff");

    /* @ts-ignore */
    gradient.initGradient("#gradient-canvas");
  }, [gradient]);

  /* @ts-ignore */
  const handleColorChange = useCallback(
    /* @ts-ignore */
    (colors) => {
      if (!gradient.material) {
        return setTimeout(() => handleColorChange(colors), 200);
      }

      /* @ts-ignore */
      const newColors = colors
        /* @ts-ignore */
        .map((color, i) => {
          const { r, g, b } = HSVtoRGB(
            color.hue,
            color.saturation,
            color.value
          );
          return [r, g, b];
        });

      const [base, ...waves] = newColors;

      gradient.material.uniforms["u_baseColor"].value = base;

      for (const [index, wave] of Object.entries(waves)) {
        gradient.material.uniforms["u_waveLayers"].value[
          index
        ].value.color.value = wave;
      }
    },
    [gradient]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
        }}
        data-transition-in
        id="gradient-canvas"
      />

      <motion.div
        className="relative flex mx-auto w-full max-w-screen-2xl flex-grow flex-col justify-between items-center gap-y-32 p-16"
        variants={{
          initial: { opacity: 1 },
          animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        initial="initial"
        animate="animate"
      >
        {" "}
        <TextReveal>
          <h3 className="text-center text-xl !leading-normal tracking-tight md:text-3xl">
            Harmony
          </h3>
        </TextReveal>
        <div className="flex flex-col gap-y-16 lg:gap-y-16 items-center">
          <h1 className="text-center text-5xl !leading-normal tracking-tight lg:text-[calc(100vw_/_20)] md:text-6xl">
            <TextReveal>
              A new kind of
              <br className="hidden lg:block" />
            </TextReveal>
            <TextReveal>Color Picker</TextReveal>
          </h1>
          <TextReveal>
            <p className="text-lg font-light md:text-2xl text-center">
              Unlock the power of color harmonies
            </p>
          </TextReveal>
          <TextReveal transition={{ delay: 0.6 }}>
            <div className="flex flex-row items-center gap-x-2">
              <span className="bg-white bg-opacity-20 rounded-xl px-4 py-2 font-mono">
                npm install @newfrgmnt/harmony
              </span>
            </div>
          </TextReveal>
        </div>
        <motion.div
          className="shadow-3xl z-50 rounded-full flex flex-col items-center gap-y-8"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: {
                duration: 1.5,
                delay: 1.2,
                ease: "easeInOut",
              },
            },
          }}
        >
          <ColorWheel
            radius={120}
            harmony={selectedHarmony}
            defaultColor={{ hue: 0, saturation: 0.8, value: 1 }}
            onChange={handleColorChange}
          />
          <select
            className="bg-white bg-opacity-15 px-4 py-2 rounded-xl border-none outline-none capitalize appearance-none text-center"
            onChange={(e) =>
              setSelectedHarmony(e.target.value as keyof typeof harmonies)
            }
          >
            {Object.keys(harmonies).map((harmony) => (
              <option
                className="capitalize"
                key={harmony}
                selected={harmony === selectedHarmony}
              >
                {harmony}
              </option>
            ))}
          </select>
        </motion.div>
      </motion.div>
    </div>
  );
}

const variants: Variants = {
  initial: {
    y: "100%",
  },
  animate: {
    y: "0%",
    transition: {
      duration: 1.5,
      ease: [0.75, 0, 0.25, 1],
    },
  },
};

const TextReveal = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) => {
  return (
    <motion.div {...props} className={`relative h-fit overflow-hidden`}>
      <motion.div className={className} variants={variants}>
        {children}
      </motion.div>
    </motion.div>
  );
};
