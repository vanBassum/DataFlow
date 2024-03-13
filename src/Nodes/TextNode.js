import React, { memo, useState } from "react";
import {
  Position, NodeProps, Handle, useReactFlow
} from "@xyflow/react";


const TextNode = ({ id, data }) => {
  const { updateNodeData } = useReactFlow();
  const [text, setText] = useState(data.text);

  const updateText = (text) => {
    // Avoid jumping caret with a synchronous update
    setText(text);
    // Update actual node data
    updateNodeData(id, { text });
  };

  return (
    <div
      style={{
        background: "#eee",
        color: "#222",
        padding: 10,
        fontSize: 12,
        borderRadius: 10,
      }}
    >
      <div>node {id}</div>
      <div>
        <input
          onChange={(event) => updateText(event.target.value)}
          value={text}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(TextNode);
