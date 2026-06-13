// import Editor from "@/components/Editor";
"use client";

import Editor from "@/components/Editor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  Image as LucideImage,
  Move,
  RefreshCw,
  Scaling,
  ZoomIn,
} from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

const backgrounds = [
  "/backgrounds/bg1.png",
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
    const maxWidth = stageRef.current.container().clientWidth;
    const maxHeight = 510; //window.innerHeight * 0.6;
    const ratio = customRatio.width / customRatio.height;
    //console.log(document.body.clientWidth, window.innerHeight);

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

    updateSize(DEFAULT_RATIO);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateSize]);

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

        loadBackground(
          backgrounds[Math.floor(Math.random() * backgrounds.length)],
        );
        //Next work is here. I will calculate the aspect ratio of the uploaded image and pass it to
        //updateSize() for the native aspect ratio.
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
      <main className="container mx-auto mt-4 flex max-w-7xl flex-col px-5 lg:mt-8 lg:flex-row lg:px-0">
        <div className="flex-1 lg:px-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            value=""
            ref={uploadRef}
            className="hidden"
          />

          <Editor
            backgroundImage={backgroundImage}
            userImage={userImage}
            scale={scale}
            setScale={setScale}
            stageRef={stageRef}
            stageSize={canvasSize}
            uploadRef={uploadRef}
          />
        </div>

        <div className="lg:w-80 lg:rounded-xl lg:px-4 lg:shadow">
          <div className="_tabs border-border mt-8 flex rounded-xl border px-2 py-4 tracking-tight shadow-sm">
            <button className="text-primary relative flex flex-col items-center gap-1.5 px-2 tracking-tighter">
              <LucideImage size={16} />
              <span className="text-sm font-bold">Background</span>
              <div className="border-primary absolute -bottom-4 left-0 w-full border-b"></div>
            </button>
            <button className="text-muted relative flex flex-1 flex-col items-center gap-1.5 px-2">
              <Scaling size={16} />
              <span className="text-sm font-bold">Ratio</span>
            </button>
            <button className="text-muted relative flex flex-1 flex-col items-center gap-1.5 px-2">
              <ZoomIn size={16} />
              <span className="text-sm font-bold">Zoom</span>
            </button>
            <button className="text-muted relative flex flex-1 flex-col items-center gap-1.5 px-2">
              <Move size={16} />
              <span className="text-sm font-bold">Position</span>
            </button>
            <button className="text-muted relative flex flex-1 flex-col items-center gap-1.5 px-2">
              <RefreshCw size={16} />
              <span className="text-sm font-bold">Actions</span>
            </button>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-base font-semibold">Backgrounds</h2>

            <div className="flex scrollbar-none flex-nowrap gap-2 overflow-x-scroll overflow-y-hidden p-0.5">
              {backgrounds.map((bg) => (
                <button
                  key={bg}
                  onClick={() => loadBackground(bg)}
                  className={`border-border shrink-0 rounded border transition hover:scale-105 ${selectedBg === bg ? "ring-primary ring-2" : ""}`}
                >
                  <img
                    src={bg}
                    alt=""
                    className="h-14 w-20 rounded object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-base font-semibold">Canvas Ratios</h2>

            <div className="flex flex-wrap gap-2">
              {aspectRatios.map((r) => (
                <button
                  className="text-text flex-1 rounded-xl border border-gray-300 px-4 py-4 text-sm font-bold shadow-sm"
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

          <div className="mt-8">
            <h2 className="mb-2 text-base font-semibold">Zoom</h2>

            <div className="flex items-center justify-between">
              <button className="text-text rounded-xl border border-gray-300 px-4 py-2 text-base font-bold shadow-sm">
                -
              </button>
              <input
                type="range"
                min="0.2"
                max="3"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(e.target.value)}
              />
              <button className="text-text rounded-xl border border-gray-300 px-4 py-2 text-base font-bold shadow-sm">
                120%
              </button>
              <button className="text-text rounded-xl border border-gray-300 px-4 py-2 text-base font-bold shadow-sm">
                +
              </button>
            </div>
          </div>

          <div className="mt-8">
            <button
              className="text-surface border--gray-900 bg-primary border-border flex w-full cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-center text-sm font-medium shadow-sm transition hover:bg-gray-50 hover:shadow"
              onClick={handleDownload}
            >
              Download Image
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
