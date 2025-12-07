import { useRef, useState, useEffect } from "react";
import { X, Eraser, Palette, Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const COLORS = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export function Whiteboard({ onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    setLastPos(getPos(e));
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const pos = getPos(e);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    setLastPos(pos);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full sm:w-72 md:w-80 flex flex-col h-full bg-card border-l border-border animate-slide-in-right absolute sm:relative right-0 top-0 z-20">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm sm:text-base">
          Whiteboard
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 border-b border-border bg-muted/30 flex-wrap">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors"
              style={{ color }}
            >
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2">
            <div className="grid grid-cols-5 gap-1">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={cn(
                    "w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-transform hover:scale-110",
                    color === c ? "border-primary" : "border-transparent"
                  )}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => setLineWidth(Math.max(1, lineWidth - 1))}
            className="p-1 sm:p-1.5 hover:bg-muted rounded transition-colors"
          >
            <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <span className="text-xs sm:text-sm font-medium w-5 sm:w-6 text-center">
            {lineWidth}
          </span>
          <button
            onClick={() => setLineWidth(Math.min(20, lineWidth + 1))}
            className="p-1 sm:p-1.5 hover:bg-muted rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="w-px h-5 sm:h-6 bg-border mx-0.5 sm:mx-1" />

        <button
          onClick={() => setColor("#ffffff")}
          className={cn(
            "p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors",
            color === "#ffffff" && "bg-muted"
          )}
        >
          <Eraser className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={clearCanvas}
          className="p-1.5 sm:p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="flex-1 p-1.5 sm:p-2">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded-lg cursor-crosshair touch-none"
          style={{ backgroundColor: "#ffffff" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
}
