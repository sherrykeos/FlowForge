import { useState } from "react";
import { BaseNode } from "../components/BaseNode.jsx";
import { FileInput } from "lucide-react";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  return (
    <BaseNode
      id={id}
      icon={FileInput}
      title="Input"
      outputs={[
        {
          id: `${id}-value`,
        },
      ]}
      fields={[
        {
          name: "inputName",
          label: "Name",
          type: "text",
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          name: "inputType",
          label: "Type",
          type: "select",
          value: inputType,
          options: ["Text", "File"],
          onChange: (e) => setInputType(e.target.value),
        },
      ]}
    >
      <div className="text-xs text-zinc-400">Pipeline entry point.</div>
    </BaseNode>
  );
};