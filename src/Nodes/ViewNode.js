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
  const [error, setError] = useState(null);
  const connections = useHandleConnections({ type: "target" });
  const nodesData = useNodesData(connections.map((connection) => connection.source));

  const asText = (data) => {
    if (typeof data?.value === 'string') {
      setError(null);
      return data.value;
    }
  
    if (data?.value instanceof Uint8Array) {
      setError(null);
      return new TextDecoder().decode(data.value);
    }
  
    setError("Data '" + typeof data?.value + "' not supported");
    return null;
  };
  
  const asHex = (data) => {
    if (typeof data?.value === 'string') {
      setError(null);
      return new TextEncoder().encode(data.value).map(byte => byte.toString(16).padStart(2, '0')).join(' ');
    }
  
    if (data?.value instanceof Uint8Array) {
      setError(null);
      return Array.from(data.value).map(byte => byte.toString(16).padStart(2, '0')).join(' ');
    }
  
    setError("Data '" + typeof data?.value + "' not supported");
    return null;
  }
  
  
  const options = useMemo(() => [
    { value: "text", label: "Text", handler: asText },
    { value: "hex", label: "Hex", handler: asHex }
  ], []);

  useEffect(() => {
    // Input node changed
    if (id !== null) {
      const selectedHandler = options.find(option => option.value === selectedOption)?.handler;
      if (selectedHandler) {
        setText(selectedHandler(nodesData[0]?.data));
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
      <div style={{color: '#FF0000'}}>
        {error}
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(ViewNode);
