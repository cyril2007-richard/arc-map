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
      className={`relative min-w-[120px] rounded-lg border-2 ${
        isClass 
          ? 'bg-node-class border-node-class/50' 
          : 'bg-node-function border-node-function/50'
      } shadow-lg hover:shadow-glow-secondary transition-all duration-200 
        cursor-pointer group`}
      onClick={() => onClick(name, file)}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-primary border-2 border-background" 
      />
      
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          {isClass ? (
            <Zap className="w-4 h-4 text-node-class" />
          ) : (
            <Braces className="w-4 h-4 text-node-function" />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">
              {name}
            </div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground truncate">
          {file.split('/').pop()}
        </div>
        
        <div className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium mt-1 ${
          isClass 
            ? 'bg-node-class/20 text-node-class' 
            : 'bg-node-function/20 text-node-function'
        }`}>
          {type}
        </div>
      </div>
    </div>
  );
}

export default memo(FunctionNode);