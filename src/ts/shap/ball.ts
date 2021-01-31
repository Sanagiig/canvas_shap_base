import { Shap } from './base';
export class Ball extends Shap {
  public scaleX = 1;
  public scaleY = 1;
  public r = 20;
  public alpha = 1;
  constructor(option: any) {
    super(option);
  }
  render(ctx: CanvasRenderingContext2D) {
    let { fillStyle, strokeStyle, x, y, r, scaleX, scaleY, alpha } = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.translate(x, y);
    ctx.scale(scaleX, scaleY);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}