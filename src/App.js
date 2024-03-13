import React, { } from 'react';
import Sidebar from './Sidebar';
import Flow from './Flow';
import './App.css';

import TextNode from "./Nodes/TextNode";
import ViewNode from "./Nodes/ViewNode";

const nodeTypes = {
  text: TextNode,
  view: ViewNode,
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
