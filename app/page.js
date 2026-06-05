// import Editor from "@/components/Editor";
"use client";

import Editor from "@/components/Editor";
import { useEffect, useState, useRef } from "react";

const backgrounds = [
  "/backgrounds/bg1.jpg",
  "/backgrounds/bg2.jpg",
  "/backgrounds/bg3.jpg",
  "/backgrounds/bg4.jpg",
  "/backgrounds/bg5.jpg",
];

const ratio = [
  { label: "1:1", width: 600, height: 600 },
  { label: "4:5", width: 600, height: 750 },
  { label: "16:9", width: 800, height: 450 },
  { label: "9:16", width: 450, height: 800 },
];

export default function Home() {
  const [userImage, setUserImage] = useState(null);

  const [backgroundImage, setBackgroundImage] = useState(null);

  const [scale, setScale] = useState(1);

  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 600 });

  const stageRef = useRef(null);

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

  const handleDownload = () => {
    const uri = stageRef.current.toDataURL({
      mimeType: "image/png",
      quality: 1,
      pixelRatio: 3,
    });

    const link = document.createElement("a");

    link.download = "screenshot-sownload.png";
    link.href = uri;
    console.log(link);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        stageRef={stageRef}
        stageSize={canvasSize}
      />

      <button onClick={handleDownload}>Download Image</button>

      <div className="mt-6">
        <h2 className="mb-3 font-semibold">Choose Background</h2>

        <div className="flex flex-wrap gap-3">
          {ratio.map((r) => (
            <button
              key={r.label}
              onClick={() =>
                setCanvasSize({ width: r.width, height: r.height })
              }
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

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
