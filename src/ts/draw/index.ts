export const W = 800;
export const H = 600;

export function initDraw(canvas:HTMLCanvasElement){
  canvas.width = W;
  canvas.height = H;
}

export function drawSystem(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.moveTo(W / 2, 0);
  ctx.lineTo(W / 2, H);
  ctx.stroke();
  ctx.restore();
}

export function drawLine(ctx: CanvasRenderingContext2D, pos: any) {
  ctx.beginPath();
  ctx.moveTo(W / 2, H / 2);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
  ctx.restore();

}

export function clear(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, W, H);
}