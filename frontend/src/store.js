// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "@xyflow/react";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  result: null,
  nodeIDs: {},
  
  setResult: (result) => {
    set({ result });
  },

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  clearAll: () => {
    set({
      nodes: [],
      edges: [],
      nodeIDs: {},
      result: null,
    });
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "custom",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges,
      ),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },

  deleteEdge: (edgeId) => {
    set({
      edges: get().edges.filter((edge) => edge.id !== edgeId),
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),

      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      ),
    });
  },

  duplicateNode: (nodeId) => {
    const nodeToDuplicate = get().nodes.find((node) => node.id === nodeId);
    if (!nodeToDuplicate) return;
    const type = nodeToDuplicate.type;
    const newId = get().getNodeID(type);
    const offset = 60;
    const duplicatedNode = {
      id: newId,
      type: nodeToDuplicate.type,
      position: {
        x: nodeToDuplicate.position.x + offset + Math.random() * 20,
        y: nodeToDuplicate.position.y + offset + Math.random() * 20,
      },
      data: {
        ...structuredClone(nodeToDuplicate.data),
        id: newId,
      },
    };
    set({
      nodes: [...get().nodes, duplicatedNode],
    });
  },
}));
