import { BaseAnimation } from "./base"
import { clear, H, W } from "../draw/index"
import { isInBox } from '../utils/index';

type Target = [number, number];
export class SpringAnimation {
  shaps: ShapInstance[] = [];
  shapsStates: any[] = [];
  spring: number;
  friction: number;
  target: Target;
  constructor(shaps: ShapInstance[], target: Target, spring = 0.02, friction = 0.98) {
    this.shaps = shaps;
    this.target = target;
    this.spring = spring;
    this.friction = friction;
    this.shapsStates = new Array(shaps.length);
  }
  move(ctx: CanvasRenderingContext2D) {
    requestAnimationFrame(_ => {
      let { shapsStates, shaps, target, spring, friction } = this;
      clear(ctx);
      shaps.forEach((s, i) => {
        let ss = shapsStates[i] = shapsStates[i] || {
          vy:0,vx:0
        };
        let dx = target[0] - s.x, dy = target[1] - s.y;
        // let fx = dx < 0 ?friction : -friction 
        // let fy = dy < 0 ?friction : -friction 
        let ax = dx * spring ,ay = dy * spring;
        ss.vx += ax ;
        ss.vy += ay ;
        ss.vx *= friction;
        ss.vy *= friction;
        s.x += ss.vx;
        s.y += ss.vy;
        s.render(ctx);
      })
      this.move(ctx);
    })
  }
}