"use client";

import React, { useRef } from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PreviewTabs } from "@/components/upload/preview-tabs";
import { sendFileToServer } from "@/utils/send-form-data";
import { UploadArea } from "@/components/upload/upload-area";
import { ActionButtons } from "@/components/upload/actions-buttons";
import { Tips } from "@/components/upload/tips";

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [latex, setLatex] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "latex">("preview");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
        setLatex("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConvert = async () => {
    if (!previewUrl) return;
    setIsConverting(true);
    try {
      if (file === null) {
        throw new Error("No file selected");
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await sendFileToServer(formData, "/api/convert");
      if (response.text !== undefined) {
        setLatex(response.text);
        setActiveTab("latex");
      }
    } catch (error) {
      console.error("Conversion failed:", error);
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = () => navigator.clipboard.writeText(latex);
  const resetForm = () => {
    setPreviewUrl(null);
    setLatex("");
    setActiveTab("preview");
  };

  if (!file) {
    return (
      <React.Fragment>
        <Card className="border-dashed">
          <CardContent className="p-6">
            <UploadArea
              onClick={() => fileInputRef.current?.click()}
              onChange={handleImageUpload}
              inputRef={fileInputRef}
            />
          </CardContent>
        </Card>
        <Tips />
      </React.Fragment>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-dashed">
        <CardContent className="p-6">
          <PreviewTabs
            previewUrl={previewUrl}
            latex={latex}
            activeTab={activeTab}
            onTabChange={(value) => setActiveTab(value as "preview" | "latex")}
          />
          <ActionButtons
            isConverting={isConverting}
            hasLatex={!!latex}
            onConvert={handleConvert}
            onCopy={copyToClipboard}
            onReset={resetForm}
          />
        </CardContent>
      </Card>
      <Tips />
    </div>
  );
}
