// import { SUPPORTED_ASSETS } from "@/component/TriggerSheet";ß
import { Handle, Position } from "@xyflow/react";
import type { TradingMetadata } from "common/types";

export function Backpack({data}: {
  data: {
    kind: "trigger" | "action";
    metadata: TradingMetadata
  }
}) {
  return <div className="min-w-52 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">Action</div>
    <div className="mt-1 text-base font-semibold text-slate-900">Backpack Trade</div>
    <div className="mt-2 text-sm text-slate-700">{data.metadata.type}</div>
    <div className="text-sm text-slate-700">Qty: {data.metadata.qty}</div>
    <div className="text-sm font-medium text-slate-900">{data.metadata.symbol}</div>
    <Handle type="source" position={Position.Right}></Handle>
    <Handle type="target" position={Position.Left}></Handle>
  </div>
}

