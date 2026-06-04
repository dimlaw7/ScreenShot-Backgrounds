"use client";

import { Layer, Stage, Image as KonvaImage } from "react-konva";

const Editor = ({ backgroundImage, userImage, scale, setScale }) => {
  return (
    <div>
      <Stage width={600} height={400}>
        <Layer>
          {backgroundImage && (
            <KonvaImage width={600} height={400} image={backgroundImage} />
          )}

          {userImage && (
            <KonvaImage
              image={userImage}
              x={0}
              y={0}
              width={300 * scale}
              height={300 * scale}
              draggable
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Editor;
