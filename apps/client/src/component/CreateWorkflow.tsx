import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  type NodeChange,
  type NodeTypes
} from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { Timer } from '@/nodes/triggers/Timer'; 
import type { TradingMetadata, PriceTriggerMetadata, TimerNodeMetadata } from "common/types";
import { Select } from 'radix-ui';
import { ActionSheet } from './ActionSheet';
import { Lighter } from '@/nodes/actions/Lighter';
import { Hyperliquid } from '@/nodes/actions/Hyperliquid';
import { Backpack } from '@/nodes/actions/Backpack';
// import { connect } from 'node:http2';

const nodeTypes: NodeTypes = {
  "price-trigger" : PriceTrigger,
  "timer" : Timer,
  "lighter" : Lighter,
  "hyperliquid" : Hyperliquid,
  "backpack" : Backpack
}

export type NodeKind = "price-trigger" | "timer" | "lighter" | "hyperliquid" | "backpack";

interface NodeType{
  type : NodeKind,
    data : {
      kind : "action" | "trigger",
      metadata : NodeMetadata
    },
    id : string,
    position : {x: number, y: number}
}

export type NodeMetadata = TradingMetadata | PriceTriggerMetadata | TimerNodeMetadata;

interface Edge {
    id : string,
    source : string,
    target : string
}

export function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  // console.log("nodes",nodes);
  // console.log("edges",edges);

  const [selectAction, setSelectAction] = useState<{
    position : {x: number, y: number},
    startingNodeId : string,
  } | null >(null); // for storing the node that user has currently selected, we can use this to show a sidebar with node details and allow user to edit node metadata.

  // memoized callback functions for handling changes in nodes and edges, and for handling new connections between nodes.

  const onNodesChange = useCallback((changes : any) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes : any) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((params : any) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  // for getting info about the connection when user connects two nodes, for example we can get source and target node info from connectionInfo and use that to decide if connection is valid or not, or to trigger some action on connection.
  const POSITION_OFFSET = 30 // offset for placing the action node away from the trigger node
  const onConnectEnd = useCallback(
    (params, connectionInfo) =>{
      
      if (!connectionInfo.isValid) {
        console.log("connectionINFO",connectionInfo)
        setSelectAction({
          startingNodeId : connectionInfo.fromNode.id,
          position : {
            x : connectionInfo.from.x + POSITION_OFFSET,
            y : connectionInfo.from.y + POSITION_OFFSET,
          }
        })
        console.log (connectionInfo.fromNode.id);
        console.log (connectionInfo.fromNode.to);
    }
    },
    [] 
  )
 
  return (
    <ReactFlowProvider>
      <div className="workflow-canvas" style={{ width: '100vw', height: '100vh' }}>
      {/* {JSON.stringify(nodes)} */}
        {/* if no node present open sidebar dircetly for user to select first node */}
        {!nodes.length && <TriggerSheet onSelect={(type, metadata) => {
          setNodes([...nodes, {
            id: Math.random().toString(),
            type,
            data: { 
              kind : "trigger",
              metadata
            },
            position : {x:0, y:0}
          }])
        }}/>}
        {/* {JSON.stringify(selectAction)} */}
        {selectAction && <ActionSheet onSelect={(type, metadata) => {
          const nodeId = Math.random().toString();
          setNodes([...nodes, {
            id: nodeId,
            type,
            data: { 
              kind : "action",
              metadata
            },
            position : selectAction.position
          }]);
          setEdges([...edges, {
            id : `${selectAction.startingNodeId}-${nodeId}`,
            source : selectAction.startingNodeId,
            target : nodeId,
          }])
          setSelectAction(null);
        }}/>}
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          fitView
        />
      </div>
    </ReactFlowProvider>
  );
}

