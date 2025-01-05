export type HornPosition = typeof hornPositions;

export const hornPositions = {
  left: {
    a: {type: "a", x: -10, y: -80 },
    b: {type: "a", x: -5, y: -80 },
    c: {type: "a", x: 0, y: -80 },
    d: {type: "a", x: -10, y: -80 },
    e: {type: "a", x: 0, y: -80 },
    f: {type: "a", x: -5, y: -80 },
    g: {type: "a", x: 0, y: -80 },
    h: {type: "a", x: -5, y: -80 },
    i: {type: "a", x: -5, y: -80 },
    j: {type: "a", x: 0, y: -80 },
    k: {type: "a", x: -5, y: -80 },
    l: {type: "a", x: -5, y: -80 },
    m: {type: "a", x: -5, y: -80 },
    n: {type: "a", x: -2, y: -80 },
    o: {type: "a", x: 0, y: -80 },
    p: {type: "a", x: -5, y: -80 },
    q: {type: "a", x: 0, y: -80 },
    r: {type: "a", x: -5, y: -80 },
    s: {type: "a", x: 0, y: -80 },
    t: {type: "a", x: -5, y: -80 },
    u: {type: "a", x: -5, y: -80 },
    v: {type: "a", x: -10, y: -80 },
    w: {type: "a", x: -10, y: -80 },
    x: {type: "a", x: -5, y: -80 },
    y: {type: "a", x: -5, y: -80 },
    z: {type: "a", x: -3, y: -80 },
  },
  right: {
    a: { type: "a", x: 25, y: -80 },
    b: { type: "a", x: 35, y: -80 },
    c: { type: "a", x: 35, y: -85 },
    d: { type: "a", x: 38, y: -80 },
    e: { type: "a", x: 30, y: -83 },
    f: { type: "a", x: 30, y: -82 },
    g: { type: "a", x: 40, y: -80 },
    h: { type: "a", x: 47, y: -83 },
    i: { type: "a", x: 4, y: -80 },
    j: { type: "b", x: 12, y: -80 },
    k: { type: "a", x: 35, y: -80 },
    l: { type: "a", x: 5, y: -80 },
    m: { type: "a", x: 52, y: -80 },
    n: { type: "a", x: 43, y: -80 },
    o: { type: "a", x: 40, y: -80 },
    p: { type: "a", x: 30, y: -80 },
    q: { type: "a", x: 45, y: -80 },
    r: { type: "a", x: 30, y: -80 },
    s: { type: "a", x: 30, y: -80 },
    t: { type: "a", x: 30, y: -80 },
    u: { type: "a", x: 40, y: -80 },
    v: { type: "a", x: 35, y: -80 },
    w: { type: "a", x: 62, y: -80 },
    x: { type: "a", x: 32, y: -80 },
    y: { type: "a", x: 34, y: -80 },
    z: { type: "a", x: 20, y: -80 },
  },
};



export const drawRightHorn = (ctx: CanvasRenderingContext2D, x: number, y: number, type: string, color: string, ratio: number) => {
  ctx.beginPath();
  if (type === "a") {
    ctx.moveTo(x + 1*ratio, y + 45*ratio);
    ctx.bezierCurveTo(x + 7.16667*ratio, y + 42.5*ratio, x + 19.5*ratio, y + 30.5*ratio, x + 17.5*ratio, y + 2*ratio);
    ctx.bezierCurveTo(x + 35.9339*ratio, y + 16.5531*ratio, x + 31.0968*ratio, y + 43.0903*ratio, x + 23.5475*ratio, y + 61*ratio);
    ctx.bezierCurveTo(x + 21.7594*ratio, y + 65.2419*ratio, x + 17*ratio, y + 62*ratio, x + 15*ratio, y + 62*ratio);
    ctx.lineTo(x + 11*ratio, y + 61*ratio);
    ctx.lineTo(x + 1*ratio, y + 45*ratio);
  } else {
    ctx.beginPath();  
    ctx.moveTo(x + 11.9998*ratio, y + 62*ratio);      
    ctx.lineTo(x + 7.99981*ratio, y + 61*ratio);      
    ctx.lineTo(x + 1.49981*ratio, y + 50.6*ratio);      
    ctx.bezierCurveTo(x + 1.00001*ratio, y + 47.5*ratio, x + 0.999812*ratio, y + 47*ratio, x + 0.999812*ratio, y + 47*ratio);      
    ctx.bezierCurveTo(x + 0.999613*ratio, y + 46.5*ratio, x + 0.225213*ratio, y + 43.9036*ratio, x + 1.49981*ratio, y + 42.9277*ratio);      
    ctx.bezierCurveTo(x + 7.87744*ratio, y + 38.0446*ratio, x + 16.1667*ratio, y + 25.7529*ratio, x + 14.4998*ratio, y + 2*ratio);      
    ctx.bezierCurveTo(x + 32.9337*ratio, y + 16.5531*ratio, x + 28.0966*ratio, y + 43.0903*ratio, x + 20.5473*ratio, y + 61*ratio);      
    ctx.bezierCurveTo(x + 18.7592*ratio, y + 65.2419*ratio, x + 13.9998*ratio, y + 62*ratio, x + 11.9998*ratio, y + 62*ratio);      
  }
  ctx.closePath();
  ctx.fillStyle = color ?? 'black';
  ctx.fill();
  ctx.strokeStyle = color ?? 'black';
  ctx.stroke();
};

export const drawLeftHorn = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, ratio: number) => {
  ctx.beginPath();
  ctx.moveTo(x + 30.2725*ratio, y + 45*ratio);
  ctx.bezierCurveTo(x + 24.1058*ratio, y + 42.5*ratio, x + 11.7725*ratio, y + 30.5*ratio, x + 13.7725*ratio, y + 2*ratio);
  ctx.bezierCurveTo(x - 9.02754*ratio, y + 20*ratio, x + 3.77246*ratio, y + 56.3333*ratio, x + 13.2725*ratio, y + 72*ratio);
  ctx.lineTo(x + 30.2725*ratio, y + 45*ratio);
  ctx.fillStyle = color ?? 'black';
  ctx.fill();
  ctx.stroke();
};