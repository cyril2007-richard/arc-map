import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { FileText, AlertTriangle, Edit } from 'lucide-react';
import { CodebaseFile } from '@/data/sampleCodebase';

interface FileNodeProps {
  data: {
    file: CodebaseFile;
    onFileClick: (file: CodebaseFile) => void;
  };
}

const getFileIcon = (language: string, type: string) => {
  if (type === 'component') return '⚛️';
  if (type === 'hook') return '🪝';
  if (type === 'service') return '⚙️';
  if (type === 'utility') return '🔧';
  if (type === 'type') return '📝';
  if (type === 'style') return '🎨';
  return '📄';
};

const getNodeColor = (language: string, type: string, hasErrors: boolean) => {
  if (hasErrors) return 'bg-node-error border-node-error/50';
  
  switch (language) {
    case 'typescript':
      return 'bg-node-typescript border-node-typescript/50';
    case 'javascript':
      return 'bg-node-javascript border-node-javascript/50';
    case 'css':
      return 'bg-node-css border-node-css/50';
    default:
      return 'bg-node-file border-node-file/50';
  }
};

function FileNode({ data }: FileNodeProps) {
  const { file, onFileClick } = data;
  const hasErrors = file.errors.length > 0;
  const nodeColor = getNodeColor(file.language, file.type, hasErrors);
  const fileIcon = getFileIcon(file.language, file.type);

  return (
    <div 
      className={`relative min-w-[160px] rounded border ${nodeColor} 
        backdrop-blur-sm bg-opacity-90 shadow-neon hover:shadow-cyber 
        transition-all duration-300 cursor-pointer group animate-fade-in`}
      onClick={() => onFileClick(file)}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-2 h-2 bg-primary border-0 shadow-glow-primary" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-2 h-2 bg-primary border-0 shadow-glow-primary" 
      />
      
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-base filter drop-shadow-[0_0_4px_currentColor]">{fileIcon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-futuristic font-medium text-foreground truncate tracking-wide">
              {file.path.split('/').pop()}
            </div>
            <div className="text-[10px] text-muted-foreground truncate font-mono opacity-70">
              {file.path}
            </div>
          </div>
          <div className="flex gap-1">
            {file.modified && (
              <Edit className="w-3 h-3 text-accent animate-pulse-glow" />
            )}
            {hasErrors && (
              <AlertTriangle className="w-3 h-3 text-destructive animate-pulse-glow" />
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-muted-foreground font-mono">{file.lines}L</span>
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider
            border border-current shadow-[0_0_4px_currentColor] ${
            file.type === 'component' ? 'text-node-react bg-node-react/10' :
            file.type === 'hook' ? 'text-node-function bg-node-function/10' :
            file.type === 'service' ? 'text-node-class bg-node-class/10' :
            'text-muted-foreground bg-muted/10'
          }`}>
            {file.type}
          </span>
        </div>
        
        {(file.functions.length > 0 || hasErrors) && (
          <div className="flex justify-between text-[9px] font-mono">
            {file.functions.length > 0 && (
              <span className="text-node-function">
                {file.functions.length} fn
              </span>
            )}
            {hasErrors && (
              <span className="text-destructive animate-pulse">
                {file.errors.length} err
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(FileNode);