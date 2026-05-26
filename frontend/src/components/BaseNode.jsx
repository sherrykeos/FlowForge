import { useState } from "react";
import { Position } from "@xyflow/react";
import { CustomHandle } from "./CustomHandle";
import { NodeField } from "./NodeField";
import { useStore } from "../store.js";
import { Copy, Trash2 } from "lucide-react";

export const BaseNode = ({
  id,
  icon: Icon,
  title,
  inputs = [],
  outputs = [],
  fields = [],
  children,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const duplicateNode = useStore((state) => state.duplicateNode);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="relative min-w-[240px] rounded-2xl border border-zinc-700 bg-zinc-900 text-white shadow-xl">
      {/* Header */}
      <div className="group border-b border-zinc-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={16} className="text-purple-400" />}

            <span className="font-semibold">{title}</span>
          </div>

          <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              onClick={() => duplicateNode(id)}
              className="rounded-md bg-zinc-800 p-1.5 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              <Copy size={14} />
            </button>

            <button
              onClick={() => {
                if (confirmDelete) {
                  deleteNode(id);
                } else {
                  setConfirmDelete(true);
                }
              }}
              onMouseLeave={() => setConfirmDelete(false)}
              className="flex min-w-[26px] items-center justify-center rounded-md bg-red-500/10 p-1.5 text-red-700 transition-all hover:bg-red-600 hover:text-white"
            >
              {confirmDelete ? (
                <span className="px-1 text-[10px] font-bold uppercase tracking-wider">Confirm</span>
              ) : (
                <Trash2 size={14} />
              )}
            </button>
          </div>
        </div>
        {children && <div className="mt-1">{children}</div>}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        {fields.map((field) => (
          <NodeField key={field.name} field={field} />
        ))}
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <CustomHandle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{
            top: `${((index + 1) / (inputs.length + 1)) * 100}%`,
          }}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <CustomHandle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{
            top: `${((index + 1) / (outputs.length + 1)) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};
