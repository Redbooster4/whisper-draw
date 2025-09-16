import { useRef, useEffect, useState } from "react";
import { fabric as FabricCanvas } from "fabric";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";
import { toast } from "sonner";

export const DrawingCanvas = ({ activeTool, activeColor, brushSize }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      backgroundColor: "#ffffff",
    });

    // Enable free drawing by default
    canvas.isDrawingMode = activeTool === "draw";
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = brushSize;

    const resize = () => {
      const container = containerRef.current;
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

  // Update canvas settings when tools change
  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === "draw";
    
    if (activeTool === "select") {
      fabricCanvas.isDrawingMode = false;
    }
  }, [fabricCanvas, activeTool]);

  // Update brush color
  useEffect(() => {
    if (!fabricCanvas) return;
    fabricCanvas.freeDrawingBrush.color = activeColor;
  }, [fabricCanvas, activeColor]);

  // Update brush size
  useEffect(() => {
    if (!fabricCanvas) return;
    fabricCanvas.freeDrawingBrush.width = brushSize;
  }, [fabricCanvas, brushSize]);

  // Add shape drawing functionality
  useEffect(() => {
    if (!fabricCanvas) return;

    let isDrawing = false;
    let startX, startY;
    let activeShape = null;

    const handleMouseDown = (e) => {
      if (activeTool !== "rectangle" && activeTool !== "circle") return;
      
      isDrawing = true;
      const pointer = fabricCanvas.getPointer(e.e);
      startX = pointer.x;
      startY = pointer.y;

      if (activeTool === "rectangle") {
        activeShape = new FabricCanvas.Rect({
          left: startX,
          top: startY,
          width: 0,
          height: 0,
          fill: "transparent",
          stroke: activeColor,
          strokeWidth: brushSize,
        });
      } else if (activeTool === "circle") {
        activeShape = new FabricCanvas.Circle({
          left: startX,
          top: startY,
          radius: 0,
          fill: "transparent",
          stroke: activeColor,
          strokeWidth: brushSize,
        });
      }

      if (activeShape) {
        fabricCanvas.add(activeShape);
      }
    };

    const handleMouseMove = (e) => {
      if (!isDrawing || !activeShape) return;

      const pointer = fabricCanvas.getPointer(e.e);
      
      if (activeTool === "rectangle") {
        const width = Math.abs(pointer.x - startX);
        const height = Math.abs(pointer.y - startY);
        activeShape.set({
          width,
          height,
          left: Math.min(startX, pointer.x),
          top: Math.min(startY, pointer.y),
        });
      } else if (activeTool === "circle") {
        const radius = Math.sqrt(
          Math.pow(pointer.x - startX, 2) + Math.pow(pointer.y - startY, 2)
        ) / 2;
        activeShape.set({ radius });
      }

      fabricCanvas.renderAll();
    };

    const handleMouseUp = () => {
      isDrawing = false;
      activeShape = null;
    };

    fabricCanvas.on("mouse:down", handleMouseDown);
    fabricCanvas.on("mouse:move", handleMouseMove);
    fabricCanvas.on("mouse:up", handleMouseUp);

    return () => {
      fabricCanvas.off("mouse:down", handleMouseDown);
      fabricCanvas.off("mouse:move", handleMouseMove);
      fabricCanvas.off("mouse:up", handleMouseUp);
    };
  }, [fabricCanvas, activeTool, activeColor, brushSize]);

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
      format: "png",
      quality: 1,
    });
    
    const link = document.createElement("a");
    link.download = "drawing.png";
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
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </Button>
        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      <div ref={containerRef} className="canvas-container bg-canvas w-full h-full">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
};