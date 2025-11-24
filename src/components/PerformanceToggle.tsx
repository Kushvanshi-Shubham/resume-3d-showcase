import { Zap, ZapOff } from 'lucide-react';
import { usePerformanceMode } from '@/contexts/PerformanceContext';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

export default function PerformanceToggle() {
  const { isPerformanceMode, togglePerformanceMode } = usePerformanceMode();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePerformanceMode}
            className="relative"
          >
            {isPerformanceMode ? (
              <ZapOff className="h-5 w-5" />
            ) : (
              <Zap className="h-5 w-5" />
            )}
            {isPerformanceMode && (
              <Badge 
                variant="secondary" 
                className="absolute -top-1 -right-1 h-2 w-2 p-0"
              />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Performance Mode: {isPerformanceMode ? 'ON' : 'OFF'}</p>
          <p className="text-xs text-muted-foreground">
            Reduces effects for better performance
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
