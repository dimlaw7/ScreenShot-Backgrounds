"use client";

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
}) => {
  return (
    <div>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        ref={stageRef}
        className="flex h-[51vh] items-center justify-center border border-gray-300 bg-white"
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
              x={(stageSize.width - 300 * scale) / 2}
              y={(stageSize.height - 300 * scale) / 2}
              width={300 * scale}
              height={300 * scale}
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
    </div>
  );
};

export default Editor;
