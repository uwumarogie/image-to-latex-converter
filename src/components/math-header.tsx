import { SquarePiIcon as MathematicalSymbol } from "lucide-react";

export function MathHeader() {
  return (
    <div className="w-full text-center space-y-4 mt-8">
      <div className="flex justify-center">
        <MathematicalSymbol className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold">
        Math Image to LaTeX Converter
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Upload an image containing mathematical equations and convert it to
        LaTeX code. Perfect for students, researchers, and educators working
        with mathematical content.
      </p>
    </div>
  );
}
