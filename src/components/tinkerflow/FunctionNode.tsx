import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Braces, Zap } from 'lucide-react';

interface FunctionNodeProps {
  data: {
    name: string;
    file: string;
    type: 'function' | 'class';
    onClick: (name: string, file: string) => void;
  };
}

function FunctionNode({ data }: FunctionNodeProps) {
  const { name, file, type, onClick } = data;
  const isClass = type === 'class';

  return (
    <div 
      className={`relative min-w-[100px] rounded border ${
        isClass 
          ? 'bg-node-class/10 border-node-class/50 text-node-class' 
          : 'bg-node-function/10 border-node-function/50 text-node-function'
      } backdrop-blur-sm shadow-[0_0_8px_currentColor] hover:shadow-[0_0_15px_currentColor] 
        transition-all duration-300 cursor-pointer group animate-fade-in`}
      onClick={() => onClick(name, file)}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-1.5 h-1.5 bg-current border-0 shadow-[0_0_4px_currentColor]" 
      />
      
      <div className="p-2">
        <div className="flex items-center gap-1.5 mb-1">
          {isClass ? (
            <Zap className="w-3 h-3 opacity-80" />
          ) : (
            <Braces className="w-3 h-3 opacity-80" />
          )}
          <div className="text-xs font-mono font-medium truncate">
            {name}
          </div>
        </div>
        
        <div className="text-[9px] text-current/60 truncate font-mono">
          {file.split('/').pop()}
        </div>
        
        <div className="text-[8px] font-mono font-bold uppercase tracking-widest mt-1 opacity-60">
          {type}
        </div>
      </div>
    </div>
  );
}

export default memo(FunctionNode);