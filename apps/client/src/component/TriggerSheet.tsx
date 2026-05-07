import { Button } from "@/components/ui/button"
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
import { SUPPORTED_ASSETS, type PriceTriggerMetadata, type TimerNodeMetadata } from "common/types"
import { Input } from "@/components/ui/input"

const SUPPORTED_TRIGGERS = [{
    id : "timer",
    title : "Timer",
    description : "run this timer every x seconds/minutes."
},{
    id : "price-trigger",
    title : "Price Trigger",
    description : "runs when the price goes above or below of a certain number of asset."
}]



//props destructuring
// onSelect is a callback function that runs when a user picks something.
export const TriggerSheet = ({onSelect}:{onSelect : (kind: NodeKind, metadata : NodeMetadata)=> void}) => 
    {
    const [selectedTrigger, setSelectedTrigger] = useState<(typeof SUPPORTED_TRIGGERS)[number]["id"]>(SUPPORTED_TRIGGERS[0].id);
    const [timerMetadata, setTimerMetadata] = useState<TimerNodeMetadata>({
      time: 3600,
    });
    const [priceMetadata, setPriceMetadata] = useState<PriceTriggerMetadata>({
      asset: SUPPORTED_ASSETS[0],
      price: 0,
    });

    return <Sheet open={true}>
  <SheetContent className="border-l border-slate-200/70 bg-white/92 backdrop-blur-md shadow-2xl">
    <SheetHeader>
      <SheetTitle className="text-xl font-semibold tracking-tight text-slate-900">
        Select Trigger
      </SheetTitle>
      <SheetDescription className="space-y-4 text-slate-600">
        <p className="text-sm">Choose how this workflow should start.</p>
        <div className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          Active: {selectedTrigger}
        </div>
        {/* Trigger Select */}
        <Select
          value={selectedTrigger}
          onValueChange={(value: string) =>
            setSelectedTrigger(
              value as (typeof SUPPORTED_TRIGGERS)[number]["id"]
            )
          }
        >
          <SelectTrigger className="w-full rounded-lg border-slate-300 bg-white shadow-sm">
            <SelectValue placeholder="Select a trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                <SelectItem key={id} value={id}>
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* TIMER */}
        {selectedTrigger === "timer" && (
          <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="text-sm font-medium text-slate-800">
              Number of seconds after which to run the timer
            </div>
            <Input
              className="border-slate-300 bg-white"
              value={timerMetadata.time}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTimerMetadata({
                  time: Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {/* PRICE TRIGGER */}
        {selectedTrigger === "price-trigger" && (
          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="text-sm font-medium text-slate-800">Price</div>
            <Input
              className="border-slate-300 bg-white"
              type="text"
              value={priceMetadata.price}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPriceMetadata((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />
            <div className="text-sm font-medium text-slate-800">Asset</div>
            <Select
              value={priceMetadata.asset}
              onValueChange={(value) =>
                setPriceMetadata((prev) => ({
                  ...prev,
                  asset: value,
                }))
              }
            >
              <SelectTrigger className="w-full rounded-lg border-slate-300 bg-white shadow-sm">
                <SelectValue placeholder="Select an asset" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_ASSETS.map((id) => (
                    <SelectItem key={id} value={id}>
                      {id}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </SheetDescription>
    </SheetHeader>
    <SheetFooter>
      <Button
        className="w-full rounded-lg bg-slate-900 text-white hover:bg-slate-800"
        onClick={() =>
          onSelect(
            selectedTrigger,
            selectedTrigger === "timer"
              ? timerMetadata
              : priceMetadata
          )
        }
      >
        Add node
      </Button>
    </SheetFooter>
  </SheetContent>
</Sheet>}