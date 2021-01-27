export default class Arrow {
  public x: number = 0;
  public y: number = 0;
  public width: number = 400;
  public height: number = 100;
  public rotation = 0;
  private ctx: CanvasRenderingContext2D;
  private fillStyle: string = "rgba(57,119,224)";
  private strokeStyle: string = "rgba(0,0,0)";
  private points: Array<{ x: number, y: number }> = [];

  constructor(ctx: CanvasRenderingContext2D, props: any) {
    this.ctx = ctx;
    Object.assign(this, props);
    this.computePoints();
  }
  // private computePoints() {
  //   const { points, x, y, width, height } = this;
  //   points.length = 0;
  //   // 左上
  //   points.push({ x: -width / 2 + x, y: -height / 2 + y });
  //   // 左下
  //   points.push({ x: -width / 2 + x, y: height / 2 + y });
  //   points.push({ x: width / 10 + x , y: height / 2 + y });
  //   // 右下
  //   points.push({ x: width / 10 + x , y: height + y });
  //   points.push({ x: width / 2 + x, y });
  //   // 右上
  //   points.push({ x: width / 10 + x, y: -height + y });
  //   points.push({ x: width / 10 + x, y: -height / 2 + y });
  // }
  private computePoints() {
    const { points, x, y, width, height } = this;
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
  createPath(ctx?: CanvasRenderingContext2D) {
    let { points } = this;
    ctx = ctx || this.ctx;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      let p = points[i];
      ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    return this;
  }
  render(ctx?: CanvasRenderingContext2D) {
    let { fillStyle, strokeStyle, x, y, rotation } = this;

    ctx = ctx || this.ctx;
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    this.createPath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    return this;
  }
}