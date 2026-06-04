// import Editor from "@/components/Editor";
"use client";

import Editor from "@/components/Editor";
import { useEffect, useState } from "react";

export default function Home() {
  const [userImage, setUserImage] = useState(null);

  const [backgroundImage, setBackgroundImage] = useState(null);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const bg = new window.Image();

    bg.src = "/backgrounds/bg1.png";

    bg.onload = () => {
      setBackgroundImage(bg);
    };
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
    </main>
  );
}
