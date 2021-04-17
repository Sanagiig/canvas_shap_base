import { clear, H, W, drawLine } from '../draw/index';
import utils, { isInBox, boxBounce, eventRegister } from '../utils/index';
export default class Throw {
  shaps: BallInstance[] = [];
  shapsStates: any[] = [];
  friction: number = 0.95;
  gravity: number = 0.5;
  spring: number = 0.02;
  isMouseDown: boolean = false;
  canvas: HTMLElement;
  eventMap: ClsEventMap;

  private mouseDownPos: any;
  constructor(shaps: BallInstance[], canvas: HTMLElement) {
    this.canvas = canvas;
    this.shaps = shaps.slice();
    this.eventMap = {
      mousemove: this.handleMouseMove.bind(this),
    };
    this.shapsStates = shaps.map(s => {
      return {
        vx: 0,
        vy: 0,
        targetX: s.x,
        targetY: s.y,
        spring: this.spring,
        gravity: this.gravity,
        friction: this.friction,
      }
    })
    this.registerMouseEvent();
  }

  godie() {
    this.removeMouseEvent();
  }
  registerMouseEvent() {
    eventRegister(this.canvas, this.eventMap);
  }
  removeMouseEvent() {
    eventRegister(this.canvas, this.eventMap, true);
  }

  handleMouseMove(event: MouseEvent) {
    let pos = utils.getOffset(event);
    this.shapsStates.forEach((ss, i) => {
      ss.vx *= 0.5;
      ss.vy *= 0.5;
      ss.targetX = pos.x;
      ss.targetY = pos.y;
    })
  }

  move(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(_ => {
      let { shaps, shapsStates } = this;
      clear(ctx);

      shaps.forEach((shap, i) => {
        let ss = shapsStates[i];
        let { gravity, friction, spring } = ss;
        let dx = ss.targetX - shap.x, dy = ss.targetY - shap.y;
        let ax = dx * spring , ay = dy * spring;
        ss.vx += ax;
        ss.vy += ay;

        ss.vx *= friction;
        ss.vy *= friction;
        ss.vy += gravity;

        shap.x += ss.vx;
        shap.y += ss.vy;

        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.lineTo(ss.targetX,ss.targetY);
        ctx.lineTo(shap.x,shap.y);
        ctx.stroke();
        ctx.restore()
        shap.render(ctx);
      })
      this.move(ctx);
    })
  }
}