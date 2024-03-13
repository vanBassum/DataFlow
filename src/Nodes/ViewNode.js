import { memo, useEffect, useState } from "react";
import {
  Position,
  useReactFlow,
  Handle,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";

function ViewNode({ id = null }) {
  const { updateNodeData } = useReactFlow();
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("text");
  const connections = useHandleConnections({ type: "target" });
  const nodesData = useNodesData(connections.map((connection) => connection.source));


  const uint8ArrayToString = (uint8Array) => {
    const decoder = new TextDecoder();
    return decoder.decode(uint8Array);
  };

  const uint8ArrayToHexString = (uint8Array) => {
    return Array.from(uint8Array)
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join(' ');
  }


  useEffect(() => {
    // Input node changed
    if (id !== null) {
      if (selectedOption === "text") {
        setText(uint8ArrayToString(nodesData[0]?.data?.raw));
      } else {
        setText(uint8ArrayToHexString(nodesData[0]?.data?.raw));
      }
      // Pass data along unchanged.
      updateNodeData(id, nodesData[0]?.data);
    }
  }, [id, nodesData, selectedOption, updateNodeData]);

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
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={connections.length === 0}
      />
      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ marginRight: "auto" }}>View</div>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="text">Text</option>
          <option value="hex">Hex</option>
        </select>
      </div>
      <div>
        <textarea
          value={text}
          readOnly
          style={{ backgroundColor: "#f4f4f4", border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}
        />
      </div>


      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(ViewNode);
