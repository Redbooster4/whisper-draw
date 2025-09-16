import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface DrawingCanvasProps {
  activeTool: "select" | "draw" | "rectangle" | "circle";
  activeColor: string;
  brushSize: number;
}

export const DrawingCanvas = ({ activeTool, activeColor, brushSize }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      backgroundColor: "#ffffff",
    });

    // Initialize the freeDrawingBrush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = brushSize;

    const resize = () => {
      const container = containerRef.current!;
      const width = container.clientWidth || 1000;
      const height = container.clientHeight || 600;
      canvas.setWidth(width);
      canvas.setHeight(height);
      canvas.renderAll();
    };

    // Initial size
    resize();

    // Observe container size changes
    const ro = new ResizeObserver(() => resize());
    ro.observe(containerRef.current);

    setFabricCanvas(canvas);
    toast("Canvas ready! Start creating your masterpiece!");

    return () => {
      ro.disconnect();
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "draw" && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [activeTool, activeColor, brushSize, fabricCanvas]);

  const addShape = (shapeType: "rectangle" | "circle") => {
    if (!fabricCanvas) return;

    if (shapeType === "rectangle") {
      const rect = new Rect({
        left: Math.random() * 200 + 100,
        top: Math.random() * 200 + 100,
        fill: activeColor,
        width: 100,
        height: 100,
        stroke: activeColor,
        strokeWidth: 2,
      });
      fabricCanvas.add(rect);
    } else if (shapeType === "circle") {
      const circle = new Circle({
        left: Math.random() * 200 + 100,
        top: Math.random() * 200 + 100,
        fill: "transparent",
        radius: 50,
        stroke: activeColor,
        strokeWidth: 3,
      });
      fabricCanvas.add(circle);
    }
    fabricCanvas.renderAll();
  };

  useEffect(() => {
    if (activeTool === "rectangle") {
      addShape("rectangle");
    } else if (activeTool === "circle") {
      addShape("circle");
    }
  }, [activeTool]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast("Canvas cleared!");
  };

  const handleExport = () => {
    if (!fabricCanvas) return;
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1,
    });
    
    const link = document.createElement('a');
    link.download = 'my_drawing.png';
    link.href = dataURL;
    link.click();
    toast("Drawing exported successfully!");
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex gap-2">
        <Button
          onClick={handleClear}
          variant="outline"
          size="sm"
          className="border-tool-border hover:bg-tool-hover"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="border-tool-border hover:bg-tool-hover"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
      <div ref={containerRef} className="canvas-container bg-canvas w-full h-full">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
};