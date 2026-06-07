"use client";

import { Layer, Stage, Image as KonvaImage } from "react-konva";

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
        className="flex h-[61vh] items-center justify-center border border-gray-300"
      >
        <Layer>
          {backgroundImage && (
            <KonvaImage
              width={stageSize.width}
              height={stageSize.height}
              image={backgroundImage}
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
