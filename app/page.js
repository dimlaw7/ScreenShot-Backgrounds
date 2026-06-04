// import Editor from "@/components/Editor";
"use client";

import Editor from "@/components/Editor";
import { useEffect, useState } from "react";

const backgrounds = [
  "/backgrounds/bg1.jpg",
  "/backgrounds/bg2.jpg",
  "/backgrounds/bg3.jpg",
  "/backgrounds/bg4.jpg",
  "/backgrounds/bg5.jpg",
];

export default function Home() {
  const [userImage, setUserImage] = useState(null);

  const [backgroundImage, setBackgroundImage] = useState(null);

  const [scale, setScale] = useState(1);

  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  const loadBackground = (src) => {
    const bg = new window.Image();

    bg.src = src;

    bg.onload = () => {
      setSelectedBg(src);
      setBackgroundImage(bg);
    };
  };

  useEffect(() => {
    loadBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    console.log(event.target.files);

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const img = new window.Image();

      img.src = reader.result;

      img.onload = () => {
        setUserImage(img);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <main>
      <h1>Screenshot Background</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />

      <input
        type="range"
        min="0.2"
        max="3"
        step="0.1"
        value={scale}
        onChange={(e) => setScale(e.target.value)}
      />

      <Editor
        backgroundImage={backgroundImage}
        userImage={userImage}
        scale={scale}
        setScale={setScale}
      />

      <div className="mt-6">
        <h2 className="mb-3 font-semibold">Choose Background</h2>

        <div className="flex flex-wrap gap-3">
          {backgrounds.map((bg) => (
            <button
              key={bg}
              onClick={() => loadBackground(bg)}
              className={`overflow-hidden rounded border transition hover:scale-105 ${selectedBg === bg ? "ring-2 ring-yellow-500" : ""}`}
            >
              <img src={bg} alt="" className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
