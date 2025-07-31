import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Download, 
  Search, 
  Filter,
  LayoutGrid,
  Eye,
  Settings,
  FileText
} from 'lucide-react';
import { sampleCodebase } from '@/data/sampleCodebase';
import { toast } from 'sonner';

interface TinkerFlowToolbarProps {
  onRefresh: () => void;
}

export default function TinkerFlowToolbar({ onRefresh }: TinkerFlowToolbarProps) {
  const totalFiles = sampleCodebase.files.length;
  const modifiedFiles = sampleCodebase.files.filter(f => f.modified).length;
  const filesWithErrors = sampleCodebase.files.filter(f => f.errors.length > 0).length;
  const totalFunctions = sampleCodebase.files.reduce((acc, f) => acc + f.functions.length, 0);
  const totalClasses = sampleCodebase.files.reduce((acc, f) => acc + f.classes.length, 0);

  const handleExport = () => {
    toast("Exporting codebase structure...");
    // In a real implementation, this would export the graph
  };

  const handleSearch = () => {
    toast("Search functionality coming soon!");
  };

  const handleFilter = () => {
    toast("Filter options coming soon!");
  };

  return (
    <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary 
              shadow-glow-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-background" />
            </div>
            <div>
              <h1 className="text-lg font-futuristic font-bold text-foreground tracking-wider">
                TINKERFLOW
              </h1>
              <div className="text-[10px] font-mono text-primary uppercase tracking-widest">
                v2.0.1 • CYBER
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary shadow-glow-primary animate-pulse"></div>
              <span className="text-muted-foreground">FILES</span>
              <span className="text-primary font-bold">{totalFiles}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-node-function shadow-[0_0_4px_currentColor]"></div>
              <span className="text-muted-foreground">FUNC</span>
              <span className="text-node-function font-bold">{totalFunctions}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-node-class shadow-[0_0_4px_currentColor]"></div>
              <span className="text-muted-foreground">CLASS</span>
              <span className="text-node-class font-bold">{totalClasses}</span>
            </div>
            
            {modifiedFiles > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent shadow-glow-accent animate-pulse-glow"></div>
                <span className="text-accent font-bold animate-pulse">{modifiedFiles} MOD</span>
              </div>
            )}
            
            {filesWithErrors > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-destructive shadow-glow-error animate-pulse"></div>
                <span className="text-destructive font-bold">{filesWithErrors} ERR</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSearch}
            className="h-8 px-3 text-xs font-mono uppercase tracking-wider 
              hover:bg-primary/10 hover:text-primary transition-all duration-300
              border border-transparent hover:border-primary/30"
          >
            <Search className="w-3 h-3 mr-1" />
            SCAN
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            className="h-8 px-3 text-xs font-mono uppercase tracking-wider
              hover:bg-secondary/10 hover:text-secondary transition-all duration-300
              border border-transparent hover:border-secondary/30"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            SYNC
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="h-8 px-3 text-xs font-mono uppercase tracking-wider
              hover:bg-accent/10 hover:text-accent transition-all duration-300
              border border-transparent hover:border-accent/30"
          >
            <Download className="w-3 h-3 mr-1" />
            EXPORT
          </Button>
        </div>
      </div>
    </div>
  );
}