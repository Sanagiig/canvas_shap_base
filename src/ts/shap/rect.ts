import { Shap } from './base';
export class Rect extends Shap {

  constructor(option: any) {
    super(option);
  }

  render(ctx: CanvasRenderingContext2D) {
    let { x, y, translateX, translateY,
      width, height,
      fillStyle, strokeStyle, scaleX, scaleY, alpha } = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.translate(translateX, translateY);
    ctx.scale(scaleX, scaleY);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}