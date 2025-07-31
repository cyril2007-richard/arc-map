import { CodebaseFile } from '@/data/sampleCodebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Braces, Zap, AlertTriangle, Edit, Import } from 'lucide-react';

interface FileDetailsProps {
  file: CodebaseFile | null;
}

export default function FileDetails({ file }: FileDetailsProps) {
  if (!file) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" />
            File Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Click on a file node to view its details
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {file.path.split('/').pop()}
          {file.modified && <Edit className="w-4 h-4 text-accent" />}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{file.path}</p>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[500px]">
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h4 className="font-medium mb-2">Basic Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Language:</span>
                  <Badge variant="secondary" className="ml-2">
                    {file.language}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <Badge variant="outline" className="ml-2">
                    {file.type}
                  </Badge>
                </div>
                <div>
                  <span className="text-muted-foreground">Lines:</span>
                  <span className="ml-2 font-medium">{file.lines}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <Badge 
                    variant={file.modified ? "destructive" : "default"} 
                    className="ml-2"
                  >
                    {file.modified ? "Modified" : "Clean"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Functions */}
            {file.functions.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Braces className="w-4 h-4 text-node-function" />
                  Functions ({file.functions.length})
                </h4>
                <div className="space-y-1">
                  {file.functions.map((func, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-1">
                      {func}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Classes */}
            {file.classes.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-node-class" />
                  Classes ({file.classes.length})
                </h4>
                <div className="space-y-1">
                  {file.classes.map((cls, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-1">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Imports */}
            {file.imports.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Import className="w-4 h-4 text-node-import" />
                  Imports ({file.imports.length})
                </h4>
                <div className="space-y-1">
                  {file.imports.map((imp, index) => (
                    <div key={index} className="text-sm bg-muted rounded p-2">
                      <code className="text-node-import">{imp}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exports */}
            {file.exports.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Exports ({file.exports.length})</h4>
                <div className="space-y-1">
                  {file.exports.map((exp, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-1">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Errors */}
            {file.errors.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  Errors ({file.errors.length})
                </h4>
                <div className="space-y-2">
                  {file.errors.map((error, index) => (
                    <div key={index} className="bg-destructive/10 border border-destructive/20 rounded p-3">
                      <p className="text-sm text-destructive font-medium">
                        Line {error.line}
                      </p>
                      <p className="text-sm text-destructive/80">
                        {error.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}