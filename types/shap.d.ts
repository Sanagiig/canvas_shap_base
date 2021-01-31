declare interface ShapInstance {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  render(ctx: CanvasRenderingContext2D);
}

declare interface BallInstance extends ShapInstance {
  r: number;
}