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
      <div className="h-full bg-card/30 backdrop-blur-sm border-l border-border/50">
        <div className="p-4 border-b border-border/30">
          <h3 className="text-sm font-futuristic font-bold text-foreground tracking-wider uppercase">
            NODE SCANNER
          </h3>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Select node to analyze
          </p>
        </div>
        <div className="p-4 flex items-center justify-center h-32">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center mb-2 mx-auto">
              <FileText className="w-5 h-5 text-primary/50" />
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              AWAITING SELECTION
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-card/30 backdrop-blur-sm border-l border-border/50">
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded border border-primary/50 bg-primary/10 flex items-center justify-center">
            <FileText className="w-3 h-3 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-futuristic font-bold text-foreground tracking-wider uppercase truncate">
              {file.path.split('/').pop()}
            </h3>
            <p className="text-[10px] text-muted-foreground font-mono truncate">
              {file.path}
            </p>
          </div>
          <div className="flex gap-1">
            {file.modified && <Edit className="w-3 h-3 text-accent animate-pulse-glow" />}
            {file.errors.length > 0 && <AlertTriangle className="w-3 h-3 text-destructive animate-pulse" />}
          </div>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="p-4 space-y-4">
          {/* Status Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background/20 rounded border border-border/30 p-2">
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">Language</div>
              <div className="text-xs font-futuristic font-bold text-foreground">{file.language.toUpperCase()}</div>
            </div>
            <div className="bg-background/20 rounded border border-border/30 p-2">
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">Lines</div>
              <div className="text-xs font-mono font-bold text-primary">{file.lines}</div>
            </div>
            <div className="bg-background/20 rounded border border-border/30 p-2">
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">Type</div>
              <div className="text-xs font-futuristic font-bold text-secondary">{file.type.toUpperCase()}</div>
            </div>
            <div className="bg-background/20 rounded border border-border/30 p-2">
              <div className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">Status</div>
              <div className={`text-xs font-mono font-bold ${file.modified ? 'text-accent' : 'text-primary'}`}>
                {file.modified ? 'MODIFIED' : 'CLEAN'}
              </div>
            </div>
          </div>

          {/* Functions */}
          {file.functions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Braces className="w-3 h-3 text-node-function" />
                <h4 className="text-xs font-futuristic font-bold text-node-function uppercase tracking-wider">
                  Functions ({file.functions.length})
                </h4>
              </div>
              <div className="space-y-1">
                {file.functions.map((func, index) => (
                  <div key={index} className="text-xs font-mono bg-node-function/5 border border-node-function/20 
                    rounded px-2 py-1 text-node-function">
                    {func}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Classes */}
          {file.classes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-node-class" />
                <h4 className="text-xs font-futuristic font-bold text-node-class uppercase tracking-wider">
                  Classes ({file.classes.length})
                </h4>
              </div>
              <div className="space-y-1">
                {file.classes.map((cls, index) => (
                  <div key={index} className="text-xs font-mono bg-node-class/5 border border-node-class/20 
                    rounded px-2 py-1 text-node-class">
                    {cls}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Imports */}
          {file.imports.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Import className="w-3 h-3 text-node-import" />
                <h4 className="text-xs font-futuristic font-bold text-node-import uppercase tracking-wider">
                  Imports ({file.imports.length})
                </h4>
              </div>
              <div className="space-y-1">
                {file.imports.map((imp, index) => (
                  <div key={index} className="text-[10px] font-mono bg-node-import/5 border border-node-import/20 
                    rounded px-2 py-1 text-node-import">
                    {imp}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exports */}
          {file.exports.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-futuristic font-bold text-muted-foreground uppercase tracking-wider">
                Exports ({file.exports.length})
              </h4>
              <div className="space-y-1">
                {file.exports.map((exp, index) => (
                  <div key={index} className="text-xs font-mono bg-muted/5 border border-muted/20 
                    rounded px-2 py-1 text-muted-foreground">
                    {exp}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Errors */}
          {file.errors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-destructive animate-pulse" />
                <h4 className="text-xs font-futuristic font-bold text-destructive uppercase tracking-wider">
                  Errors ({file.errors.length})
                </h4>
              </div>
              <div className="space-y-2">
                {file.errors.map((error, index) => (
                  <div key={index} className="bg-destructive/5 border border-destructive/20 rounded p-2 
                    shadow-[0_0_4px_hsl(var(--destructive))]">
                    <div className="text-[10px] font-mono text-destructive font-bold">
                      LINE {error.line}
                    </div>
                    <div className="text-xs text-destructive/80 font-mono mt-1">
                      {error.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}