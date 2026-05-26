import { useState, useEffect} from "react";
import { BaseNode } from "../components/BaseNode";
import { ParseVariables }from "../utils/ParseVariables";
import { useUpdateNodeInternals }from "@xyflow/react";
import { Type } from "lucide-react";

export const TextNode = ({ id, data }) => {

  const [currText, setCurrText] = useState(
    data?.text || "{{input}}"
  );

  const updateNodeInternals = useUpdateNodeInternals();
  const variables = ParseVariables(currText);

  useEffect(() => {
  updateNodeInternals(id);
}, [variables, id, updateNodeInternals]);

  return (
    <BaseNode
      id={id}
      icon={Type}
      title="Text"

      inputs={variables.map((variable) => ({
        id: `${id}-${variable}`,
      }))}

      outputs={[
        {
          id: `${id}-output`,
        },
      ]}

      fields={[
        {
          name: "text",
          label: "Text",
          type: "textarea",
          value: currText,

          onChange: (e) =>
            setCurrText(e.target.value),
        },
      ]}
    >
      <div className="text-xs text-zinc-400">Formats text with variables.</div>
    </BaseNode>
  );
};