import { Handle, Position } from "@xyflow/react";
import type { TimerNodeMetadata } from "common/types";

// node component that receives props from React Flow
export function Timer({ data }: {
  data: {
    kind: "trigger" | "action";
    metadata: TimerNodeMetadata
  }
}) {
  return <div className="min-w-52 rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 shadow-sm">
    <div className="text-xs font-semibold uppercase tracking-wide text-sky-700">Trigger</div>
    <div className="mt-1 text-base font-semibold text-slate-900">Timer</div>
    <div className="mt-2 text-sm text-slate-700">Every {data.metadata.time} seconds</div>
    <Handle type="source" position={Position.Right}></Handle>
  </div>
}