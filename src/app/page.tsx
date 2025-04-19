import React from "react";
import { MathHeader } from "@/components/math-header";
import { UploadForm } from "@/components/upload-form";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8 max-w-4xl mx-auto">
      <MathHeader />
      <div className="w-full mt-8">
        <UploadForm />
      </div>
    </main>
  );
}
