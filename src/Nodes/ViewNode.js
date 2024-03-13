import { memo, useEffect } from "react";
import {
  Position,
  useReactFlow,
  Handle,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";

function ViewNode({ id = null }) {
  const { updateNodeData } = useReactFlow();
  const connections = useHandleConnections({ type: "target" });
  const nodesData = useNodesData(connections.map((connection) => connection.source));

  useEffect(() => {
    if (id !== null) {
      updateNodeData(id, { text: nodesData[0]?.data?.text });
    }
  }, [id, nodesData]);

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
      <div style={{ marginBottom: "8px" }}>View</div>
      <div>
        <input
          value={nodesData[0]?.data?.text}
          readOnly
          style={{ backgroundColor: "#f4f4f4", border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}
        />
      </div>


      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default memo(ViewNode);
