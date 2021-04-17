import { clear, H, W, drawLine } from '../draw/index';
import utils, { isInBox, getDistance, eventRegister } from '../utils/index';
export default class Struct {
  static springLen: number = 200;
  static friction: number = 0.95;
  static gravity: number = 0.5;
  static spring: number = 0.02;

  shaps: BallInstance[] = [];
  shapsStates: any[] = [];
  isMouseDown: boolean = false;
  canvas: HTMLElement;
  eventMap: ClsEventMap;

  static disposeSpring(ss1: any, ss2: any) {
    let { springLen ,spring} = Struct;
    let x1 = ss1.x, x2 = ss2.x, y1 = ss1.y, y2 = ss2.y;
    let dx = x2 - x1, dy = y2 - y1;
    let angle = Math.atan2(dy, dx);
    let targetX = x1 - springLen * Math.cos(angle);
    let targetY = y1 - springLen * Math.cos(angle);
    ss2.vx += targetX * spring;
    ss2.vy += targetY * spring;
  }

  constructor(shaps: BallInstance[], canvas: HTMLElement) {
    let { springLen } = Struct;
    this.canvas = canvas;
    this.shaps = shaps.slice();
    this.eventMap = {
      mousedown: this.handleMouseDown.bind(this),
      mousemove: this.handleMouseMove.bind(this),
      mouseup: this.handleMouseUp.bind(this),
    };
    this.shapsStates = shaps.map((s, i) => {
      let x, y;
      if (i === 0) {
        x = s.x;
        y = s.y
      } else {
        let angle = 2 * Math.PI * Math.random();
        let lx = shaps[i - 1].x, ly = shaps[i - 1].y;
        s.x = x = Math.cos(angle) * springLen + lx;
        s.y = y = Math.sin(angle) * springLen + ly;
      }

      return {
        vx: 0,
        vy: 0,
        offsetX: 0,
        offsetY: 0,
        x: x,
        y: y,
        spring: Struct.spring,
        gravity: Struct.gravity,
        friction: Struct.friction,
        isMouseDown: false,
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
  handleMouseDown(event: MouseEvent) {
    let pos = utils.getOffset(event);
    let i = this.shaps.length;
    while (--i >= 0) {
      let s = this.shaps[i];
      let ss = this.shapsStates[i];
      let distance = getDistance(pos.x, pos.y, s.x, s.y);
      if (distance <= s.r) {
        ss.isMouseDown = true;
        ss.offsetX = pos.x - s.x;
        ss.offsetY = pos.y - s.y;
        break;
      }
    }
    this.isMouseDown = true;
  }
  handleMouseMove(event: MouseEvent) {
    let { shapsStates } = this;
    let pos = utils.getOffset(event);
    let lastNum = shapsStates.length - 1;
    this.shapsStates.forEach((ss, i) => {
      let preI = i - 1 < 0 ? lastNum : i - 1;
      let nexI = i + 1 < lastNum ? i + 1 : 0;
      let pss = shapsStates[preI], nss = shapsStates[nexI];

      if (ss.isMouseDown) {
        ss.x = pos.x;
        ss.y = pos.y;
        Struct.disposeSpring(ss,pss);
        Struct.disposeSpring(ss,nss);
      }
    })
  }

  handleMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.shapsStates.forEach((ss, i) => {
      ss.isMouseDown = false;
    })
  }
  spingOther(ss:any){

  }
  drawLine(ctx: CanvasRenderingContext2D, shaps: BallInstance[]) {
    let { shapsStates } = this;
    shaps.forEach((shap: BallInstance, i: number) => {
      let ss = shapsStates[i];
      let pre = i === 0 ? shaps.length - 1 : i - 1;
      let preShap = shaps[pre];

      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.lineTo(preShap.x, preShap.y);
      ctx.lineTo(shap.x, shap.y);
      ctx.stroke();
      ctx.restore()
    })
  }

  move(ctx: CanvasRenderingContext2D) {
    window.requestAnimationFrame(_ => {
      let { shaps, shapsStates } = this;
      let selss;
      clear(ctx);

      this.drawLine(ctx, shaps);
      shaps.forEach((shap, i) => {
        let ss = shapsStates[i];
        let { gravity, friction, spring } = ss;
        if (ss.isMouseDown) {
          let dx = ss.x - shap.x, dy = ss.y - shap.y;
          let ax = dx * spring, ay = dy * spring;
          selss = ss;
          ss.vx += ax;
          ss.vy += ay;

          ss.vx *= friction;
          ss.vy *= friction;
          ss.vy += gravity;

          shap.x = ss.x - ss.offsetX;
          shap.y = ss.y - ss.offsetY;
        }else{
          Struct
        }
        shap.render(ctx);
      })

      this.move(ctx);
    })
  }
}
