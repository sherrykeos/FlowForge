import { BaseNode } from "../components/BaseNode";
import { Merge } from "lucide-react";

export const MergeNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      icon={Merge}
      title="Merge"
      inputs={[
        { id: `${id}-input-1` },
        { id: `${id}-input-2` },
        { id: `${id}-input-3` },
      ]}
      outputs={[
        { id: `${id}-output` },
      ]}
    >
      <div className="text-xs text-zinc-400">
        Merges multiple inputs.
      </div>
    </BaseNode>
  );
};