import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { Filter } from "lucide-react";

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(
    data?.condition || ""
  );

  return (
    <BaseNode
      id={id}
      icon={Filter}
      title="Filter"
      inputs={[
        { id: `${id}-input` },
      ]}
      outputs={[
        { id: `${id}-passed` },
        { id: `${id}-failed` },
      ]}
      fields={[
        {
          name: "condition",
          label: "Condition",
          type: "textarea",
          value: condition,
          onChange: (e) =>
            setCondition(e.target.value),
        },
      ]}
    >
      <div className="text-xs text-zinc-400">Routes data by condition.</div>
    </BaseNode>
  );
};