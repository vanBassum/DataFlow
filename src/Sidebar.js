import React from 'react';

export default ({nodeTypes}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div
        style={{marginLeft: '8px', marginRight: '8px',marginTop: '8px'}}
      >Drag and drop</div>
      {Object.keys(nodeTypes).map((type, index) => (
        
        <div
          key={type}
          style={{marginLeft: '8px', marginRight: '8px',marginTop: '8px', background: '#CCC'}}
          className={`dndnode ${type}`}
          onDragStart={(event) => onDragStart(event, type)}
          draggable
        >
          {type}
        </div>
      ))}
    </aside>
  );
};

