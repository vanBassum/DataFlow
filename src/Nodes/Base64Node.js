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
  const connections = useHandleConnections({ type: "target" });
  const nodesData = useNodesData(connections.map((connection) => connection.source));
 
  const stringToUint8Array = (str) => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  function base64Encode(byteArray) {
    const binaryString = Array.from(byteArray).map(byte => String.fromCharCode(byte)).join('');
    return stringToUint8Array(btoa(binaryString));
  }

  function base64Decode(byteArray) {
    const binaryString = Array.from(byteArray).map(byte => String.fromCharCode(byte)).join('');
    return stringToUint8Array(atob(binaryString));
  }

  const options = useMemo(() => [
    { value: "base64encode", label: "Base 64 encode", handler: base64Encode  },
    { value: "base64decode", label: "Base 64 decode", handler: base64Decode  },
  ], []);

  useEffect(() => {
    // Input node changed
    if (id !== null) {
      const selectedHandler = options.find(option => option.value === selectedOption)?.handler;
      if (selectedHandler && nodesData[0]?.data?.raw) {
        var converted = selectedHandler(nodesData[0]?.data?.raw);
        updateNodeData(id, {raw: converted});
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
        <div style={{ marginRight: "auto" }}>View</div>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(Base64Node);
