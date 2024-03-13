import React, { } from 'react';
import Sidebar from './Sidebar';
import Flow from './Flow';
import './App.css';
import '@xyflow/react/dist/style.css';

import TextNode from "./Nodes/TextNode";
import ViewNode from "./Nodes/ViewNode";
import Base64Node from './Nodes/Base64Node';

const nodeTypes = {
  text: TextNode,
  view: ViewNode,
  base64: Base64Node,
};


export default function App() {


  return (
    <div className="App">
      <div className="sidebar">
        <Sidebar nodeTypes={nodeTypes} />
      </div>
      <div className="main-content">
        <Flow nodeTypes={nodeTypes} />
      </div>
    </div>


  );

}
