import React, { memo, useState, useEffect, useMemo } from "react";
import {
  Position,
  Handle,
  useReactFlow,
} from "@xyflow/react";

const TextNode = ({ id }) => {
  const { updateNodeData } = useReactFlow();
  const [text, setText] = useState("");
  const [selectedOption, setSelectedOption] = useState("text");

  const asText = (data) => {
    return { value: data };
  };

  const asHex = (data) => {
    const hexArray = data.split(" ").map((hex) =>
      parseInt(hex, 16)
    );
    return { value: new Uint8Array(hexArray) };
  };

  const options = useMemo(
    () => [
      { value: "text", label: "Text", handler: asText },
      { value: "hex", label: "Hex", handler: asHex }
    ],
    []
  );

  useEffect(() => {
    // Input node changed
    if (id !== null) {
      const selectedHandler = options.find((option) => option.value === selectedOption)?.handler;
      if (selectedHandler) {
        var converted = selectedHandler(text);
        updateNodeData(id, converted);
      }
    }
  }, [id, text, options, selectedOption, updateNodeData]);

  // The input field changed
  const updateText = (text) => {
    setText(text);
  };

  return (
    <div
      style={{
        background: "#eee",
        color: "#222",
        padding: 10,
        fontSize: 12,
        borderRadius: 10
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ marginRight: "auto" }}>Text</div>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          onChange={(event) => updateText(event.target.value)}
          value={text??""}
          style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "4px" }}
        />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(TextNode);
