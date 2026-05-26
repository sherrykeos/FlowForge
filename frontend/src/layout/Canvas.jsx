
import { useState, useRef, useCallback } from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import { useStore } from "../store.js";
import { useShallow } from "zustand/react/shallow";
import { NodeRegistry } from "../NodeRegistry.js";
import {
  useReactFlow,
  useViewport,
  Panel
} from "@xyflow/react";
import { CustomEdge } from "../components/CustomEdge.jsx";
import { RotateCcw } from "lucide-react";

import "@xyflow/react/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = Object.fromEntries(
  NodeRegistry.map((node) => [node.type, node.component]),
);

const edgeTypes = {
  custom: CustomEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  clearAll: state.clearAll,
});


const CustomControls = () => {

  const {
    zoomIn,
    zoomOut,
    fitView,
  } = useReactFlow();

  const { zoom } = useViewport();

  return (
    <div
      className="
        absolute
        bottom-3
        left-3
        z-50
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-white/10
        bg-zinc-900/80
        p-2
        text-white
        backdrop-blur-md
      "
    >

      <button
        onClick={() => zoomOut()}
        className="
          rounded
          bg-zinc-800
          px-2
          py-1  
          hover:bg-zinc-700
        "
      >
        −
      </button>

      <div className="min-w-[45px] text-center text-sm">
        {Math.round(zoom * 100)}%
      </div>

      <button
        onClick={() => zoomIn()}
        className="
          rounded
          bg-zinc-800
          px-2
          py-1
          hover:bg-zinc-700
        "
      >
        +
      </button>

      <button
        onClick={() => fitView()}
        className="
          rounded
          bg-purple-600
          px-3
          py-1
          text-sm
          hover:bg-purple-700
        "
      >
        Fit
      </button>

    </div>
  );
};








export const Canvas = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    clearAll,
  } = useStore(useShallow(selector));

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow"),
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type || !reactFlowInstance) {
          return;
        }

        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />

          <CustomControls />

          <MiniMap
            pannable
            zoomable
            nodeBorderRadius={10}
            bgColor="#000000"
            maskColor="rgba(0,0,0,0.7)"
            maskStrokeColor="rgba(168, 85, 247, 0.1)"
            maskStrokeWidth={2}
            className="!rounded-xl !border-2 !border-purple-500/10 !bg-zinc-900 !shadow-[0_0_15px_rgba(168,85,247,0.15)] !m-2"
            nodeColor="transparent"
            nodeStrokeColor="rgba(168, 85, 247)"
            nodeStrokeWidth={3}
          />

        <Panel position="top-left">
          <button
            onClick={() => {
              if (confirmReset) {
                clearAll();
                setConfirmReset(false);
              } else {
                setConfirmReset(true);
              }
            }}
            onMouseLeave={() => setConfirmReset(false)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold shadow-[0_0_15px_rgba(161,161,170,0.15)] transition-all ${
              confirmReset
                ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white"
                : "bg-zinc-500/10 border-zinc-500/30 text-zinc-300 hover:bg-zinc-600 hover:text-white"
            }`}
          >
            <RotateCcw size={14} className={confirmReset ? "animate-spin" : ""} />
            {confirmReset ? "Click to Confirm" : "Reset Everything"}
          </button>
        </Panel>
        </ReactFlow>
      </div>
    </>
  );
};
