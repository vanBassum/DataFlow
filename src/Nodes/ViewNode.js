import { memo, useEffect, useState, useMemo } from "react";
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
  
  const options = useMemo(() => [
    { value: "text", label: "Text", handler: uint8ArrayToString },
    { value: "hex", label: "Hex", handler: uint8ArrayToHexString }
  ], []);




  useEffect(() => {
    // Input node changed
    if (id !== null) {
      const selectedHandler = options.find(option => option.value === selectedOption)?.handler;
      if (selectedHandler) {
        setText(selectedHandler(nodesData[0]?.data?.raw));
      }
      // Pass data along unchanged.
      updateNodeData(id, nodesData[0]?.data);
    }
  }, [id, nodesData, selectedOption, options, updateNodeData]);

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
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
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
