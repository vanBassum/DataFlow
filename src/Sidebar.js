import React from 'react';

export default ({nodeTypes}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      {Object.keys(nodeTypes).map((type, index) => (
        <div
          key={type}
          className={`dndnode ${type}`}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          {type} Node
        </div>
      ))}
    </aside>
  );
};

