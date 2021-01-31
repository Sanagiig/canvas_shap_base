import utils from "../utils/index";
import { clear } from '../draw/index';

export class Circle {
  public r = 50;
  public points: any = [];
  public angle = 0;
  public shaps: ShapInstance[] = [];

  constructor(shaps: ShapInstance[]) {
    this.shaps = shaps.slice();
    this.shaps.forEach(s => {
      this.points.push({ x: s.x, y: s.y });
    })
  }

  drawTrace(ctx: CanvasRenderingContext2D) {
    let { shaps, points, r } = this;
    ctx.save();
    for (let i = 0; i < shaps.length; i++) {
      let s = shaps[i];
      let p = points[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.arc(s.x, s.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }

  move(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(_ => {
      let { shaps, r, points } = this;
      let rad = utils.toRad(this.angle);
      clear(ctx);
      for (let i = 0; i < shaps.length; i++) {
        let p = points[i];
        let s = shaps[i];
        s.x = p.x + Math.cos(rad) * r;
        s.y = p.y + Math.sin(rad) * r;
        s.render(ctx);
      }

      this.angle = (this.angle + 1) % 360;
      this.drawTrace(ctx);
      this.move(ctx);
    })
  }
}