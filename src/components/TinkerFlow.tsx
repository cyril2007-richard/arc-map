import { useState } from 'react';
import { CodebaseFile } from '@/data/sampleCodebase';
import TinkerFlowCanvas from './tinkerflow/TinkerFlowCanvas';
import TinkerFlowToolbar from './tinkerflow/TinkerFlowToolbar';
import FileDetails from './tinkerflow/FileDetails';
import { toast } from 'sonner';

export default function TinkerFlow() {
  const [selectedFile, setSelectedFile] = useState<CodebaseFile | null>(null);

  const handleFileSelect = (file: CodebaseFile) => {
    setSelectedFile(file);
    toast(`Selected ${file.path.split('/').pop()}`);
  };

  const handleRefresh = () => {
    setSelectedFile(null);
    toast("Refreshing codebase map...");
    // In a real implementation, this would trigger a re-scan
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <TinkerFlowToolbar onRefresh={handleRefresh} />
      
      <div className="flex-1 flex min-h-0">
        {/* Main Canvas */}
        <div className="flex-1 relative">
          <TinkerFlowCanvas onFileSelect={handleFileSelect} />
        </div>
        
        {/* Side Panel */}
        <div className="w-80">
          <FileDetails file={selectedFile} />
        </div>
      </div>
    </div>
  );
}