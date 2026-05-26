import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { FileOutput } from "lucide-react";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  return (
    <BaseNode
      id={id}
      icon={FileOutput}
      title="Output"
      inputs={[
        {
          id: `${id}-value`,
        },
      ]}
      fields={[
        {
          name: "outputName",
          label: "Name",
          type: "text",
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          name: "outputType",
          label: "Type",
          type: "select",
          value: outputType,
          options: ["Text", "Image"],
          onChange: (e) => setOutputType(e.target.value),
        },
      ]}
    >
      <div className="text-xs text-zinc-400">Pipeline exit point.</div>
    </BaseNode>
  );
};