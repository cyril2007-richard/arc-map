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
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold">TinkerFlow</h1>
            <Badge variant="secondary">v1.0</Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{totalFiles}</span>
              files
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{totalFunctions}</span>
              functions
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{totalClasses}</span>
              classes
            </div>
            {modifiedFiles > 0 && (
              <Badge variant="destructive">
                {modifiedFiles} modified
              </Badge>
            )}
            {filesWithErrors > 0 && (
              <Badge variant="outline" className="border-destructive text-destructive">
                {filesWithErrors} with errors
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSearch}
            className="gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleFilter}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}