"use client";

import { Layer, Stage, Image as KonvaImage } from "react-konva";

const Editor = ({ backgroundImage, userImage, scale, setScale }) => {
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 400;

  return (
    <div>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          {backgroundImage && (
            <KonvaImage
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              image={backgroundImage}
            />
          )}

          {userImage && (
            <KonvaImage
              image={userImage}
              x={0}
              y={0}
              width={300 * scale}
              height={300 * scale}
              draggable
              dragBoundFunc={(pos) => {
                const stageWidth = 600;
                const stageHeight = 400;

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
