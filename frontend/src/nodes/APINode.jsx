import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { Brain } from "lucide-react";

export const ApiNode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(
    data?.endpoint || ""
  );

  const [method, setMethod] = useState(
    data?.method || "GET"
  );

  return (
    <BaseNode
      id={id}
      icon={Brain}
      title="API"
      inputs={[
        { id: `${id}-input` },
      ]}
      outputs={[
        { id: `${id}-response` },
      ]}
      fields={[
        {
          name: "endpoint",
          label: "Endpoint",
          type: "text",
          value: endpoint,
          onChange: (e) =>
            setEndpoint(e.target.value),
        },
        {
          name: "method",
          label: "Method",
          type: "select",
          value: method,
          options: ["GET", "POST", "PUT"],
          onChange: (e) =>
            setMethod(e.target.value),
        },
      ]}
    >
      <div className="text-xs text-zinc-400">Makes an HTTP request.</div>
    </BaseNode>
  );
};