import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { Calculator }from "lucide-react";

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(
    data?.operation || "+"
  );

  return (
    <BaseNode
    id={id}
    icon={Calculator}
      title="Math"
      inputs={[
        { id: `${id}-a` },
        { id: `${id}-b` },
      ]}
      outputs={[
        { id: `${id}-result` },
      ]}
      fields={[
        {
          name: "operation",
          label: "Operation",
          type: "select",
          value: operation,
          options: ["+", "-", "*", "/"],
          onChange: (e) =>
            setOperation(e.target.value),
        },
      ]}
    >
      <div className="text-xs text-zinc-400">Applies math operations.</div>
    </BaseNode>
  );
};