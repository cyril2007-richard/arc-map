import { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { sampleCodebase, CodebaseFile } from '@/data/sampleCodebase';
import FileNode from './FileNode';
import FunctionNode from './FunctionNode';
import { toast } from 'sonner';

const nodeTypes = {
  file: FileNode,
  function: FunctionNode,
};

interface TinkerFlowCanvasProps {
  onFileSelect: (file: CodebaseFile) => void;
}

export default function TinkerFlowCanvas({ onFileSelect }: TinkerFlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const generateNodesAndEdges = useCallback(() => {
    const fileNodes: Node[] = [];
    const functionNodes: Node[] = [];
    const allEdges: Edge[] = [];

    // Create file nodes positioned in a grid
    sampleCodebase.files.forEach((file, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      
      fileNodes.push({
        id: `file-${index}`,
        type: 'file',
        position: { x: col * 300, y: row * 200 },
        data: { 
          file, 
          onFileClick: onFileSelect 
        },
      });

      // Create function/class nodes for each file
      [...file.functions, ...file.classes].forEach((funcName, funcIndex) => {
        const funcNode: Node = {
          id: `func-${index}-${funcIndex}`,
          type: 'function',
          position: { 
            x: col * 300 + 200, 
            y: row * 200 + 80 + (funcIndex * 50) 
          },
          data: {
            name: funcName,
            file: file.path,
            type: file.classes.includes(funcName) ? 'class' : 'function',
            onClick: (name: string, filePath: string) => {
              toast(`Opening ${name} in ${filePath.split('/').pop()}`);
            }
          },
        };
        
        functionNodes.push(funcNode);

        // Connect function to its file
        allEdges.push({
          id: `edge-file-func-${index}-${funcIndex}`,
          source: `file-${index}`,
          target: `func-${index}-${funcIndex}`,
          type: 'smoothstep',
          animated: false,
          style: { stroke: 'hsl(var(--edge-default))' },
        });
      });
    });

    // Create import/dependency edges between files
    sampleCodebase.files.forEach((file, sourceIndex) => {
      file.imports.forEach((importPath) => {
        // Find matching files for imports
        const targetFileIndex = sampleCodebase.files.findIndex(f => 
          f.path.includes(importPath.replace('../', '').replace('./', '')) ||
          f.path.split('/').pop()?.replace('.tsx', '')?.replace('.ts', '') === importPath ||
          f.exports.some(exp => exp === importPath)
        );
        
        if (targetFileIndex !== -1 && targetFileIndex !== sourceIndex) {
          const edgeId = `import-${sourceIndex}-${targetFileIndex}`;
          
          // Avoid duplicate edges
          if (!allEdges.find(edge => edge.id === edgeId)) {
            allEdges.push({
              id: edgeId,
              source: `file-${targetFileIndex}`,
              target: `file-${sourceIndex}`,
              type: 'smoothstep',
              animated: false,
              style: { 
                stroke: 'hsl(var(--edge-import))',
                strokeWidth: 1.5,
                opacity: 0.7
              },
            });
          }
        }
      });
    });

    setNodes([...fileNodes, ...functionNodes]);
    setEdges(allEdges);
  }, [onFileSelect, setNodes, setEdges]);

  useEffect(() => {
    generateNodesAndEdges();
  }, [generateNodesAndEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full bg-flow-canvas relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-flow-canvas"
        proOptions={{ hideAttribution: true }}
      >
        <Background 
          color="hsl(var(--flow-grid))" 
          gap={30} 
          size={0.5}
        />
        <Controls 
          className="bg-card/50 border border-border/30 shadow-lg rounded backdrop-blur-sm"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap 
          nodeColor="hsl(var(--node-file))"
          className="bg-card/50 border border-border/30 shadow-lg rounded backdrop-blur-sm"
          pannable
          zoomable
          position="bottom-right"
        />
      </ReactFlow>
    </div>
  );
}