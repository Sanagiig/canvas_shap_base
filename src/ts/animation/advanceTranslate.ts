import utils from "../utils/index";
import { clear, W, H } from '../draw/index';
import { getDistance } from '../utils/index';
import { Ball } from '../shap/ball';
export class AdvanceTranslate {
  public points: BallInstance[] = [];
  public angle = 1;
  public shaps: ShapInstance[] = [];
  public shapState: any[] = [];
  public centerPos: Position = { x: W / 2, y: H / 2 };
  constructor(shaps: ShapInstance[]) {
    let { centerPos } = this;
    this.shaps = shaps;
    shaps.forEach((shap, i) => {
      this.points[i] = new Ball({ x: shap.x, y: shap.y ,r:3,fillStyle:"yellow"});
      this.shapState[i] = {
        x: shap.x,
        y: shap.y,
        r: getDistance(shap.x, shap.y, centerPos.x, centerPos.y)
      }
    })
  }

  drawTrace(ctx: CanvasRenderingContext2D) {
    let { shaps, centerPos } = this;
    ctx.save();
    for (let i = 0; i < shaps.length; i++) {
      let ss = this.shapState[i];

      // 轨迹
      ctx.beginPath();
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.arc(centerPos.x, centerPos.y, ss.r, 0, 2 * Math.PI);
      ctx.stroke();
    }
    ctx.restore();
  }

  move(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(_ => {
      let { shaps, points,shapState,centerPos } = this;
      let rad = utils.toRad(this.angle);
      clear(ctx);
      this.drawTrace(ctx);
      for (let i = 0; i < shaps.length; i++) {
        let p = points[i];
        let s = shaps[i];
        let ss = shapState[i];
        let x = s.x - centerPos.x , y = s.y - centerPos.y;
        s.x = p.x = centerPos.x + x * Math.cos(rad) - y * Math.sin(rad);
        s.y = p.y = centerPos.y + y * Math.cos(rad) + x * Math.sin(rad);
        p.r = 3;
        s.render(ctx);
        p.render(ctx);
      }
      
      // this.angle +=1;
      this.move(ctx);
    })
  }
}