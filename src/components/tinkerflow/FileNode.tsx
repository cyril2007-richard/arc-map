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
      className={`relative min-w-[180px] rounded-lg border-2 ${nodeColor} 
        shadow-lg hover:shadow-glow-primary transition-all duration-200 
        cursor-pointer group`}
      onClick={() => onFileClick(file)}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-primary border-2 border-background" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-primary border-2 border-background" 
      />
      
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{fileIcon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground truncate">
              {file.path.split('/').pop()}
            </div>
            <div className="text-xs text-muted-foreground truncate">
              {file.path}
            </div>
          </div>
          {file.modified && (
            <Edit className="w-3 h-3 text-accent" />
          )}
          {hasErrors && (
            <AlertTriangle className="w-3 h-3 text-destructive" />
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{file.lines} lines</span>
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
              file.type === 'component' ? 'bg-node-react/20 text-node-react' :
              file.type === 'hook' ? 'bg-node-function/20 text-node-function' :
              file.type === 'service' ? 'bg-node-class/20 text-node-class' :
              'bg-muted text-muted-foreground'
            }`}>
              {file.type}
            </span>
          </div>
          
          {file.functions.length > 0 && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">{file.functions.length}</span> functions
            </div>
          )}
          
          {hasErrors && (
            <div className="text-xs text-destructive">
              {file.errors.length} error{file.errors.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(FileNode);