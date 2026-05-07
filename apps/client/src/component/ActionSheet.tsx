import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { useState, type ChangeEvent } from "react"
import type {NodeMetadata} from "./CreateWorkflow"
import type {NodeKind} from "./CreateWorkflow" 
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SUPPORTED_ASSETS, type TradingMetadata } from "common/types"

// list of available triggers
const SUPPORTED_ACTIONS = [{
    id : "hyperliquid",
    title : "Hyperliquid",
    description : "Place a trad on hyperliquid"
},{
    id : "lighter",
    title : "Lighter",
    description : "Place a trad on lighter"
},{
    id : "backpack",
    title : "Backpack",
    description : "Place a trad on backpack"
}]

// const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

//props destructuring
// onSelect is a callback function that runs when a user picks something.
export const ActionSheet = ({onSelect}:{onSelect : (kind: NodeKind, metadata : NodeMetadata)=> void}) => 
    {
    const [metadata, setMetadata] = useState<TradingMetadata>({
      type: "LONG",
      qty: 0,
      symbol: SUPPORTED_ASSETS[0],
    });   
    const [selectedAction, setSelectedAction] = useState<(typeof SUPPORTED_ACTIONS)[number]["id"]>(SUPPORTED_ACTIONS[0].id); //Stores the type of trigger selected by the user

    return <Sheet open={true}>
    <SheetContent className="border-l border-slate-200/70 bg-white/92 backdrop-blur-md shadow-2xl">
      <SheetHeader>
        <SheetTitle className="text-xl font-semibold tracking-tight text-slate-900">Select Action</SheetTitle>
        <SheetDescription className="space-y-4 text-slate-600">
            <p className="text-sm">Choose where the workflow should place the trade.</p>
            <div className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Active: {selectedAction}
            </div>
            <Select value={selectedAction} onValueChange={(value: string)=>setSelectedAction(value as (typeof SUPPORTED_ACTIONS)[number]["id"])}>
                <SelectTrigger className="w-full rounded-lg border-slate-300 bg-white shadow-sm">
                    <SelectValue placeholder="Select a trigger" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    {SUPPORTED_ACTIONS.map(({id,title}) => (
                      <SelectItem key={id} value={id}>{title}</SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {(selectedAction === "lighter" || selectedAction === "hyperliquid" || selectedAction === "backpack") &&  
            (<div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="text-sm font-medium text-slate-800">
                Type
                </div>
                <Select value={metadata.type} onValueChange={(value: string) => setMetadata({
                  ...metadata,
                  type: value as TradingMetadata["type"]
                })}>
                  <SelectTrigger className="w-full rounded-lg border-slate-300 bg-white shadow-sm">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={"LONG"}>{"LONG"}</SelectItem>
                            <SelectItem value={"SHORT"}>{"SHORT"}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                <div className="text-sm font-medium text-slate-800">
                Symbol
                </div>
                <Select value={metadata.symbol} onValueChange={(value: string) => setMetadata({
                  ...metadata,
                  symbol: value as TradingMetadata["symbol"]
                  })}>
                  <SelectTrigger className="w-full rounded-lg border-slate-300 bg-white shadow-sm">
                    <SelectValue placeholder="Select a symbol" />
                  </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {SUPPORTED_ASSETS.map(asset => <SelectItem key={asset} value={asset}>
                                {asset}
                                </SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="text-sm font-medium text-slate-800">
                Qty
                </div>
                <Input className="border-slate-300 bg-white" value={metadata.qty} onChange={(e: ChangeEvent<HTMLInputElement>) => setMetadata({
                  ...metadata,
                  qty: Number(e.target.value)
                })}></Input>
            </div>)}
        </SheetDescription>
      </SheetHeader >
      <SheetFooter>
        <Button className="w-full rounded-lg bg-slate-900 text-white hover:bg-slate-800" onClick={()=>{
          onSelect(
            selectedAction,
            // selectedTrigger === "timer" ? timerMetadata : priceMetadata
            metadata
          )
        }} type="submit">Add action</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
} 
