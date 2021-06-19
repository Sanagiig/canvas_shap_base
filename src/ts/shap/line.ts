import { Shap } from './base';
export class Line extends Shap {
  public x2: number = 0;
  public y2: number = 0;
  constructor(option: any) {
    super(option);
    this.propertyInit(option);
  }
  render(ctx: CanvasRenderingContext2D) {
    let {
      fillStyle, strokeStyle,
      x, y, x2, y2,
      scaleX, scaleY, alpha,
      translateX,translateY,rotation
    } = this;
    
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.translate(translateX, translateY);
    ctx.rotate(rotation)
    ctx.scale(scaleX, scaleY);
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}