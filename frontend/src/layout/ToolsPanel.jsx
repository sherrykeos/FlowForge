import { DraggableNode } from "../components/draggableNode.jsx";
import { NodeRegistry } from "../NodeRegistry.js";

export const ToolsPanel = () => {
  return (
    <div className="p-4">
      <div className="mt-4 flex flex-wrap gap-3">
        {NodeRegistry.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
};