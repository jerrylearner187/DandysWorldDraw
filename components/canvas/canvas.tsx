import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Letter } from "./types";
import { hornPositions } from "./horn";
import { drawLeftHorn, drawRightHorn } from "./horn";

// Forwarding ref to allow parent access
const Canvas = forwardRef<HTMLCanvasElement, { text: string, w: string, h: string, 
  foreColor: string, bgColor: string, size: string }>(
  ({ text, w, h, foreColor, bgColor, size }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const width = w ? parseInt(w) : 1000;
    const height = h ? parseInt(h) : 1000;

    // Expose the internal canvasRef to the parent through the forwarded ref
    useImperativeHandle(ref, () => canvasRef.current!);

    const drawCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // console.log('w:'+w+' h:'+h+' size:'+size+' fore:'+foreColor+' bgColor:'+bgColor)
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Set canvas background
      ctx.fillStyle = bgColor ?? "#00843d";
      ctx.fillRect(0, 0, width, height);

      // Ensure font is applied correctly (using the Poleno font)
      const fontSize = size ? parseInt(size) : 103;
      const ratio = fontSize / 103;
      ctx.font = "600 " + fontSize + "px 'Poleno', sans-serif";
      ctx.fillStyle = foreColor ?? "black";
      ctx.textBaseline = "middle";

      // Calculate text position and draw text
      const textWidth = ctx.measureText(text).width;
      const startX = (width - textWidth) / 2;
      const startY = height / 2;

      ctx.fillText(text, startX, startY);

      // Draw left horn for the first letter
      if (text.length > 0) {
        const firstLetter = text[0].toLowerCase() as Letter;
        const leftHornPos = hornPositions.left[firstLetter];
        if (leftHornPos) {
          drawLeftHorn(ctx, startX + leftHornPos.x*ratio, startY + leftHornPos.y - (fontSize - 103)/2, foreColor, ratio);
        }
      }

      // Draw right horn for the last letter
      if (text.length > 1) {
        const lastLetter = text[text.length - 1].toLowerCase() as Letter;
        const rightHornPos = hornPositions.right[lastLetter];
        if (rightHornPos) {
          const lastLetterWidth = ctx.measureText(text[text.length - 1]).width;
          drawRightHorn(
            ctx,
            startX + textWidth - lastLetterWidth + rightHornPos.x*ratio,
            startY + rightHornPos.y - (fontSize - 103)/2,
            rightHornPos.type,
            foreColor,
            ratio
          );
        }
      }
    };

    useEffect(() => {
      // Initial drawing of the canvas
      drawCanvas();

      // Trigger re-drawing after a short delay to ensure proper font application
      const timer = setTimeout(() => {
        drawCanvas();
      }, 100); // 100ms delay to reapply the font

      // Cleanup the timer
      return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, w, h, size, foreColor, bgColor]);

    return (
      <div className="w-full h-auto flex justify-center">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
          }}
          className="border-2 border-black"
        />
      </div>
    );
  }
);
Canvas.displayName = 'Canvas';
export {Canvas};