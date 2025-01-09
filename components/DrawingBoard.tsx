'use client'

import { useEffect, useRef, useState } from 'react'
import { msg, t } from '@lingui/macro'
import { i18n } from '@lingui/core'


export default function DrawingBoard() {
  const [currentColor, setCurrentColor] = useState('#000000')
  const [currentShape, setCurrentShape] = useState('freestyle')
  const [isDrawing, setIsDrawing] = useState(false)
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tempCanvasRef = useRef<HTMLCanvasElement>(null)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef({ x: 0, y: 0 })

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000', '#FFC0CB'
  ]

  const shapes = [
    { id: 'circle', icon: '⭕', label: msg`Circle` },
    { id: 'square', icon: '⬜', label: msg`Square` },
    { id: 'triangle', icon: '△', label: msg`Triangle` },
    { id: 'ellipse', icon: '⬭', label: msg`Ellipse` },
  ]

  const bodyParts = [
    { id: 'hand', icon: '✋', label: msg`Hand` },
    { id: 'foot', icon: '👣', label: msg`Foot` },
    { id: 'eye', icon: '👁', label: msg`Eye` },
    { id: 'nose', icon: '👃', label: msg`Nose` },
  ]

  const nature = [
    { id: 'leaf', icon: '🍃', label: msg`Leaf` },
    { id: 'flower', icon: '🌸', label: msg`Flower` },
    { id: 'petal', icon: '💮', label: msg`Petal` },
    { id: 'freestyle', icon: '', label: msg`Freestyle` },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    const tempCanvas = tempCanvasRef.current
    if (!canvas || !tempCanvas) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

// Add touch event handlers
const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
  e.preventDefault(); // Prevent scrolling while drawing
  setIsDrawing(true);
  const touch = e.touches[0];
  const rect = e.currentTarget.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  lastPosRef.current = { x, y };
  startPosRef.current = { x, y };
};

const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
  e.preventDefault();
  if (!isDrawing || !canvasRef.current) return;
  
  const touch = e.touches[0];
  const rect = e.currentTarget.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;
  
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const brushSize = Number((document.getElementById('brushSize') as HTMLInputElement)?.value || 5);

  if (currentShape === 'freestyle') {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (lastPosRef.current.x === x && lastPosRef.current.y === y) {
      ctx.beginPath();
      ctx.arc(x, y, brushSize/2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    
    lastPosRef.current = { x, y };
  } else {
    drawShape(x, y, brushSize);
  }
};

const handleTouchEnd = () => {
  setIsDrawing(false);
};

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const brushSize = Number((document.getElementById('brushSize') as HTMLInputElement)?.value || 5)

    if (currentShape === 'freestyle') {
        ctx.strokeStyle = currentColor
        ctx.lineWidth = brushSize
        ctx.lineCap = 'round'
        // 如果是第一个点，直接画一个点
        if (lastPosRef.current.x === e.nativeEvent.offsetX && 
            lastPosRef.current.y === e.nativeEvent.offsetY) {
            ctx.beginPath()
            ctx.arc(e.nativeEvent.offsetX, e.nativeEvent.offsetY, brushSize/2, 0, Math.PI * 2)
            ctx.fill()
        } else {
            ctx.beginPath()
            ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            ctx.stroke()
        }
      
        lastPosRef.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
    } else {
      // Shape drawing logic here
      // Similar to your original implementation
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const size = Number((document.getElementById('brushSize') as HTMLInputElement)?.value || 5);
  
      drawShape(x, y, size);
    }
  }

  function drawShape(x: number, y: number, size: number): void {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = currentColor;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = Math.max(1, size / 10);

    switch(currentShape) {
        case 'circle':
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 'square':
            ctx.strokeRect(x - size, y - size, size * 2, size * 2);
            break;
        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(x, y - size);
            ctx.lineTo(x + size, y + size);
            ctx.lineTo(x - size, y + size);
            ctx.closePath();
            ctx.stroke();
            break;
        case 'ellipse':
            ctx.beginPath();
            ctx.ellipse(x, y, size * 1.5, size, 0, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 'hand':
            drawHand(ctx, x, y, size);
            break;
        case 'foot':
            drawFoot(ctx, x, y, size);
            break;
        case 'eye':
            drawEye(ctx, x, y, size);
            break;
        case 'nose':
            drawNose(ctx, x, y, size);
            break;
        case 'leaf':
            drawLeaf(ctx, x, y, size);
            break;
        case 'flower':
            drawFlower(ctx, x, y, size);
            break;
        case 'petal':
            drawPetal(ctx, x, y, size);
            break;
        case 'fan':
            drawFan(ctx, x, y, size);
            break;
        case 'moon':
            drawMoon(ctx, x, y, size);
            break;
        case 'head':
            drawHead(ctx, x, y, size);
            break;
        case 'hair':
            drawHair(ctx, x, y, size);
            break;
        case 'mouth':
            drawMouth(ctx, x, y, size);
            break;
        case 'ear':
            drawEar(ctx, x, y, size);
            break;
    }
}

function drawHand(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.ellipse(x, y, size * 1.2, size * 0.9, 0, 0, Math.PI * 2);
    for(let i = 0; i < 5; i++) {
        const angle = (i - 2) * 0.3;
        const fingerLength = size * 1.2;
        const fingerStart = size * 0.7;
        ctx.moveTo(
            x + Math.cos(angle) * fingerStart, 
            y + Math.sin(angle) * fingerStart
        );
        ctx.lineTo(
            x + Math.cos(angle) * (fingerStart + fingerLength),
            y + Math.sin(angle) * (fingerStart + fingerLength)
        );
    }
    ctx.stroke();
}

function drawFoot(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.moveTo(x - size * 0.5, y);
    ctx.quadraticCurveTo(
        x, y + size * 0.8,
        x + size * 1.2, y
    );
    ctx.quadraticCurveTo(
        x - size * 0.2, y - size * 0.2,
        x - size * 0.5, y
    );
    ctx.stroke();
    
    for(let i = 0; i < 5; i++) {
        ctx.beginPath();
        const toeX = x + size * 0.8 - (i * size * 0.25);
        const toeY = y - size * 0.1 + (i * size * 0.08);
        ctx.moveTo(toeX, toeY);
        ctx.quadraticCurveTo(
            toeX + size * 0.15, toeY - size * 0.1,
            toeX + size * 0.3, toeY
        );
    }
    ctx.stroke();
}

function drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.moveTo(x - size * 0.8, y);
    ctx.quadraticCurveTo(
        x, y - size * 0.5,
        x + size * 0.8, y
    );
    ctx.quadraticCurveTo(
        x, y + size * 0.3,
        x - size * 0.8, y
    );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    for(let i = 0; i < 5; i++) {
        const angle = -Math.PI / 3 + (i * Math.PI / 12);
        const startX = x + Math.cos(angle) * size * 0.8;
        const startY = y + Math.sin(angle) * size * 0.3;
        ctx.beginPath();
        ctx.moveTo(startX, startY - size * 0.1);
        ctx.lineTo(startX + Math.cos(angle) * size * 0.2, 
                  startY + Math.sin(angle) * size * 0.2);
        ctx.stroke();
    }
}

function drawNose(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    const s = size * 1.2;
    ctx.moveTo(x - s * 0.3, y - s * 0.5);
    ctx.quadraticCurveTo(x, y - s * 0.8, x + s * 0.3, y - s * 0.5);
    ctx.quadraticCurveTo(x + s * 0.5, y, x, y + s * 0.5);
    ctx.quadraticCurveTo(x - s * 0.5, y, x - s * 0.3, y - s * 0.5);
    ctx.stroke();
}

function drawLeaf(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    const s = size * 1.5;
    ctx.moveTo(x, y - s);
    ctx.bezierCurveTo(
        x + s, y - s * 0.5,
        x + s, y + s * 0.5,
        x, y + s
    );
    ctx.bezierCurveTo(
        x - s, y + s * 0.5,
        x - s, y - s * 0.5,
        x, y - s
    );
    ctx.moveTo(x, y - s);
    ctx.lineTo(x, y + s);
    ctx.stroke();
}

function drawFlower(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    const s = size * 1.2;
    for(let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.ellipse(
            x + Math.cos(angle) * s,
            y + Math.sin(angle) * s,
            s * 0.7,
            s * 0.3,
            angle,
            0,
            Math.PI * 2
        );
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(x, y, s * 0.4, 0, Math.PI * 2);
    ctx.fill();
}

function drawPetal(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    const s = size * 1.5;
    ctx.moveTo(x, y - s);
    ctx.bezierCurveTo(
        x + s, y - s * 0.5,
        x + s, y + s * 0.5,
        x, y + s
    );
    ctx.bezierCurveTo(
        x - s, y + s * 0.5,
        x - s, y - s * 0.5,
        x, y - s
    );
    ctx.stroke();
}

function drawFan(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, size, -Math.PI / 6, Math.PI / 3, false);
    ctx.lineTo(x, y);
    ctx.stroke();
    for(let i = 0; i <= 3; i++) {
        const angle = -Math.PI / 6 + (i * Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.stroke();
    }
}

function drawMoon(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, false);
    ctx.arc(x + size * 0.5, y, size * 0.8, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawHead(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.8, size, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - size * 0.4, y + size * 0.3);
    ctx.quadraticCurveTo(x, y + size * 0.8, x + size * 0.4, y + size * 0.3);
    ctx.stroke();
}

function drawHair(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    for(let i = 0; i < 8; i++) {
        ctx.beginPath();
        const startX = x - size * 0.8 + (i * size * 0.2);
        ctx.moveTo(startX, y - size * 0.5);
        ctx.bezierCurveTo(
            startX - size * 0.2, y,
            startX + size * 0.2, y + size * 0.5,
            startX, y + size
        );
        ctx.stroke();
    }
}

function drawMouth(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.moveTo(x - size * 0.4, y);
    ctx.quadraticCurveTo(x, y - size * 0.2, x + size * 0.4, y);
    ctx.moveTo(x - size * 0.4, y);
    ctx.quadraticCurveTo(x, y + size * 0.3, x + size * 0.4, y);
    ctx.stroke();
}

function drawEar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.moveTo(x, y - size * 0.5);
    ctx.quadraticCurveTo(
        x + size * 0.8, y - size * 0.3,
        x + size * 0.5, y + size * 0.5
    );
    ctx.quadraticCurveTo(
        x + size * 0.2, y + size * 0.8,
        x, y + size * 0.5
    );
    ctx.moveTo(x + size * 0.2, y - size * 0.2);
    ctx.quadraticCurveTo(
        x + size * 0.5, y,
        x + size * 0.3, y + size * 0.3
    );
    ctx.stroke();
}

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const downloadCanvas = (format: 'png' | 'jpeg' = 'png', quality: number = 1.0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const link = document.createElement('a');
    
    // 设置图片格式和质量
    const image = canvas.toDataURL(`image/${format}`, quality);
    
    // 生成文件名
    const fileName = `drawing-${new Date().toISOString().slice(0,10)}.${format}`;
    
    link.download = fileName;
    link.href = image;
    link.click();
  };

  return (
    <section className="relative px-1 md:px-8 py-10 w-full">
      <div className="bg-gray/70 text-gray-500 w-full max-w-7xl mx-auto h-full flex flex-col items-center">
        {/* Toolbar */}
        <div className="w-full bg-gray-100 grid grid-cols-1 md:grid-cols-4 md:gap-1 mb-1">
          <div className='col-span-1 mb-1'>
          <section>
            <h3 className="mb-2 font-semibold">Tools</h3>
            <div>
              <label className="block text-sm">Brush Size:</label>
              <input
                type="range"
                id="brushSize"
                min="1"
                max="50"
                defaultValue="5"
                className="w-full"
              />
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">Colors</h3>
            <div className="grid grid-cols-6 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className="h-8 w-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </section>
          </div>

          <div className='col-span-2 mb-1'>
          <section>
            <h3 className="mb-2 font-semibold">Shapes</h3>
            <div className="grid grid-cols-4 gap-1">
              {shapes.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setCurrentShape(id)}
                  className={`rounded bg-white px-3 py-2 text-left text-sm hover:bg-gray-50 ${currentShape === id ? 'border-2 border-red-500' : 'border border-gray-200'}`}
                >
                  {icon} {i18n._(label)}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">Body Parts</h3>
            <div className="grid grid-cols-4 gap-1">
              {bodyParts.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setCurrentShape(id)}
                  className={`rounded bg-white px-3 py-2 text-left text-sm hover:bg-gray-50 ${currentShape === id ? 'border-2 border-red-500' : 'border border-gray-200'}`}
                >
                  {icon} {i18n._(label)}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-2 font-semibold">Nature</h3>
            <div className="grid grid-cols-4 gap-1">
              {nature.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setCurrentShape(id)}
                  className={`rounded bg-white px-3 py-2 text-left text-sm hover:bg-gray-50 ${currentShape === id ? 'border-2 border-red-500' : 'border border-gray-200'}`}
                >
                  {icon} {i18n._(label)}
                </button>
              ))}
            </div>
          </section>
          </div>

          <div className='col-span-1 flex flex-row md:flex-col items-center justify-center gap-2'>
            <button
                onClick={clearCanvas}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 md:w-[180px]"
            >
                {t`Clear Canvas`}
            </button>
            <div className="relative">
                <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 md:w-[180px]"
                    onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
                >
                    {t`Download`}
                </button>
                
                {isDownloadMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-0">
                        <button
                        onClick={() => {
                            downloadCanvas('png');
                            setIsDownloadMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                        {t`Download as PNG`}
                        </button>
                        <button
                        onClick={() => {
                            downloadCanvas('jpeg', 0.9);
                            setIsDownloadMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                        {t`Download as JPEG`}
                        </button>
                    </div>
                    </div>
                )}
                </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="w-full h-[600px] touch-none">
          <canvas
            ref={canvasRef}
            className="h-full w-full cursor-crosshair bg-white"
            style={{
              touchAction: 'none', // Add this style
              WebkitTouchCallout: 'none', // Add this style
              WebkitUserSelect: 'none', // Add this style
            }}
            onMouseDown={(e) => {
              setIsDrawing(true)
              lastPosRef.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
              startPosRef.current = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }
            }}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseOut={() => setIsDrawing(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          <canvas
            ref={tempCanvasRef}
            className="hidden"
          />
        </div>
      </div>
    </section>
  )
}