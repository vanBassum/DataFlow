import React, { memo, useState } from "react";
import {
  Position, Handle, useReactFlow
} from "@xyflow/react";


const TextNode = ({ id }) => {
  const { updateNodeData } = useReactFlow();
  const [text, setText] = useState("");

  const stringToUint8Array = (str) => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };


  // The input field changed
  const updateText = (text) => {
    setText(text);
    var data = {raw: stringToUint8Array(text)};
    updateNodeData(id, data);
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
      <div style={{ marginBottom: "8px" }}>Input</div>
      <div>
        <textarea
          onChange={(event) => updateText(event.target.value)}
          value={text}
          style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(TextNode);
