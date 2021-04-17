import { BaseAnimation } from "./base"
import { clear, H, W } from "../draw/index"
import { isInBox } from '../utils/index';

type Target = [number, number];
export class EaseAnimation {
  shaps: ShapInstance[] = [];
  shapsStates: any[] = [];
  ease: number;
  target: Target;
  constructor(shaps: ShapInstance[], target: Target, ease = 0.05) {
    this.shaps = shaps;
    this.target = target;
    this.ease = ease;
    this.shapsStates = new Array(shaps.length);
  }

  move(ctx: CanvasRenderingContext2D) {
    requestAnimationFrame(_ => {
      let { shapsStates, shaps, target, ease } = this;

      clear(ctx);
      shaps.forEach((s, i) => {
        let ss = shapsStates[i] = shapsStates[i] || {};
        let dx = target[0] - s.x, dy = target[1] - s.y;

        ss.vx = dx * ease;
        ss.vy = dy * ease;
        s.x += ss.vx;
        s.y += ss.vy;

        s.render(ctx);
      })
      this.move(ctx);
    })
  }
}