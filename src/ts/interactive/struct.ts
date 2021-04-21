import { clear, H, W, drawLine } from '../draw/index';
import utils, { isInBox, getDistance, eventRegister, getArrProxy } from '../utils/index';
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

  static genTarget(p1: Position, p2: Position) {
    let { springLen } = Struct;
    let x1 = p1.x, x2 = p2.x, y1 = p1.y, y2 = p2.y;
    let dx = x2 - x1, dy = y2 - y1;
    let angle = Math.atan2(dy, dx);
    return {
      x: x1 + springLen * Math.cos(angle),
      y: y1 + springLen * Math.sin(angle)
    }
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
      console.log({
        vx: 0,
        vy: 0,
        offsetX: 0,
        offsetY: 0,
        targetX: x,
        targetY: y,
        x: x,
        y: y,
        spring: Struct.spring,
        gravity: Struct.gravity,
        friction: Struct.friction,
        isMouseDown: false,
      })
      return {
        vx: 0,
        vy: 0,
        offsetX: 0,
        offsetY: 0,
        targetX: x,
        targetY: y,
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
    let { shapsStates, shaps } = this;
    let sProxy = getArrProxy(shaps), ssProxy = getArrProxy(shapsStates);
    let pos = utils.getOffset(event);
    let len = shapsStates.length;
    let curI, preI, nextI;
    let tmpP1, tmpP2, tarPos;
    let count = Math.floor(len / 2);
    curI = preI = nextI = shapsStates.findIndex(item => item.isMouseDown);

    if (preI > -1) {
      let s = shaps[curI],ss = shapsStates[curI];

      s.x = pos.x - ss.offsetX;
      s.y = pos.y - ss.offsetY;
      ss.targetX = pos.x;
      ss.targetY = pos.y;
      while (count--) {
        tmpP1 = sProxy[preI];
        tmpP2 = sProxy[--preI];
        tarPos = Struct.genTarget({ x: tmpP1.x, y: tmpP1.y }, { x: tmpP2.x, y: tmpP2.y });
        ssProxy[preI].targetX = tarPos.x;
        ssProxy[preI].targetY = tarPos.y;

        tmpP1 = sProxy[nextI];
        tmpP2 = sProxy[++nextI];
        tarPos = Struct.genTarget({ x: tmpP1.x, y: tmpP1.y }, { x: tmpP2.x, y: tmpP2.y });
        ssProxy[nextI].targetX = tarPos.x;
        ssProxy[nextI].targetY = tarPos.y;
      }
    }
  }

  handleMouseUp(event: MouseEvent) {
    this.isMouseDown = false;
    this.shapsStates.forEach((ss, i) => {
      ss.isMouseDown = false;
    })
  }
  spingOther(ss: any) {

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
      clear(ctx);

      this.drawLine(ctx, shaps);
      shaps.forEach((shap, i) => {
        let ss = shapsStates[i];
        let { spring, friction } = Struct;
        let { targetX, targetY } = ss;

        ss.vx += (targetX - shap.x) * spring;
        ss.vy += (targetY - shap.y) * spring;

        ss.vx *= friction;
        ss.vy *= friction;
        // console.log("vx",ss)
        shap.x += ss.vx;
        shap.y += ss.vy;

        shap.render(ctx);
      })

      this.move(ctx);
    })
  }
}
