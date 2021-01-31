import { Shap } from "./base";
export default class Arrow extends Shap {
  constructor(props: any) {
    super(props)
    this.computePoints();
  }
  private computePoints() {
    const { points, width, height } = this;
    points.length = 0;
    // 左上
    points.push({ x: -width / 2, y: -height / 2 });
    // 左下
    points.push({ x: -width / 2, y: height / 2 });
    points.push({ x: width / 10, y: height / 2 });
    // 右下
    points.push({ x: width / 10, y: height });
    points.push({ x: width / 2, y: 0 });
    // 右上
    points.push({ x: width / 10, y: -height });
    points.push({ x: width / 10, y: -height / 2 });
  }
  createPath(ctx: CanvasRenderingContext2D) {
    let { points } = this;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      let p = points[i];
      ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    return this;
  }
  render(ctx: CanvasRenderingContext2D) {
    let { fillStyle, strokeStyle, x, y, rotation } = this;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    this.createPath(ctx);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    return this;
  }
}