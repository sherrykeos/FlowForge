import { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from '@xyflow/react';
import { X } from 'lucide-react';
import { useStore } from '../store.js';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const deleteEdge = useStore((state) => state.deleteEdge);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button
            className={`flex h-5 cursor-pointer items-center justify-center rounded-full bg-zinc-800/90 border border-zinc-600 text-zinc-300 hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-400 transition-all shadow-sm ${confirmDelete ? 'px-2' : 'w-5'}`}
            onClick={(event) => {
              event.stopPropagation();
              if (confirmDelete) {
                deleteEdge(id);
              } else {
                setConfirmDelete(true);
              }
            }}
            onMouseLeave={() => setConfirmDelete(false)}
            title="Delete Edge"
          >
            {confirmDelete ? (
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Confirm</span>
            ) : (
              <X size={12} />
            )}
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};