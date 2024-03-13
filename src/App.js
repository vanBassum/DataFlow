import React, { useState, useCallback, useRef } from 'react';
import Sidebar from './Sidebar';
import Flow from './Flow';

import TextNode from "./Nodes/TextNode";
import ViewNode from "./Nodes/ViewNode";

const nodeTypes = {
  text: TextNode,
  view: ViewNode,
};


export default function App() {


  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        nodeTypes={nodeTypes}
      />
      <div style={{ flex: 1, height: '100vh', overflow: 'hidden' }}>
        <Flow
          nodeTypes={nodeTypes}
        />
      </div>

    </div>
  );

}
