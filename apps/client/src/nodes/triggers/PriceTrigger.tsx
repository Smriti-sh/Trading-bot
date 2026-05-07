import { Handle, Position } from "@xyflow/react";
import type { PriceTriggerMetadata } from "common/types";



export function PriceTrigger({data, isConnectable}: {
  data: {
    metadata: PriceTriggerMetadata
  },
  isConnectable: boolean
}) {
  return <div className="min-w-52 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
    <div className="text-xs font-semibold uppercase tracking-wide text-violet-700">Trigger</div>
    <div className="mt-1 text-base font-semibold text-slate-900">Price Trigger</div>
    <div className="mt-2 text-sm text-slate-600">Asset</div>
    <div className="font-medium text-slate-900">
        {data.metadata.asset}
    </div>
    <div className="mt-1 text-sm text-slate-600">Target Price</div>
    <div className="font-medium text-slate-900">
        {data.metadata.price}
    </div> 
    <Handle type="source" position={Position.Right}></Handle>
  </div>
}