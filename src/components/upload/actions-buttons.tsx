import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import { cn } from "@/utils/tailwind";

type ActionButtonsProps = {
  isConverting: boolean;
  hasLatex: boolean;
  onConvert: () => void;
  onCopy: () => void;
  onReset: () => void;
};

export function ActionButtons({
  isConverting,
  hasLatex,
  onConvert,
  onCopy,
  onReset,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button
        onClick={onConvert}
        disabled={isConverting}
        className={cn("flex-1", !hasLatex && "bg-primary hover:bg-primary/90")}
      >
        {isConverting ? (
          <React.Fragment>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Converting...
          </React.Fragment>
        ) : hasLatex ? (
          "Reconvert"
        ) : (
          "Convert to LaTeX"
        )}
      </Button>

      {hasLatex && (
        <Button onClick={onCopy} variant="outline" className="flex-1">
          <Copy className="mr-2 h-4 w-4" /> Copy LaTeX
        </Button>
      )}
      <Button onClick={onReset} variant="outline" className="flex-1">
        Reset
      </Button>
    </div>
  );
}
