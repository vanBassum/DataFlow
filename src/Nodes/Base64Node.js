import { memo, useEffect, useState, useMemo } from "react";
import {
  Position,
  useReactFlow,
  Handle,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";

function Base64Node({ id = null }) {
  const { updateNodeData } = useReactFlow();
  const [selectedOption, setSelectedOption] = useState("base64encode");
  const [error, setError] = useState(null);
  const connections = useHandleConnections({ type: "target" });
  const nodesData = useNodesData(connections.map((connection) => connection.source));
 
  function base64Encode(data) {
    if (data?.value instanceof Uint8Array) {
      setError(null);
      const binaryString = Array.from(data.value).map(byte => String.fromCharCode(byte)).join('');
      return {value: btoa(binaryString)};
    }
  
    setError("Data '" + typeof data?.value + "' not supported");
    return null;
  }
  
  function base64Decode(data) {
    if (typeof data?.value === 'string') {
      setError(null);
      const binaryString = atob(data.value);
      return {value: new TextEncoder().encode(binaryString)};
    }
  
    setError("Data '" + typeof data?.value + "' not supported");
    return null;
  }
  

  const options = useMemo(() => [
    { value: "base64encode", label: "Base 64 encode", handler: base64Encode  },
    { value: "base64decode", label: "Base 64 decode", handler: base64Decode  },
  ], []);

  useEffect(() => {
    // Input node changed
    if (id !== null) {
      const selectedHandler = options.find(option => option.value === selectedOption)?.handler;
      if (selectedHandler) {
        var converted = selectedHandler(nodesData[0]?.data);
        updateNodeData(id, converted);
      }
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
        <div style={{ marginRight: "auto" }}>Base64</div>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div style={{color: '#FF0000'}}>
        {error}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(Base64Node);
