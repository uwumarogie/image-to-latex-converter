import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

type PreviewTabs = {
  previewUrl: string | null;
  latex: string;
  activeTab: "preview" | "latex";
  onTabChange(value: string): void;
};

export function PreviewTabs({
  previewUrl,
  latex,
  activeTab,
  onTabChange,
}: PreviewTabs) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="preview">Image Preview</TabsTrigger>
        <TabsTrigger value="latex" disabled={!latex}>
          LaTeX Result
        </TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="mt-4">
        <div className="relative h-64 w-full overflow-hidden rounded-lg border bg-background">
          <Image
            src={previewUrl || "/placeholder.svg"}
            alt="Uploaded equation"
            fill
            className="object-contain p-2"
          />
        </div>
      </TabsContent>

      <TabsContent value="latex" className="mt-4">
        <div className="rounded-lg border bg-muted p-4 font-mono text-sm overflow-x-auto">
          {latex}
        </div>
        <h4 className="text-sm font-medium mb-2 mt-4">Rendered Equation:</h4>
        <div className="rounded-lg border bg-card p-4 flex items-center justify-center min-h-[100px]">
          <div dangerouslySetInnerHTML={{ __html: `$$${latex}$$` }} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
