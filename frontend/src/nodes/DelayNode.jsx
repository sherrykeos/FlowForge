import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { Timer } from "lucide-react";

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(
    data?.delay || "1000"
  );

  return (
    <BaseNode
      id={id}
      icon={Timer}
      title="Delay"
      inputs={[
        { id: `${id}-input` },
      ]}
      outputs={[
        { id: `${id}-output` },
      ]}
      fields={[
        {
          name: "delay",
          label: "Delay (ms)",
          type: "text",
          value: delay,
          onChange: (e) =>
            setDelay(e.target.value),
        },
      ]}
    >
      <div className="text-xs text-zinc-400">Pauses execution.</div>
    </BaseNode>
  );
};