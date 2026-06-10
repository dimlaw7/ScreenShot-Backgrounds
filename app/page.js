// import Editor from "@/components/Editor";
"use client";

import Editor from "@/components/Editor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useEffect, useState, useRef, useCallback } from "react";

const backgrounds = [
  "/backgrounds/bg1.jpg",
  "/backgrounds/bg2.jpg",
  "/backgrounds/bg3.jpg",
  "/backgrounds/bg4.jpg",
  "/backgrounds/bg5.jpg",
];

const aspectRatios = [
  { label: "Native", width: 5, height: 4 },
  { label: "3:2", width: 3, height: 2 },
  { label: "1:1", width: 1, height: 1 },
  { label: "16:9", width: 16, height: 9 },
  { label: "9:16", width: 9, height: 16 },
];

const DEFAULT_RATIO = { width: 5, height: 4 };

export default function Home() {
  const [userImage, setUserImage] = useState(null);

  const [backgroundImage, setBackgroundImage] = useState(null);

  const [scale, setScale] = useState(1);

  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 480 }); //The Stage size {width: 600, height: 480}

  const stageRef = useRef(null);
  const uploadRef = useRef(null);

  const updateSize = useCallback((customRatio = DEFAULT_RATIO) => {
    const maxWidth = stageRef.current.container().clientWidth * 0.9;
    const maxHeight = window.innerHeight * 0.5;
    const ratio = customRatio.width / customRatio.height;

    let stageContainerWidth = maxWidth;
    let stageContainerHeight = stageContainerWidth / ratio;

    if (stageContainerHeight > maxHeight) {
      stageContainerHeight = maxHeight;
      stageContainerWidth = maxHeight * ratio;
    }

    let width = Math.round(stageContainerWidth);
    let height = Math.round(stageContainerHeight);

    setCanvasSize({
      width: width,
      height: height,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => updateSize();

    loadBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);

    updateSize(DEFAULT_RATIO);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loadBackground = (src) => {
    const bg = new window.Image();

    bg.src = src;

    bg.onload = () => {
      setSelectedBg(src);
      setBackgroundImage(bg);
    };
  };

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
    <>
      <Header uploadRef={uploadRef} />
      <Hero />
      <main className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            value=""
            ref={uploadRef}
          />

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
        </div>

        <div className="lg:w-80">
          <button onClick={handleDownload}>Download Image</button>

          <div className="mt-6">
            <h2 className="mb-3 font-semibold">Aspect Ratios</h2>

            <div className="flex flex-wrap gap-3">
              {aspectRatios.map((r) => (
                <button
                  key={r.label}
                  onClick={() =>
                    updateSize({ width: r.width, height: r.height })
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
        </div>
      </main>
    </>
  );
}
