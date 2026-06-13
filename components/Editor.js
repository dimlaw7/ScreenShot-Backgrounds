"use client";

import { Expand, RotateCcw } from "lucide-react";
import { Layer, Stage, Image as KonvaImage } from "react-konva";

const getCoverDimensions = (img, containerWidth, containerHeight) => {
  const imgRatio = img.width / img.height;
  const containerRatio = containerWidth / containerHeight;

  let width;
  let height;

  if (imgRatio > containerRatio) {
    // image is wider
    height = containerHeight;
    width = height * imgRatio;
  } else {
    // image is taller
    width = containerWidth;
    height = width / imgRatio;
  }
  //console.log(width, height);

  return {
    width,
    height,
    x: (containerWidth - width) / 2,
    y: (containerHeight - height) / 2,
  };
};

const getContainDimensions = (
  img,
  containerWidth,
  containerHeight,
  scale = 1,
) => {
  const imgRatio = img.width / img.height;
  const containerRatio = containerWidth / containerHeight;

  let width;
  let height;

  if (imgRatio > containerRatio) {
    width = containerWidth * 0.8 * scale;
    height = width / imgRatio;
  } else {
    height = containerHeight * 0.8 * scale;
    width = height * imgRatio;
  }

  return {
    width,
    height,
    x: (containerWidth - width) / 2,
    y: (containerHeight - height) / 2,
  };
};

const Editor = ({
  backgroundImage,
  userImage,
  scale,
  setScale,
  stageRef,
  stageSize,
  uploadRef,
}) => {
  const handleUploadBtn = () => {
    uploadRef.current.click();
  };

  return (
    <div className="relative">
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        ref={stageRef}
        className="flex h-[510] items-center justify-center rounded-xl border border-gray-300 bg-white shadow-sm"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #f0f0f0 25%, transparent 25%)," +
            "linear-gradient(-45deg, #f0f0f0 25%, transparent 25%)," +
            "linear-gradient(45deg, transparent 75%, #f0f0f0 75%)," +
            "linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      >
        <Layer>
          {backgroundImage && (
            <KonvaImage
              image={backgroundImage}
              {...getCoverDimensions(
                backgroundImage,
                stageSize.width,
                stageSize.height,
              )}
            />
          )}

          {userImage && (
            <KonvaImage
              image={userImage}
              {...getContainDimensions(
                userImage,
                stageSize.width,
                stageSize.height,
                scale,
              )}
              draggable
              dragBoundFunc={(pos) => {
                const stageWidth = stageSize.width;
                const stageHeight = stageSize.height;

                const imgWidth = 300 * scale;
                const imgHeight = 300 * scale;

                let newX = pos.x;
                let newY = pos.y;

                // LEFT boundary
                if (newX < 0) newX = 0;

                // TOP boundary
                if (newY < 0) newY = 0;

                // RIGHT boundary
                if (newX + imgWidth > stageWidth) {
                  newX = stageWidth - imgWidth;
                }

                // BOTTOM boundary
                if (newY + imgHeight > stageHeight) {
                  newY = stageHeight - imgHeight;
                }

                return {
                  x: newX,
                  y: newY,
                };
              }}
            />
          )}
        </Layer>
      </Stage>
      {!userImage && (
        <>
          <div className="bg-muted absolute top-0 h-full w-full rounded-xl opacity-20"></div>
          <button
            className="text-background border--gray-900 absolute top-1/2 left-1/2 flex -translate-1/2 cursor-pointer items-center gap-2 rounded-lg border-2 bg-gray-950 px-7 py-3 text-sm font-semibold shadow-xl transition hover:bg-gray-800"
            onClick={() => handleUploadBtn()}
          >
            <span>Upload a Photo</span>
          </button>
          <div className="absolute bottom-0.5 flex hidden">
            <button className="flex">
              <Expand />
              <span>Fit</span>
            </button>
            <button>
              <RotateCcw />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Editor;
