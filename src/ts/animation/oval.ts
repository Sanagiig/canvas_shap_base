import utils from "../utils/index";
import { clear } from '../draw/index';

export class Oval {
  public ra = 150;
  public rb = 50;
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
    let { shaps, points, ra,rb } = this;
    ctx.save();
    for (let i = 0; i < shaps.length; i++) {
      let s = shaps[i];
      let p = points[i];
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, ra,rb,0, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.arc(s.x, s.y, 5,0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }

  move(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(_ => {
      let { shaps, ra,rb, points } = this;
      let rad = utils.toRad(this.angle);
      clear(ctx);
      for (let i = 0; i < shaps.length; i++) {
        let p = points[i];
        let s = shaps[i];
        s.x = p.x + Math.cos(rad) * ra;
        s.y = p.y + Math.sin(rad) * rb;
        s.render(ctx);
      }

      this.angle = (this.angle + 1) % 360;
      this.drawTrace(ctx);
      this.move(ctx);
    })
  }
}