"use client";

import { Layer, Stage, Image as KonvaImage } from "react-konva";

const Editor = ({ backgroundImage, userImage }) => {
  return (
    <div>
      <Stage width={600} height={600}>
        <Layer>
          {backgroundImage && (
            <KonvaImage width={600} height={400} image={backgroundImage} />
          )}

          {userImage && (
            <KonvaImage
              image={userImage}
              x={150}
              y={150}
              width={300}
              height={300}
              draggable
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Editor;
