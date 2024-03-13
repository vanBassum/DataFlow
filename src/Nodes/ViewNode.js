import React, { memo, useState } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from "@xyflow/react";

function ViewNode() {
  const connections = useHandleConnections({
    type: "target",
  });
  const nodesData = useNodesData(
    connections.map((connection) => connection.source)
  );

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
      <Handle type="target" position={Position.Left} />
      <div>
        incoming texts:{" "}
        {nodesData
          ?.filter((nodeData) => nodeData.data.text !== undefined)
          .map(({ data }, i) => <div key={i}>{data.text}</div>) || "none"}
      </div>
    </div>
  );
}

export default memo(ViewNode);
